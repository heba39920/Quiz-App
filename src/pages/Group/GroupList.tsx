// src/pages/GroupList.tsx
import { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import ReusableModal from "@/components/AddEditModal/AddEditModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal/ConfirmDeleteModal";
import SharedViewModal from "@/components/SharedViewModal/SharedViewModal";
import Loader from "@/components/Loader/Loader";
import { useAddGroup, useDeleteGroup, useGroup, useGroupDetails, useUpdateGroup } from "@/utils/hooks/Group";
import type { Group } from "@/interface/GroupInterface";
import toast from "react-hot-toast";
import { useGetAllStudentsWithoutGroup } from "@/utils/hooks/Students";

// Form Data Interface
interface GroupFormValues {
  name: string;
  students: { value: string; label: string }[];
}

const GroupList = () => {
  const { data: groups, isLoading, isError } = useGroup();
  const { mutate: deleteGroup, isPending: isDeleting } = useDeleteGroup();
  const { mutate: addGroup } = useAddGroup();
  const { mutate: updateGroup } = useUpdateGroup();
  const { data: students, isLoading: isStudentsLoading } =useGetAllStudentsWithoutGroup();

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [viewGroupId, setViewGroupId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [groupIdToEdit, setGroupIdToEdit] = useState<string | null>(null);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = groups ? Math.ceil(groups.length / itemsPerPage) : 1;

  const paginatedGroups = useMemo(() => {
    return groups?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [groups, currentPage]);

  const { data: viewGroup, isLoading: isViewLoading } = useGroupDetails(viewGroupId || "", !!viewGroupId);

  // react-hook-form setup
  const { register, handleSubmit, control, reset, setValue } = useForm<GroupFormValues>({
    defaultValues: { name: "", students: [] },
  });

  // Convert students list to Select options
  const studentOptions =
    students?.map((s: any) => ({
      value: s._id,
      label: `${s.first_name} ${s.last_name}`,
    })) || [];

  const handleOpenModal = (group?: Group) => {
    setIsEditing(Boolean(group));
    setIsModalOpen(true);

    if (group) {
      setGroupIdToEdit(group._id);
      setValue("name", group.name);
      setValue(
        "students",
        group.students.map((s: any) => ({
          value: s._id,
          label: `${s.first_name} ${s.last_name}`,
        }))
      );
    } else {
      reset();
      setGroupIdToEdit(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleConfirmAddOrUpdate = (data: GroupFormValues) => {
    if (!data.name || data.students.length === 0) {
      toast.error("Please fill all fields");
      return;
    }

    const payload = {
      name: data.name,
      students: data.students.map((s) => s.value),
    };

    if (isEditing && groupIdToEdit) {
      updateGroup({ id: groupIdToEdit, data: payload });
    } else {
      addGroup(payload);
    }

    handleCloseModal();
  };

  if (isError) return <p className="text-center text-red-500">Failed to load groups.</p>;

  return (
    <section aria-labelledby="groups-heading" className="p-4 max-w-7xl mx-auto">
      {/* Add Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-orange-100 text-black text-sm font-medium rounded-full transition"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Group
        </button>
      </div>

      {/* Groups List */}
      <div className="flex flex-col border p-5 bg-white rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Groups List</h2>

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[200px]">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              paginatedGroups?.map((group: Group) => (
                <motion.div
                  key={group._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  layout
                  className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex justify-between items-start"
                >
                  <div>
                    <p className="font-medium">Group: {group.name}</p>
                    <p className="text-sm text-gray-600">
                      Students: {group.students.length} / {group.max_students}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setViewGroupId(group._id)} className="hover:text-orange-400">
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleOpenModal(group)} className="hover:text-orange-400">
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setSelectedGroupId(group._id)} className="hover:text-orange-400">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <nav className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded-full ${
              currentPage === i + 1 ? "bg-orange-200" : "border"
            } flex items-center justify-center`}
          >
            {i + 1}
          </button>
        ))}
      </nav>

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!selectedGroupId}
        title={`Delete Group "${groups?.find((g) => g._id === selectedGroupId)?.name}"`}
        isLoading={isDeleting}
        onCancel={() => setSelectedGroupId(null)}
        onConfirm={() => {
          if (selectedGroupId) {
            deleteGroup(selectedGroupId);
            setSelectedGroupId(null);
          }
        }}
      />

      {/* Add/Edit Modal */}
      <ReusableModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleSubmit(handleConfirmAddOrUpdate)}
        title={isEditing ? "Edit Group" : "Add Group"}
      >
        <div className="space-y-4">
          {/* Group Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Group Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter group name"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-orange-300"
            />
          </div>

          {/* Students MultiSelect */}
          <div>
            <label className="block text-sm font-semibold mb-1">Students</label>
            {isStudentsLoading ? (
              <p className="text-gray-500 text-sm">Loading students...</p>
            ) : (
              <Controller
                control={control}
                name="students"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={studentOptions}
                    isMulti
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Select students..."
                  />
                )}
              />
            )}
          </div>
        </div>
      </ReusableModal>

      {/* View Modal */}
      <SharedViewModal isOpen={!!viewGroupId} onClose={() => setViewGroupId(null)} title={`Group Details`}>
        {isViewLoading ? (
          <Loader />
        ) : viewGroup ? (
          <div>
            <p>
              Status:{" "}
              <span
                className={`${
                  viewGroup.status === "active" ? "text-green-600" : "text-red-600"
                } font-bold`}
              >
                {viewGroup.status}
              </span>
            </p>
            <p>
              Students: {viewGroup.students.length}/{viewGroup.max_students}
            </p>
            <ul className="list-disc ml-4">
              {viewGroup.students.map((s, i) => (
                <li key={i}>
                  {s.first_name} {s.last_name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-red-500">Failed to load group data.</p>
        )}
      </SharedViewModal>
    </section>
  );
};

export default GroupList;
