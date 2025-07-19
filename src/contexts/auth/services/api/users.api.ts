import { AuthenticatedUserResource } from "@/contexts/auth/services/resources/authenticated-user.resource";
import type { SaveUserResource } from "@/contexts/auth/services/resources/save-user.resource";
import type { User } from "@/contexts/auth/models/user.model";
import { db } from "@/firebase/client";
import { get, push, query, ref, set, orderByChild, equalTo } from "firebase/database";
import { hashPassword, comparePassword } from "@/contexts/auth/utils/encrypter.util";
import { generateToken } from "@/contexts/auth/utils/jwt.util";

const USERS_PATH = 'users';

export class UsersApi {

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

        newUser.stringId = userId;

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
}
