// src/pages/GroupList.tsx
import ReusableModal from "@/components/AddEditModal/AddEditModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal/ConfirmDeleteModal";
import Loader from "@/components/Loader/Loader";
import SharedViewModal from "@/components/SharedViewModal/SharedViewModal";
import type { Group } from "@/interface/GroupInterface";
import {
  useAddGroup,
  useDeleteGroup,
  useGroup,
  useGroupDetails,
  useUpdateGroup,
} from "@/utils/hooks/Group";
import { useGetAllStudentsWithoutGroup } from "@/utils/hooks/Students";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import Select from "react-select";
import useSound from "use-sound";

// Sounds
import deleteSound from "@/assets/Sound/fast-swipe-48158.mp3";
import {
  default as addSound,
  default as updateSound,
  default as viewSound,
} from "@/assets/Sound/new-notification-09-352705.mp3";

// Form Data Interface
interface GroupFormValues {
  name: string;
  students: { value: string; label: string }[];
}

const GroupList = () => {
  const customStyles = {
  menu: (provided:any) => ({
    ...provided,
    backgroundColor: '#0D1321', // dark background
    color: '#fff', // text color
    border: '1px solid #fff',
    // Add any other styles you need
  }),
  menuList: (provided:any) => ({
    ...provided,
    color: '#fff',
  }),
  option: (provided:any, state:any) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#1a2138' : '#0D1321',
    color: '#fff',
  }),
  // You can add more style customizations as needed
};
  const { data: groups, isLoading, isError } = useGroup();
  const { mutate: deleteGroup, isPending: isDeleting } = useDeleteGroup();
  const { mutate: addGroup } = useAddGroup();
  const { mutate: updateGroup } = useUpdateGroup();
  const { data: students, isLoading: isStudentsLoading } =
    useGetAllStudentsWithoutGroup();

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [viewGroupId, setViewGroupId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [groupIdToEdit, setGroupIdToEdit] = useState<string | null>(null);

  // Sounds
  const [playDelete] = useSound(deleteSound);
  const [playView] = useSound(viewSound);
  const [playAdd] = useSound(addSound);
  const [playUpdate] = useSound(updateSound);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = groups ? Math.ceil(groups.length / itemsPerPage) : 1;

  const paginatedGroups = useMemo(() => {
    return groups?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [groups, currentPage]);

  const { data: viewGroup, isLoading: isViewLoading } = useGroupDetails(
    viewGroupId || "",
    !!viewGroupId
  );

  // react-hook-form setup
  const { register, handleSubmit, control, reset, setValue } =
    useForm<GroupFormValues>({
      defaultValues: { name: "", students: [] },
    });

  // Convert students list to Select options
  const studentOptions =
    students?.map((s: any) => ({
      value: s._id,
      label: `${s.first_name} ${s.last_name}`,
    })) || [];

  // ✅ فتح المودال (إضافة أو تعديل)
  const handleOpenModal = (group?: Group) => {
    setIsEditing(Boolean(group));
    setIsModalOpen(true);

    if (group) {
      setGroupIdToEdit(group._id);
      setValue("name", group.name);

      // ✅ لو الطلاب في الجروب راجعين كـ Objects أو IDs فقط
      setValue(
        "students",
        group.students.map((s: any) => {
          if (typeof s === "string") {
            const matched = studentOptions.find(
              (opt: { value: string; label: string }) => opt.value === s
            );
            return matched || { value: s, label: s };
          }
          return {
            value: s._id,
            label: `${s.first_name} ${s.last_name}`,
          };
        })
      );

      playUpdate();
    } else {
      reset();
      setGroupIdToEdit(null);
      playAdd();
    }
  };

  // ✅ غلق المودال
  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  // ✅ تأكيد الإضافة أو التحديث
  const handleConfirmAddOrUpdate = (data: GroupFormValues) => {
    if (!data.name || data.students.length === 0) {
      toast.error("Please fill all fields");
      return;
    }

    const payload = {
      name: data.name,
      students: data.students.map((s) => s.value), // IDs only
    };

    if (isEditing && groupIdToEdit) {
      updateGroup({ id: groupIdToEdit, data: payload });
    } else {
      addGroup(payload);
    }

    handleCloseModal();
  };

  if (isError)
    return <p className="text-center text-red-500">Failed to load groups.</p>;

  return (
    <section aria-labelledby="groups-heading" className="p-4 max-w-7xl mx-auto">
      {/* Add Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 main-border  hover:bg-orange-100 text-black text-sm font-medium rounded-full transition"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Group
        </button>
      </div>

      {/* Groups List */}
      <div className="flex flex-col main-border p-5 bg-white rounded-xl shadow-sm dark:bg-[#0D1321] dark:border dark:border-[#fff]">
        <h2 className="text-xl font-semibold text-gray-800 mb-5 dark:text-[#fff]">
          Groups List
        </h2>

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
                  className="border border-gray-300 rounded-lg p-4 bg-white dark:bg-[#0D1321] dark:border dark:border-[#fff] dark:text-[#fff] shadow-sm flex justify-between items-start"
                >
                  <div>
                    <p className="font-medium">Group: {group.name}</p>
                    <p className="text-sm text-gray-600 dark:text-[#fff]">
                      Students: {group.students.length} / {group.max_students}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setViewGroupId(group._id);
                        playView();
                      }}
                      className="hover:text-orange-400"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenModal(group)}
                      className="hover:text-orange-400"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedGroupId(group._id);
                        playDelete();
                      }}
                      className="hover:text-orange-400"
                    >
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
              currentPage === i + 1 ? "bg-orange-200 dark:text-[#0D1321]" : "border dark:text-[#fff] dark:bg-[#0D1321] hover:dark:text-[#0D1321]"
            } flex items-center justify-center`}
          >
            {i + 1}
          </button>
        ))}
      </nav>

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!selectedGroupId}
        title={`Delete Group "${
          groups?.find((g) => g._id === selectedGroupId)?.name
        }"`}
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
        className="w-full max-w-lg"
      >
        <div className="space-y-4">
          {/* Group Name */}
          <div>
            <label className="block text-sm font-semibold mb-1 dark:text-[#fff]">
              Group Name
            </label>
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
                    className="react-select-container "
                    classNamePrefix="react-select"
                    placeholder="Select students..."
                    styles={customStyles}
                  />
                )}
              />
            )}
          </div>
        </div>
      </ReusableModal>

      {/* View Modal */}
      <SharedViewModal
        isOpen={!!viewGroupId}
        onClose={() => setViewGroupId(null)}
        title={`Group Details`}
      >
        {isViewLoading ? (
          <Loader />
        ) : viewGroup ? (
          <div>
            <p className="dark:text-[#fff]">
              Status:{" "}
              <span
                className={`${
                  viewGroup.status === "active"
                    ? "text-green-600"
                    : "text-red-600"
                } font-bold`}
              >
                {viewGroup.status}
              </span>
            </p>
            <p className="dark:text-[#fff]">
              Students: {viewGroup.students.length}/{viewGroup.max_students}
            </p>
            <ul className="list-disc ml-4">
              {viewGroup.students.map((s, i) => (
                <li key={i} className="dark:text-[#fff]">
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
