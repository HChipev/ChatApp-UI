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

interface RolePermission {
  roleId: number;
  permissionId: number;
}

interface RolePermissions {
  rolePermissions: RolePermission[];
  roleId: number;
}

interface PermissionSimple {
  id: number;
  name: string;
}

interface Permissions {
  permissions: PermissionSimple[];
}

interface RoleSimple {
  id?: number;
  name: string;
  rolePermissions: RolePermission[];
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

export type {
  Users,
  RoleSimple,
  UserRole,
  UserSimple,
  Roles,
  UserRoles,
  RolePermission,
  RolePermissions,
  PermissionSimple,
  Permissions,
};
