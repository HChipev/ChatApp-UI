import { RoleSimple, Roles, UserRoles, Users } from "../../../interfaces/admin";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<Users, void>({
      query: () => "Admin/user/all",
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `Admin/user/delete/${id}`,
        method: "DELETE",
      }),
    }),
    deleteRole: builder.mutation<void, number>({
      query: (id) => ({
        url: `Admin/role/delete/${id}`,
        method: "DELETE",
      }),
    }),
    addRole: builder.mutation<void, RoleSimple>({
      query: (body) => ({
        url: `Admin/role`,
        method: "POST",
        body: { ...body },
      }),
    }),
    updateUserRole: builder.mutation<void, UserRoles>({
      query: (body) => ({
        url: `Admin/user/role`,
        method: "PUT",
        body: { ...body },
      }),
    }),
    getRoles: builder.query<Roles, void>({
      query: () => "Admin/role/all",
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
} = adminApiSlice;