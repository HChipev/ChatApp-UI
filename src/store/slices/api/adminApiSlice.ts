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
      query: () => import.meta.env.VITE_GET_USERS_API_URL,
    }),
    deleteUser: builder.mutation<BasicResponse, number>({
      query: (id) => ({
        url: `${import.meta.env.VITE_DELETE_USER_API_URL}${id}`,
        method: "DELETE",
      }),
    }),
    deleteRole: builder.mutation<BasicResponse, number>({
      query: (id) => ({
        url: `${import.meta.env.VITE_DELETE_ROLE_API_URL}${id}`,
        method: "DELETE",
      }),
    }),
    addRole: builder.mutation<BasicResponse, RoleSimple>({
      query: (body) => ({
        url: import.meta.env.VITE_ADD_ROLE_API_URL,
        method: "POST",
        body: { ...body },
      }),
    }),
    updateUserRole: builder.mutation<BasicResponse, UserRoles>({
      query: (body) => ({
        url: import.meta.env.VITE_UPDATE_USER_ROLE_API_URL,
        method: "PUT",
        body: { ...body },
      }),
    }),
    getRoles: builder.query<Roles, void>({
      query: () => import.meta.env.VITE_GET_ROLES_API_URL,
    }),
    updateRolePermission: builder.mutation<BasicResponse, RolePermissions>({
      query: (body) => ({
        url: import.meta.env.VITE_UPDATE_ROLE_PERMISSION_API_URL,
        method: "PUT",
        body: { ...body },
      }),
    }),
    getPermissions: builder.query<Permissions, void>({
      query: () => import.meta.env.VITE_GET_PERMISSIONS_API_URL,
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
