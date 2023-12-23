import {
  Permissions,
  RolePermissions,
  RoleSimple,
  Roles,
  UserRoles,
  Users,
} from "../../../interfaces/admin";
import { BasicResponse } from "../../../interfaces/baseResponse";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<Users, void>({
      query: () => "Admin/user/all",
    }),
    deleteUser: builder.mutation<BasicResponse, number>({
      query: (id) => ({
        url: `Admin/user/delete/${id}`,
        method: "DELETE",
      }),
    }),
    deleteRole: builder.mutation<BasicResponse, number>({
      query: (id) => ({
        url: `Admin/role/delete/${id}`,
        method: "DELETE",
      }),
    }),
    addRole: builder.mutation<BasicResponse, RoleSimple>({
      query: (body) => ({
        url: `Admin/role`,
        method: "POST",
        body: { ...body },
      }),
    }),
    updateUserRole: builder.mutation<BasicResponse, UserRoles>({
      query: (body) => ({
        url: `Admin/user/role`,
        method: "PUT",
        body: { ...body },
      }),
    }),
    getRoles: builder.query<Roles, void>({
      query: () => "Admin/role/all",
    }),
    updateRolePermission: builder.mutation<BasicResponse, RolePermissions>({
      query: (body) => ({
        url: `Admin/role/permission`,
        method: "PUT",
        body: { ...body },
      }),
    }),
    getPermissions: builder.query<Permissions, void>({
      query: () => "Admin/permission/all",
    }),
  }),
});

export const {
  useAddRoleMutation,
  useDeleteRoleMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useGetRolesQuery,
  useGetPermissionsQuery,
  useUpdateRolePermissionMutation,
} = adminApiSlice;
