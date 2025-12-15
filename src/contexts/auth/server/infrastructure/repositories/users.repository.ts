import { AuthenticatedUserResource } from "@/contexts/auth/server/interfaces/api/resources/authenticated-user.resource";
import type { SaveUserResource } from "@/contexts/auth/server/interfaces/api/resources/save-user.resource";
import type { User } from "@/contexts/auth/server/models/user.model";
import { db } from "@/firebase/client";
import { get, push, query, ref, set, orderByChild, equalTo, update, remove } from "firebase/database";
import { hashPassword, comparePassword } from "@/contexts/auth/server/utils/encrypter.util";
import { generateToken } from "@/contexts/auth/server/utils/jwt.util";
import { UserResource } from "@/contexts/auth/server/interfaces/api/resources/user.resource";

const USERS_PATH = 'users';

export class UsersRepository {

    static async registerUser(data: SaveUserResource): Promise<AuthenticatedUserResource> {
        data.password = await hashPassword(data.password);

        const newUser: User = data.toModel();

        const usersCollectionRef = ref(db, USERS_PATH);

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

        newUser.id = userId;

        const dataToSave = {
            ...data,
        };

        await set(newUserRef, dataToSave);

        const resource = AuthenticatedUserResource.fromModel(newUser);
        resource.token = generateToken({ userId: userId });

        return resource;
    }

    static async loginUser(data: SaveUserResource): Promise<AuthenticatedUserResource> {
        const usersRef = ref(db, USERS_PATH);

        const userQuery = query(usersRef, orderByChild('username'), equalTo(data.username));
        const snapshot = await get(userQuery);

        if (!snapshot.exists()) {
            throw new Error(`Usuario o contraseña incorrectos`);
        }

        const usersData = snapshot.val();
        const userId = Object.keys(usersData)[0];
        const userData = usersData[userId];

        const passwordIsValid = await comparePassword(data.password, userData.password);

        if (!passwordIsValid) {
            throw new Error("Usuario o contraseña incorrectos");
        }

        const userModel: User = { ...userData, id: userId };
        const resource = AuthenticatedUserResource.fromModel(userModel);
        resource.token = generateToken({ userId: userId });

        return resource;
    }

    static async updateUser(userId: string | number, data: SaveUserResource): Promise<AuthenticatedUserResource> {
        data.password = await hashPassword(data.password);
        
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

    static async deleteUser(userId: string | number): Promise<UserResource> {
        const userToDelete = await this.getUser(userId); // Obtenemos el objeto antes de borrarlo para poder devolverlo
        const userRef = ref(db, `${USERS_PATH}/${userId}`);
        await remove(userRef);
        return userToDelete;
    }

    static async getUser(userId: string | number): Promise<UserResource> {
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