import { RoleResource } from "@/contexts/profiles/server/interfaces/api/resources/role.resource";
import { db } from "@/firebase/client";
import { get, ref } from "firebase/database";

const ROLES_PATH = 'roles';

export class RolesRepository {
    
    static async getRoleById(roleId: string): Promise<RoleResource> {
        const roleRef = ref(db, `${ROLES_PATH}/${roleId}`);
        const snapshot = await get(roleRef);

        if (!snapshot.exists()) {
            throw new Error(`Rol no encontrado con el id ${roleId}`);
        }

        const rolData = snapshot.val();

        const resource = RoleResource.fromModel(rolData);
        return resource;
    }
}