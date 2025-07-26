import { useState, useMemo } from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { useDeleteGroup, useGroup, useGroupDetails } from "@/utils/hooks/Group";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal/ConfirmDeleteModal";
import SharedViewModal from "@/components/SharedViewModal/SharedViewModal";
import type { Group } from "@/interface/GroupInterface";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader/Loader";
import useSound from "use-sound";
import deleteSound from "@/assets/Sound/fast-swipe-48158.mp3";
import viewSound from "@/assets/Sound/new-notification-09-352705.mp3";

const GroupList = () => {
  const { data: groups, isLoading, isError } = useGroup();
  const { mutate: deleteGroup, isPending: isDeleting } = useDeleteGroup();

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [viewGroupId, setViewGroupId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [playDelete] = useSound(deleteSound);
  const [playView] = useSound(viewSound);

  const totalPages = groups ? Math.ceil(groups.length / itemsPerPage) : 1;

  const paginatedGroups = useMemo(() => {
    return groups?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [groups, currentPage]);

  const selectedGroup = groups?.find((g) => g._id === selectedGroupId);
  const { data: viewGroup, isLoading: isViewLoading } = useGroupDetails(
    viewGroupId || "",
    !!viewGroupId
  );

  if (isError)
    return <p className="text-center text-red-500">Failed to load groups.</p>;

  return (
    <section aria-labelledby="groups-heading" className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-end mb-6">
        <button
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#00000033] hover:border-none text-black text-sm font-medium rounded-full hover:bg-[#FFEDDF] hover:main-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFEDDF] transition"
          aria-label="Add Group"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="hidden sm:inline">Add Group</span>
        </button>
      </div>

      <div className="flex flex-col main-border p-5 bg-white rounded-xl shadow-sm">
        <h2
          id="groups-heading"
          className="text-xl font-semibold text-gray-800 mb-5"
        >
          Groups List
        </h2>

        <AnimatePresence mode="popLayout">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[200px]"
            role="list"
          >
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              paginatedGroups?.map((group: Group) => (
                <motion.div
                  key={group._id}
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  layout
                  className="border border-[#00000033] rounded-lg p-4 bg-white shadow-sm flex justify-between items-start"
                  aria-label={`Group ${group.name}`}
                >
                  <div>
                    <p className="font-medium">Group: {group.name}</p>
                    <p className="text-sm text-gray-600">
                      No. of students: {group.students.length} /{" "}
                      {group.max_students}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => {
                        setViewGroupId(group._id);
                        playView();
                      }}
                      aria-label={`View ${group.name}`}
                      className="text-black hover:text-[#f1c6a4] focus:outline-none"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      aria-label={`Edit ${group.name}`}
                      className="text-black hover:text-[#f1c6a4] focus:outline-none"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedGroupId(group._id);
                        playDelete();
                      }}
                      aria-label={`Delete ${group.name}`}
                      className="text-black hover:text-[#f1c6a4] focus:outline-none"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </AnimatePresence>

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
                      ? "bg-[#FFEDDF] main-text"
                      : "text-gray-800 border-gray-300 hover:bg-gray-100"
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
      </div>

      <ConfirmDeleteModal
        isOpen={!!selectedGroupId}
        title={`Delete Group \"${selectedGroup?.name}\"`}
        isLoading={isDeleting}
        onCancel={() => setSelectedGroupId(null)}
        onConfirm={() => {
          if (selectedGroupId) {
            deleteGroup(selectedGroupId);
            setSelectedGroupId(null);
          }
        }}
      />

      <SharedViewModal
        isOpen={!!viewGroupId}
        onClose={() => setViewGroupId(null)}
        title={`Group: ${viewGroup?.name ?? ""}`}
      >
        {isViewLoading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : viewGroup ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Status:</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${
                  viewGroup.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {viewGroup.status === "active" ? "Active ✅" : "Inactive ⛔"}
              </span>
            </div>

            <p>
              This group has <strong>{viewGroup.students.length}</strong> out of{" "}
              <strong>{viewGroup.max_students}</strong> students.
            </p>

            {viewGroup.students.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-600">
                {viewGroup.students.map((student, index) => (
                  <li key={index}>
                    {student.first_name} {student.last_name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No students enrolled yet.</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-red-500">Failed to load group data.</p>
        )}
      </SharedViewModal>
    </section>
  );
};

export default GroupList;
