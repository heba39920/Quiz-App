// Updated GroupList.tsx with enhanced filters, search, and layout switching

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
import { FiEdit2, FiTrash2, FiEye, FiList, FiGrid } from "react-icons/fi";
import Select from "react-select";
import useSound from "use-sound";
import deleteSound from "@/assets/Sound/fast-swipe-48158.mp3";
import viewSound from "@/assets/Sound/new-notification-09-352705.mp3";
import addSound from "@/assets/Sound/new-notification-09-352705.mp3";
import updateSound from "@/assets/Sound/new-notification-09-352705.mp3";
import { BsGrid3X3GapFill, BsGridFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";

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

  const [playDelete] = useSound(deleteSound);
  const [playView] = useSound(viewSound);
  const [playAdd] = useSound(addSound);
  const [playUpdate] = useSound(updateSound);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid2" | "grid3" | "list">("grid3");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredGroups = useMemo(() => {
    let filtered = groups || [];
    if (statusFilter !== "all") {
      filtered = filtered.filter((g) => g.status === statusFilter);
    }
    if (searchQuery.trim()) {
      filtered = filtered.filter((g) =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [groups, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const paginatedGroups = useMemo(() => {
    return filteredGroups.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredGroups, currentPage, itemsPerPage]);

  const { data: viewGroup, isLoading: isViewLoading } = useGroupDetails(
    viewGroupId || "",
    !!viewGroupId
  );

  const { register, handleSubmit, control, reset, setValue } =
    useForm<GroupFormValues>({
      defaultValues: { name: "", students: [] },
    });

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
        group.students.map((s: any) => {
          if (typeof s === "string") {
            const matched = studentOptions.find((opt) => opt.value === s);
            return matched || { value: s, label: s };
          }
          return { value: s._id, label: `${s.first_name} ${s.last_name}` };
        })
      );
      playUpdate();
    } else {
      reset();
      setGroupIdToEdit(null);
      playAdd();
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

  if (isError)
    return <p className="text-center text-red-500">Failed to load groups.</p>;

  return (
    <section className="p-4 max-w-7xl mx-auto">
      <div className="mb-3 w-full flex justify-end">
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 main-border hover:bg-orange-100 text-black text-sm font-medium rounded-full transition"
        >
          + Add Group
        </button>
      </div>

      <div className="main-border p-5 bg-white rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-2xl my-3 px-4 py-2 w-100"
            />
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => setViewMode("list")}
              className={`main-border rounded-lg p-2 ${
                viewMode === "list" ? "bg-orange-100" : ""
              }`}
            >
              <BsGridFill />
            </button>
            <button
              onClick={() => setViewMode("grid2")}
              className={`main-border rounded-lg p-2 ${
                viewMode === "grid2" ? "bg-orange-100" : ""
              }`}
            >
              <BsGrid3X3GapFill/>
            </button>
            <button
              onClick={() => setViewMode("grid3")}
              className={`main-border rounded-lg p-2 ${
                viewMode === "grid3" ? "bg-orange-100" : ""
              }`}
            >
              <FaListUl/>
            </button>
            <select
              className=" rounded-lg px-3 py-1 border border-gray-300"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              className="border border-gray-300 rounded-lg px-3 py-1"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>
        <AnimatePresence mode="popLayout">
          <div
            className={`grid gap-4 min-h-[200px] ${
              viewMode === "list"
                ? "grid-cols-1"
                : viewMode === "grid2"
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 md:grid-cols-3"
            }`}
          >
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              paginatedGroups.map((group: Group) => (
                <motion.div
                  key={group._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  layout
                  className="bg-white main-border rounded-xl shadow p-4 flex flex-col justify-between dark:bg-[#0D1321] dark:border dark:border-[#fff] dark:text-[#fff]"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold">{group.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        group.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {group.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm mb-2">
                    <span className="text-blue-600 mr-1">👤</span>
                    <span className="font-semibold">Instructor:</span>
                    <span className="ml-1 text-gray-600">
                      {group.instructor}
                    </span>
                  </div>
                  <div className="flex items-center text-sm mb-1">
                    <span className="text-green-600 mr-1">🧑‍🎓</span>
                    <span className="font-semibold">Students:</span>
                    <span className="ml-1">
                      {group.students.length} / {group.max_students || 25}
                    </span>
                  </div>
                  <div className="mt-1 mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#f7d6bd] h-full"
                        style={{
                          width: `${Math.round(
                            (group.students.length /
                              (group.max_students || 25)) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round(
                        (group.students.length / (group.max_students || 25)) *
                          100
                      )}
                      % filled
                    </p>
                  </div>
                  <div className="mt-auto pt-2 flex justify-between">
                    <button
                      onClick={() => handleOpenModal(group)}
                      className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                    >
                      <FiEdit2 className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedGroupId(group._id);
                        playDelete();
                      }}
                      className="flex items-center gap-1 text-red-600 hover:underline text-sm"
                    >
                      <FiTrash2 className="w-4 h-4" /> Delete
                    </button>
                    <button
                      onClick={() => {
                        setViewGroupId(group._id);
                        playView();
                      }}
                      className="flex items-center gap-1 text-gray-600 hover:underline text-sm"
                    >
                      <FiEye className="w-4 h-4" /> View
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </AnimatePresence>
      </div>

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

      <ReusableModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleSubmit(handleConfirmAddOrUpdate)}
        title={isEditing ? "Edit Group" : "Add Group"}
        className="w-full max-w-lg"
      >
        <div className="space-y-4">
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

