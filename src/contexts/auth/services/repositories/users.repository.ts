import { AuthenticatedUserResource } from "@/contexts/auth/services/resources/authenticated-user.resource";
import type { SaveUserResource } from "@/contexts/auth/services/resources/save-user.resource";
import type { User } from "@/contexts/auth/models/user.model";
import { db } from "@/firebase/client";
import { equalTo, get, orderByChild, push, query, ref, remove, set, update } from "firebase/database";
import { UserResource } from "@/contexts/auth/services/resources/user.resource";
// import { generateToken } from "@/contexts/auth/utils/jwt.util";

const USERS_PATH = 'users';

export class UsersRepository {

    static async registerUser(data: SaveUserResource): Promise<AuthenticatedUserResource> {
        // ADVERTENCIA: Usando ofuscación temporal. MIGRAR A SERVIDOR.
        // data.password = obfuscate(data.password);

        const newUser: User = data.toModel();

        const usersCollectionRef = ref(db, USERS_PATH);

        // Construye la consulta para filtrar por username en el servidor
        const userQuery = query(usersCollectionRef, orderByChild('username'), equalTo(data.username));
        const snapshot = await get(userQuery);

        if (snapshot.exists()) {
            throw new Error(`El correo ya ha sido registrado por otro usuario.`);
        }

        const newUserRef = push(usersCollectionRef);

        const userId = newUserRef.key;
        if (!userId) {
            throw new Error('No se pudo generar un ID para el nuevo usuario.');
        }

        newUser.stringId = userId; // Asigna el ID único de Firebase

        // Firebase maneja mejor los timestamps como strings ISO o números
        const dataToSave = {
            ...data,
        };

        await set(newUserRef, dataToSave);

        const resource = AuthenticatedUserResource.fromModel(newUser);
        resource.token = userId;
        // resource.token = generateToken({ userId: userId });

        return resource;
    }

    static async loginUser(data: SaveUserResource): Promise<AuthenticatedUserResource> {
        const usersRef = ref(db, USERS_PATH);

        // Construye la consulta para filtrar por username en el servidor
        const userQuery = query(usersRef, orderByChild('username'), equalTo(data.username));
        const snapshot = await get(userQuery);

        if (!snapshot.exists()) {
            throw new Error(`Usuario o contraseña incorrectos`);
        }

        const usersData = snapshot.val();
        const userId = Object.keys(usersData)[0]; // Obtiene el ID único del usuario
        const userData = usersData[userId];       // Obtiene los datos del usuario

        // ADVERTENCIA: Usando ofuscación temporal. MIGRAR A SERVIDOR.
        // const obfuscatedPassword = obfuscate(data.password);
        const passwordIsValid = data.password === userData.password;

        if (!passwordIsValid) {
            throw new Error("Usuario o contraseña incorrectos");
        }

        const userModel: User = { ...userData, id: userId };
        const resource = AuthenticatedUserResource.fromModel(userModel);
        resource.token = userId;
        // resource.token = generateToken({ userId: userId });
        return resource;
    }

    static async updateUser(userId: string, data: SaveUserResource): Promise<AuthenticatedUserResource> {
        const userRef = ref(db, `${USERS_PATH}/${userId}`);
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
            throw new Error(`Usuario no encontrado con el id ${userId}`);
        }

        const dataToUpdate = {
            ...data,
        };

        await update(userRef, dataToUpdate);

        const user = await this.getUser(userId);
        const resource = AuthenticatedUserResource.fromModel(user);

        return resource;
    }

    static async deleteUser(userId: string): Promise<UserResource> {
        const userToDelete = await this.getUser(userId); // Obtenemos el objeto antes de borrarlo para poder devolverlo
        const userRef = ref(db, `${USERS_PATH}/${userId}`);
        await remove(userRef);
        return userToDelete;
    }

    static async getUser(userId: string): Promise<UserResource> {
        const userRef = ref(db, `${USERS_PATH}/${userId}`);
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
            throw new Error(`Usuario no encontrado con el id ${userId}`);
        }

        const userData = snapshot.val();
        const userModel: User = {
            ...userData,
            id: userId,
        };

        return UserResource.fromModel(userModel);
    }

    static async getAllUsers(): Promise<UserResource[]> {
        const usersRef = ref(db, USERS_PATH);
        const snapshot = await get(usersRef);
        if (!snapshot.exists()) return [];

        const usersData = snapshot.val();
        return Object.keys(usersData).map(key => {
            const userData = usersData[key];
            const userModel: User = {
                ...userData,
                id: key,
            };
            return UserResource.fromModel(userModel);
        });
    }
}