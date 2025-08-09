import Loader from "@/components/Loader/Loader";
import type { Student } from "@/interface/StudentInterface";
import {
  useDeleteStudent,
  useDeleteStudentFromGroup,
  useGetAllStudents,
  useStudentDetails,
} from "@/utils/hooks/Students";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { HiMiniCheckBadge } from "react-icons/hi2";
import DropdownMenu from "./DropdownMenu";
import useSound from "use-sound";
import deleteSound from "@/assets/Sound/fast-swipe-48158.mp3";
import viewSound from "@/assets/Sound/new-notification-09-352705.mp3";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal/ConfirmDeleteModal";
import SharedViewModal from "@/components/SharedViewModal/SharedViewModal";
import { IoPerson } from "react-icons/io5";
import { PiMedalFill } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";
import { useGroup } from "@/utils/hooks/Group";
import { toast } from "react-toastify";
import { BsGrid3X3GapFill, BsGridFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";

type ViewType = "grid-2-col" | "grid-3-col" | "list-view";

const StudentsList = () => {
  const [activeView, setActiveView] = useState<ViewType>("grid-2-col");
  const [groupId, setGroupId] = useState<string | null>(null);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: StudentsData, isLoading } = useGetAllStudents();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [playDelete] = useSound(deleteSound);
  const [playView] = useSound(viewSound);
  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();
  const { mutate: removeStudentFromGroup, isPending: isRemoving } =
    useDeleteStudentFromGroup();
  const [StudentId, setStudentId] = useState<string>("");
  const [selectedId, setSelectedId] = useState("");
  const { data: studentDetails, isLoading: isDetailsLoading } =
    useStudentDetails(selectedId);

  const { data: groups, isLoading: isGroupsLoading } = useGroup();
  const [searchGroup, setSearchGroup] = useState<string | null>("all");
  const [searchName, setSearchName] = useState<string>("");

  const handleGroupClick = (groupName: string) => {
    setSearchGroup(groupName);
    setCurrentPage(1);
  };

  const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
    setCurrentPage(1);
  };

  const filteredStudents = useMemo(() => {
    if (!StudentsData) return [];
    let filtered = StudentsData;
    // Filter by group
    if (searchGroup && searchGroup !== "all") {
      filtered = filtered.filter(
        (student: Student) => student?.group?.name === searchGroup
      );
    }
    // Filter by name (case-insensitive)
    if (searchName.trim() !== "") {
      filtered = filtered.filter(
        (student: Student) =>
          student?.first_name
            .toLowerCase()
            .includes(searchName.toLowerCase()) ||
          student?.last_name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    return filtered;
  }, [StudentsData, searchGroup, searchName]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredStudents.length / itemsPerPage);
  }, [filteredStudents, itemsPerPage]);

  const displayedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const [showAllGroups, setShowAllGroups] = useState(false);
  const maxVisibleGroups = 3;
  const displayedGroups = showAllGroups
    ? groups
    : groups?.slice(0, maxVisibleGroups);
  const gridClasses = useMemo(() => {
    switch (activeView) {
      case "grid-2-col":
        return "grid grid-cols-1 md:grid-cols-2";
      case "grid-3-col":
        return "grid grid-cols-1 md:grid-cols-3";
      case "list-view":
        return "grid grid-cols-1"; // List view usually means a single column
      default:
        return "grid grid-cols-1 md:grid-cols-2";
    }
  }, [activeView]);
  return (
    <div className="m-[21px] border-1 border-[#00000033] p-[20px]">
      <h1 className="font-bold text-2xl">Students list</h1>

      {/* Changed to flex-col when showAllGroups is true */}
      <div className={`flex flex-row gap-4`}>
        {/* Group list */}
        <div className="flex-1">
          <ul className="flex flex-wrap items-center gap-2 mt-4 mb-5">
            {isGroupsLoading ? (
              <div className="flex justify-center items-center col-span-2">
                <Loader />
              </div>
            ) : (
              <>
                {/* "All Students" button */}
                <li
                  className={`border-1 rounded-4xl border-[#00000033] px-[20px] md:px-[35px] py-[6px] cursor-pointer dark:border-[#fff] ${
                    searchGroup === "all"
                      ? "bg-[#FFEDDF] dark:text-[#0D1321]"
                      : ""
                  }`}
                  onClick={() => handleGroupClick("all")}
                >
                  All Students
                </li>

                {/* Dynamic groups */}
                {displayedGroups?.map((group) => (
                  <li
                    key={group._id}
                    className={`border-1 rounded-4xl border-[#00000033] px-[20px] md:px-[35px] py-[6px] cursor-pointer dark:border-[#fff] ${
                      searchGroup === group?.name
                        ? "bg-[#FFEDDF] dark:text-[#0D1321]"
                        : ""
                    }`}
                    onClick={() => handleGroupClick(group?.name)}
                  >
                    Group: {group?.name}
                  </li>
                ))}

                {/* Show/Hide all groups button */}
                {groups && groups.length > maxVisibleGroups && (
                  <li
                    className="cursor-pointer font-semibold border border-[#00000033] text-black-500 dark:border-[#fff] rounded-3xl px-[10px] md:px-[15px] py-[6px]"
                    onClick={() => setShowAllGroups(!showAllGroups)}
                  >
                    {showAllGroups ? "Show Less" : "Show More..."}
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={handleNameSearch}
          className="border border-gray-300 rounded-2xl my-3 px-4 py-2 md:w-[50%] w-[100%]"
        />
      </div>
      <div className="justify-center md:justify-end  items-center  mb-4 flex">
        <div className="flex gap-2">
          <button
            className={`p-2 cursor-pointer rounded-md ${
              activeView === "grid-2-col"
                ? "bg-[#FFEDDF] text-black"
                : "bg-gray-200 text-gray-700"
            } transition-colors duration-200`}
            onClick={() => setActiveView("grid-2-col")}
            title="2 Column Grid View"
          >
            <BsGridFill size={20} />
          </button>
          <button
            className={`p-2 cursor-pointer rounded-md lg:block md:hidden ${
              activeView === "grid-3-col"
                ? "bg-[#FFEDDF] text-black"
                : "bg-gray-200 text-gray-700"
            } transition-colors duration-200`}
            onClick={() => setActiveView("grid-3-col")}
            title="3 Column Grid View"
          >
            <BsGrid3X3GapFill size={20} />
          </button>
          <button
            className={`p-2 cursor-pointer rounded-md ${
              activeView === "list-view"
                ? "bg-[#FFEDDF] text-black"
                : "bg-gray-200 text-gray-700"
            } transition-colors duration-200`}
            onClick={() => setActiveView("list-view")}
            title="List View"
          >
            <FaListUl size={20} />
          </button>
        </div>
        <div className="w-fit  ms-5">
          <button
            className={`py-1.5 px-3 cursor-pointer font-bold  rounded-tl-md rounded-bl-md  border-e-2 border-gray-400  ${
              itemsPerPage === 8
                ? "bg-[#FFEDDF] text-black"
                : "bg-gray-200 text-gray-700"
            } transition-colors duration-200`}
            onClick={() => setItemsPerPage(8)}
          >
            8
          </button>
          <button
            className={`py-1.5 px-3 cursor-pointer font-bold border-e-2  border-gray-400  ${
              itemsPerPage === 12
                ? "bg-[#FFEDDF] text-black"
                : "bg-gray-200 text-gray-700"
            } transition-colors duration-200`}
            onClick={() => setItemsPerPage(12)}
          >
            12
          </button>
          <button
            className={`py-1.5 px-3 cursor-pointer font-bold rounded-tr-md rounded-br-md   ${
              itemsPerPage === 24
                ? "bg-[#FFEDDF] text-black"
                : "bg-gray-200 text-gray-700"
            } transition-colors duration-200`}
            onClick={() => setItemsPerPage(24)}
          >
            24
          </button>
        </div>
      </div>

      {/* Rest of your component remains the same */}
      <div className={`${gridClasses} gap-4`}>
        {isLoading ? (
          <div className="flex justify-center items-center col-span-2">
            <Loader />
          </div>
        ) : (
          displayedStudents?.map((student: Student) => {
            // Check if the student has a group AND if that group exists in the fetched groups list
            const studentHasExistingGroup =
              !!student?.group?._id &&
              groups?.some((group) => group._id === student.group._id);

            return (
              <AnimatePresence mode="popLayout" key={student._id}>
                <motion.div
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  layout
                  aria-label={`${student.first_name}`}
                >
                  <div className="flex w-[100%] dark:border-[#fff] items-center justify-between border-1 rounded-2xl border-[#00000033] mb-2.5">
                    <div className="flex items-center">
                      <div className="flex h-full items-center">
                        <img
                          className=" w-[90px] h-[90px] object-cover me-5 rounded-tl-2xl rounded-bl-2xl"
                          src={`https://i.pravatar.cc/400?u=${student._id}`}
                          alt={`${student.first_name} ${student.last_name}`}
                        />
                      </div>
                      <div className="details">
                        <p className=" font-semibold capitalize">
                          {student?.first_name} {student?.last_name}
                        </p>
                        <p className=" font-medium text-[13px] text-[#0000008d] dark:text-[#fff4f4d5]">
                          Group: {student?.group?.name}
                        </p>
                        <p className="flex items-center text-emerald-600 capitalize">
                          {student?.status}
                          <HiMiniCheckBadge
                            size={25}
                            className="ms-1 text-emerald-600"
                          />
                        </p>
                      </div>
                    </div>
                    <DropdownMenu
                      onView={() => {
                        setSelectedId(student?._id);
                        console.log(studentDetails);
                        playView();
                      }}
                      onDelete={() => {
                        setStudentId(student?._id);
                        playDelete();
                      }}
                      onRemove={() => {
                        setRemoveId(student?._id);
                        setGroupId(student?.group?._id);
                        setModalOpen(true);
                        playDelete();
                      }}
                      hasGroup={studentHasExistingGroup}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })
        )}
      </div>

      {/* Pagination and modals remain the same */}
      <nav
        className="mt-6 flex flex-wrap justify-center items-center gap-2 text-sm"
        aria-label="Pagination"
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full border text-sm text-gray-600 disabled:opacity-30 hover:bg-gray-100"
          aria-label="Previous Page"
        >
          ‹
        </button>
        {currentPage > 2 && <span className="text-gray-400 px-1">...</span>}
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          if (
            page === 1 ||
            page === totalPages ||
            Math.abs(currentPage - page) <= 1
          ) {
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm transition ${
                  currentPage === page
                    ? "bg-[#FFEDDF] main-text dark:text-[#0D1321]"
                    : "text-gray-800 border-gray-300 hover:bg-gray-100  dark:text-[#fff] dark:bg-[#0D1321] hover:dark:text-[#0D1321]"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            );
          }
          return null;
        })}
        {currentPage < totalPages - 1 && (
          <span className="text-gray-400 px-1">...</span>
        )}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full border text-sm text-gray-600 disabled:opacity-30 hover:bg-gray-100"
          aria-label="Next Page"
        >
          ›
        </button>
      </nav>
      <ConfirmDeleteModal
        isOpen={!!StudentId}
        title={`Delete Student`}
        message="Are you sure you want to delete this Student?"
        isLoading={isDeleting}
        onCancel={() => setStudentId("")}
        onConfirm={() => {
          if (StudentId) {
            deleteStudent(StudentId);
            setStudentId("");
          }
        }}
      />
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        title="Remove From Group"
        message="Are you sure you want to Remove this Student from this Group?"
        isLoading={isRemoving}
        onCancel={() => {
          setStudentId("");
          setGroupId("");
          setModalOpen(false);
        }}
        onConfirm={() => {
          if (removeId && groupId) {
            // verify if the group still exists
            const groupExists =
              groups && groups.some((group) => group._id === groupId);
            if (!groupExists) {
              toast.error("The group has already been deleted.");
              setModalOpen(false);
              return;
            }
            // Proceed with removal
            removeStudentFromGroup({ studentId: removeId, groupId });
            setModalOpen(false);
            setRemoveId("");
            setGroupId("");
          }
        }}
      />
      <SharedViewModal
        isOpen={!!selectedId}
        onClose={() => setSelectedId("")}
        title={`${studentDetails?.first_name ?? ""} Details`}
      >
        {isDetailsLoading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : studentDetails ? (
          <div className=" h-[80vh]">
            <div className="">
              <div className="bg-[#ffeddf53] dark:bg-[#ffeddfc1] p-5 rounded-2xl">
                <h5 className="flex items-center font-bold mb-2">
                  <IoPerson className="me-1.5" /> Personal Information
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-[#00000333] p-5 rounded-2xl">
                  <div>
                    <p className="font-semibold">Full Name</p>
                    <p>
                      {studentDetails?.first_name} {studentDetails?.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>{studentDetails?.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Student ID</p>
                    <p>{studentDetails?._id}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Role</p>
                    <p>{studentDetails?.role}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#efb47d7b] dark:bg-[#efb47dc2] p-5 rounded-2xl mt-3">
                <h5 className="flex items-center font-bold mb-2">
                  <PiMedalFill className="me-1.5" />
                  Academic Performance
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-[#00000333] p-5 rounded-2xl">
                  <div>
                    <p className="font-semibold">Average Score</p>
                    <p className="bg-[#f1a66d] w-fit mt-1 py-1 px-4 rounded-4xl">
                      90/100
                    </p>
                  </div>
                  <div>
                    {" "}
                    <p className="font-semibold">Status </p>
                    <p
                      className={`mt-1 inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${
                        studentDetails.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {studentDetails.status === "active"
                        ? "Active ✅"
                        : "Inactive ⛔"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#ffeddf53] dark:bg-[#ffeddfc1] p-5 rounded-2xl  my-3">
                <h5 className="flex items-center font-bold mb-2">
                  <GrGroup className="me-1.5" /> Group Information
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-[#00000333] p-5 rounded-2xl">
                  <div>
                    <p className="font-semibold">Group Name</p>
                    <p>{studentDetails?.group?.name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Students Count</p>
                    <p>{studentDetails?.group?.students?.length}</p>
                  </div>
                  <div>
                    {" "}
                    <p className="font-semibold">Status </p>
                    <p
                      className={`mt-1 inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${
                        studentDetails?.group?.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {studentDetails?.group?.status === "active"
                        ? "Active ✅"
                        : "Inactive ⛔"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </SharedViewModal>
    </div>
  );
};

export default StudentsList;
