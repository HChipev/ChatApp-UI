import React, { ChangeEvent, useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useGetRolesQuery,
} from "../store/slices/api/adminApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import { addRefetchUsersListener } from "../services/signalR";
import { UserSimple, RoleSimple } from "../interfaces/admin";
import { addNotification } from "../store/slices/notificationSlice";
import { useDispatch } from "react-redux";
import ModalWrapper from "./ModelWrapper";

const UserTable: React.FC = () => {
  const { data: usersData, isLoading, isError, refetch } = useGetUsersQuery();
  const { data: rolesData } = useGetRolesQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserSimple | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    addRefetchUsersListener(() => {
      refetch();
    });
  }, []);

  const openModal = (user: UserSimple) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteUser(id).unwrap();

      dispatch(
        addNotification({
          id: Date.now(),
          type: "success",
          message: res.message,
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          id: Date.now(),
          type: "error",
          message: String((error as { data: any }).data),
        })
      );
    }
  };

  const handleUserRoleChange = (role: RoleSimple) => {
    if (!selectedUser) {
      return;
    }

    const updatedSelectedUser = {
      ...selectedUser,
      userRoles: [...selectedUser.userRoles],
    };

    const roleId = updatedSelectedUser.userRoles.find(
      (userRole) => userRole.roleId === role.id
    )?.roleId;

    if (roleId) {
      updatedSelectedUser.userRoles = updatedSelectedUser.userRoles.filter(
        (userRole) => userRole.roleId !== roleId
      );
    } else {
      updatedSelectedUser.userRoles.push({
        userId: selectedUser.id,
        roleId: role.id ?? 0,
      });
    }
    setSelectedUser(updatedSelectedUser);
  };

  const handleEdit = async () => {
    try {
      if (!selectedUser) {
        return;
      }

      const res = await updateUserRole({
        userRoles: selectedUser.userRoles,
        userId: selectedUser.id,
      }).unwrap();

      dispatch(
        addNotification({
          id: Date.now(),
          type: "success",
          message: res.message,
        })
      );

      closeModal();
    } catch (error) {
      dispatch(
        addNotification({
          id: Date.now(),
          type: "error",
          message: String((error as { data: any }).data),
        })
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <h1 className="text-red-500">Error loading users!</h1>
      </div>
    );
  }

  return (
    <div className="scrollable-x w-full h-min rounded-lg border border-red-500">
      <table className="w-full dark:bg-gray-800 bg-gray-100 text-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-r border-red-500">Id</th>
            <th className="py-2 px-4 border-r border-red-500">Picture</th>
            <th className="py-2 px-4 border-r border-red-500">Name</th>
            <th className="py-2 px-4 border-r border-red-500">Email</th>
            <th className="py-2 px-4 border-red-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData &&
            usersData.users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-t border-r border-red-500">
                  {user.id}
                </td>
                <td className="py-2 px-4 border-t border-r border-red-500">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user.picture}
                    alt="User picture"
                  />
                </td>
                <td className="py-2 px-4 border-t border-r border-red-500">
                  {user.name}
                </td>
                <td className="py-2 px-4 border-t border-r border-red-500">
                  {user.email}
                </td>
                <td className="flex justify-around border-t border-red-500 items-center gap-1 py-2 px-4">
                  <button
                    onClick={() => openModal(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full h-8 rounded mr-2">
                    <FontAwesomeIcon icon={["fas", "edit"]} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-gray-200 w-full h-8 rounded mr-2">
                    <FontAwesomeIcon icon={["fas", "trash"]} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ModalWrapper isOpen={isModalOpen} closeModal={closeModal}>
        <div className="flex flex-col justify-between items-center bg-gray-200 dark:bg-gray-900 rounded-md min-h-[320px]">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl dark:text-gray-200">{`Toggle user(${selectedUser?.email}) roles`}</h1>
            <div className="flex flex-col justify-center text-3xl">
              {rolesData?.roles.map((role) => (
                <label
                  key={role.id}
                  className="flex items-center mr-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      selectedUser?.userRoles.find(
                        (userRole) => userRole.roleId === role.id
                      )
                        ? true
                        : false
                    }
                    onChange={() => handleUserRoleChange(role)}
                    className="mr-1"
                  />
                  {role.name}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center max-h-80 overflow-y-auto min-w-[50%]">
            <button
              onClick={handleEdit}
              className="cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full">
              Save
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default UserTable;
