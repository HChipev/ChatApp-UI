import React, { useEffect, useState } from "react";
import {
  useGetRolesQuery,
  useDeleteRoleMutation,
  useAddRoleMutation,
  useGetPermissionsQuery,
  useUpdateRolePermissionMutation,
} from "../store/slices/api/adminApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { addRefetchRolesListener } from "../services/signalR";
import { addNotification } from "../store/slices/notificationSlice";
import { useDispatch } from "react-redux";
import ModalWrapper from "./ModelWrapper";
import { PermissionSimple, RoleSimple } from "../interfaces/admin";

const RoleTable: React.FC = () => {
  const { data: rolesData, isLoading, isError, refetch } = useGetRolesQuery();
  const { data: permissionsData } = useGetPermissionsQuery();
  const [updateRolePermission] = useUpdateRolePermissionMutation();
  const [deleteRole] = useDeleteRoleMutation();
  const [addRole] = useAddRoleMutation();
  const [isNewRoleModalOpen, setIsNewRoleModalOpen] = useState(false);
  const [isRolePermissionModalOpen, setIsRolePermissionModalOpen] =
    useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleSimple | null>(null);
  const [newRole, setNewRole] = useState<RoleSimple | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    addRefetchRolesListener(() => {
      refetch();
    });
  }, []);

  const openRolePermissionModal = (role: RoleSimple) => {
    setSelectedRole(role);
    setIsRolePermissionModalOpen(true);
  };

  const closeRolePermissionModal = () => {
    setIsRolePermissionModalOpen(false);
  };

  const openNewRoleModal = () => {
    setIsNewRoleModalOpen(true);
  };

  const closeNewRoleModal = () => {
    setNewRole(null);
    setIsNewRoleModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteRole(id).unwrap();

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
          message: String(
            (error as { data: any }).data ?? "An error occurred!"
          ),
        })
      );
    }
  };

  const handleAddRole = async () => {
    try {
      if (!newRole) {
        return;
      }

      const res = await addRole(newRole).unwrap();

      dispatch(
        addNotification({
          id: Date.now(),
          type: "success",
          message: res.message,
        })
      );

      closeNewRoleModal();
    } catch (error) {
      dispatch(
        addNotification({
          id: Date.now(),
          type: "error",
          message: String(
            (error as { data: any }).data ?? "An error occurred!"
          ),
        })
      );
    }
  };

  const handleRolePermissionChange = (permission: PermissionSimple) => {
    if (!selectedRole) {
      return;
    }

    const updatedSelectedRole = {
      ...selectedRole,
      rolePermissions: [...selectedRole.rolePermissions],
    };

    const permissionId = updatedSelectedRole.rolePermissions.find(
      (rolePermission) => rolePermission.permissionId === permission.id
    )?.permissionId;

    if (permissionId) {
      updatedSelectedRole.rolePermissions =
        updatedSelectedRole.rolePermissions.filter(
          (rolePermission) => rolePermission.permissionId !== permissionId
        );
    } else {
      updatedSelectedRole.rolePermissions.push({
        roleId: selectedRole.id ?? 0,
        permissionId: permission.id ?? 0,
      });
    }
    setSelectedRole(updatedSelectedRole);
  };

  const handleEdit = async () => {
    try {
      if (!selectedRole) {
        return;
      }

      const res = await updateRolePermission({
        rolePermissions: selectedRole.rolePermissions,
        roleId: selectedRole.id ?? 0,
      }).unwrap();

      dispatch(
        addNotification({
          id: Date.now(),
          type: "success",
          message: res.message,
        })
      );

      closeRolePermissionModal();
    } catch (error) {
      dispatch(
        addNotification({
          id: Date.now(),
          type: "error",
          message: String(
            (error as { data: any }).data ?? "An error occurred!"
          ),
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
    <div className="flex flex-col p-4 items-center w-[calc(100%-56px)] h-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <button
        className="self-end flex justify-center items-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 mb-4 rounded-md"
        onClick={openNewRoleModal}>
        Add Role
        <FontAwesomeIcon className="ml-2" icon={["fas", "plus"]} />
      </button>
      <div className="scrollable-y overflow-y-auto w-full rounded-lg border border-red-500">
        <table className="w-full dark:bg-gray-800 bg-gray-100 text-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-r border-red-500">Id</th>
              <th className="py-2 px-4 border-r border-red-500">Name</th>
              <th className="py-2 px-4 border-red-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rolesData &&
              rolesData.roles.map((role) => (
                <tr key={role.id}>
                  <td className="py-2 px-4 border-t border-r border-red-500">
                    {role.id}
                  </td>
                  <td className="py-2 px-4 border-t border-r border-red-500">
                    {role.name}
                  </td>
                  <td className="flex justify-around border-t border-red-500 items-center gap-1 py-2 px-4">
                    <button
                      onClick={() => openRolePermissionModal(role)}
                      className="bg-blue-500 hover:bg-blue-600 text-white w-full h-8 rounded mr-2">
                      <FontAwesomeIcon icon={["fas", "edit"]} />
                    </button>
                    <button
                      onClick={() => handleDelete(role.id ?? 0)}
                      className="bg-red-500 hover:bg-red-600 text-gray-200 w-full h-8 rounded mr-2">
                      <FontAwesomeIcon icon={["fas", "trash"]} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <ModalWrapper
          isOpen={isNewRoleModalOpen}
          closeModal={closeNewRoleModal}>
          <div className="flex flex-col justify-between items-center bg-gray-200 dark:bg-gray-900 rounded-md min-h-[320px]">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl dark:text-gray-200">Add role</h1>
              <div className="flex flex-col justify-center text-3xl gap-3">
                <input
                  type="text"
                  value={newRole?.name ?? ""}
                  onChange={(e) =>
                    setNewRole({
                      ...newRole,
                      name: e.target.value,
                      rolePermissions: newRole?.rolePermissions ?? [],
                    })
                  }
                  placeholder="Enter role name..."
                  className="rounded-md bg-transparent outline-none focus:outline-none border border-red-500 p-2"
                />
                <FormControl className="rounded-md" fullWidth>
                  <InputLabel
                    id="custom-label"
                    className="bg-gray-200 dark:bg-gray-900 dark:text-gray-200"
                    sx={{
                      "&.Mui-focused": {
                        color: "inherit",
                      },
                    }}>
                    Role Permissions
                  </InputLabel>
                  <Select
                    id="custom-select"
                    labelId="custom-label"
                    multiple
                    variant="outlined"
                    className="w-full dark:text-gray-200 border border-red-500 rounded-md bg-transparent outline-none focus:outline-none"
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: "inherit",
                      },
                    }}
                    value={
                      newRole?.rolePermissions.map((permission) =>
                        permission.permissionId.toString()
                      ) ?? []
                    }
                    onChange={(e) => {
                      const selectedValue = Number(
                        e.target.value[e.target.value.length - 1]
                      );

                      const isSelected = newRole?.rolePermissions.some(
                        (permission) =>
                          permission.permissionId === selectedValue
                      );

                      if (isSelected) {
                        const updatedPermissions =
                          newRole?.rolePermissions.filter(
                            (permission) =>
                              permission.permissionId !== selectedValue
                          );
                        setNewRole({
                          ...newRole,
                          name: newRole?.name ?? "",
                          rolePermissions: updatedPermissions ?? [],
                        });
                      } else {
                        setNewRole({
                          ...newRole,
                          name: newRole?.name ?? "",
                          rolePermissions: [
                            ...(newRole?.rolePermissions ?? []),
                            { roleId: 0, permissionId: selectedValue },
                          ],
                        });
                      }
                    }}>
                    {permissionsData?.permissions.map((permission) => (
                      <MenuItem key={permission.id} value={permission.id}>
                        {permission.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center max-h-80 overflow-y-auto min-w-[50%]">
              <button
                onClick={handleAddRole}
                className="cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full">
                Save
              </button>
            </div>
          </div>
        </ModalWrapper>
        <ModalWrapper
          isOpen={isRolePermissionModalOpen}
          closeModal={closeRolePermissionModal}>
          <div className="flex flex-col justify-between items-center bg-gray-200 dark:bg-gray-900 rounded-md min-h-[320px]">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl dark:text-gray-200">{`Toggle role(${selectedRole?.name}) permissions`}</h1>
              <div className="flex flex-col justify-center text-3xl">
                {permissionsData?.permissions.map((permission) => (
                  <label
                    key={permission.id}
                    className="flex items-center mr-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        selectedRole?.rolePermissions?.find(
                          (rolePermission) =>
                            rolePermission.permissionId === permission.id
                        )
                          ? true
                          : false
                      }
                      onChange={() => handleRolePermissionChange(permission)}
                      className="mr-1"
                    />
                    {permission.name}
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
    </div>
  );
};

export default RoleTable;
