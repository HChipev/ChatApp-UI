interface UserSimple {
  id: number;
  name: string;
  picture: string;
  email: string;
  userRoles: UserRole[];
}

interface Users {
  users: UserSimple[];
}

interface RoleSimple {
  id?: number;
  name: string;
}

interface Roles {
  roles: RoleSimple[];
}

interface UserRole {
  userId: number;
  roleId: number;
}
interface UserRoles {
  userRoles: UserRole[];
  userId: number;
}

export type { Users, RoleSimple, UserRole, UserSimple, Roles, UserRoles };
