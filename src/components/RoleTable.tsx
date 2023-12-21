import React, { useEffect, useState } from "react";
import {
  useGetRolesQuery,
  useDeleteRoleMutation,
  useAddRoleMutation,
} from "../store/slices/api/adminApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import { addRefetchRolesListener } from "../services/signalR";
import { addNotification } from "../store/slices/notificationSlice";
import { useDispatch } from "react-redux";
import ModalWrapper from "./ModelWrapper";

const RoleTable: React.FC = () => {
  const { data, isLoading, isError, refetch } = useGetRolesQuery();
  const [deleteRole] = useDeleteRoleMutation();
  const [addRole] = useAddRoleMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    addRefetchRolesListener(() => {
      refetch();
    });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setNewRoleName("");
    setIsModalOpen(false);
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
          message: String((error as { data: any }).data),
        })
      );
    }
  };

  const handleAddRole = async () => {
    try {
      if (!newRoleName) {
        return;
      }

      const res = await addRole({ name: newRoleName }).unwrap();

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
    <div className="flex flex-col p-4 items-center w-[calc(100%-56px)] h-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <button
        className="self-end flex justify-center items-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 mb-4 rounded-md"
        onClick={openModal}>
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
            {data &&
              data.roles.map((role) => (
                <tr key={role.id}>
                  <td className="py-2 px-4 border-t border-r border-red-500">
                    {role.id}
                  </td>
                  <td className="py-2 px-4 border-t border-r border-red-500">
                    {role.name}
                  </td>
                  <td className="flex justify-around border-t border-red-500 items-center gap-1 py-2 px-4">
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
        <ModalWrapper isOpen={isModalOpen} closeModal={closeModal}>
          <div className="flex flex-col justify-between items-center bg-gray-200 dark:bg-gray-900 rounded-md min-h-[320px]">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl dark:text-gray-200">Add role</h1>
              <div className="flex flex-col justify-center text-3xl">
                <input
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="Enter role name..."
                  className="rounded-md bg-transparent outline-none focus:outline-none border border-red-500 p-2"
                />
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
      </div>
    </div>
  );
};

export default RoleTable;
