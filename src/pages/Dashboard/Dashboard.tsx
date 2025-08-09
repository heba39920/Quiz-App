// src/pages/Dashboard.tsx
import React, { useMemo, useState } from "react";
import QuizeImg from "@/assets/images/Quiz img.png";
import { useNavigate } from "react-router-dom";
import { usefirstFiveIncommingQ } from "@/utils/hooks/Quizzes";
import {
  useTopFiveStudents,
  useStudentDetails,
  useDeleteStudent,
} from "@/utils/hooks/Students";
import { HiMiniCheckBadge } from "react-icons/hi2";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal/ConfirmDeleteModal";
import SharedViewModal from "@/components/SharedViewModal/SharedViewModal";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader/Loader";

const ITEM_H = "h-[96px]";

// نوع خفيف للـ Top Student (لتفادي never[])
type TStudentLite = {
  _id: string;
  first_name: string;
  last_name: string;
  group?: { name?: string } | string | null;
  average_score?: number;
  rank?: number;
};

type MenuState = null | {
  id: string;
  top: number;
  left: number;
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Incoming 5 quizzes
  const {
    data: incomingData,
    isLoading: isIncomingLoading,
    isError: isIncomingError,
  } = usefirstFiveIncommingQ();

  // Top 5 students
  const {
    data: topStudents,
    isLoading: isTopLoading,
    isError: isTopError,
  } = useTopFiveStudents();

  // نضمن Array<TStudentLite>
  const topList: TStudentLite[] = useMemo(() => {
    if (!topStudents) return [];
    // يدعم كلا الحالتين: [..] أو { data: [..] }
    return Array.isArray(topStudents)
      ? (topStudents as TStudentLite[])
      : (topStudents as any)?.data ?? [];
  }, [topStudents]);

  // -------------------- Search states --------------------
  // بحث الطلاب بالاسم
  const [searchName, setSearchName] = useState("");
  const filteredTopList = useMemo<TStudentLite[]>(() => {
    const q = searchName.trim().toLowerCase();
    if (!q) return topList;
    return topList.filter((s) =>
      `${s?.first_name ?? ""} ${s?.last_name ?? ""}`.toLowerCase().includes(q)
    );
  }, [topList, searchName]);

  // بحث الكويزز (عنوان/تاريخ/وقت)
  const [searchQuiz, setSearchQuiz] = useState("");
  const filteredQuizzes = useMemo(() => {
    const q = searchQuiz.trim().toLowerCase();
    if (!q) return incomingData ?? [];
    return (incomingData ?? []).filter((quiz: any) => {
      const title = String(quiz?.title ?? "").toLowerCase();
      const dateStr = quiz?.schadule
        ? new Date(quiz.schadule).toLocaleDateString("en-GB").toLowerCase()
        : "";
      const timeStr = quiz?.schadule
        ? new Date(quiz.schadule)
            .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            .toLowerCase()
        : "";
      return title.includes(q) || dateStr.includes(q) || timeStr.includes(q);
    });
  }, [incomingData, searchQuiz]);

  // -------------------- Menus & modals --------------------
  const [menu, setMenu] = useState<MenuState>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");

  const { data: studentDetails, isLoading: isDetailsLoading } =
    useStudentDetails(selectedId || "", !!selectedId);
  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();

  const openStudentMenu = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({
      id,
      top: rect.bottom + 8,
      left: rect.right - 160,
    });
  };

  const closeMenus = () => setMenu(null);

  const handleDeleteConfirm = () => {
    if (!deleteId) return;
    deleteStudent(deleteId, {
      onSuccess: () => {
        setDeleteId("");
        queryClient.invalidateQueries({ queryKey: ["topFiveStudents"] });
      },
      onError: () => setDeleteId(""),
    });
  };

  return (
    <div
      className="min-h-screen dark:bg-[#0D1321] text-[#141414] dark:text-white px-4 py-6"
      onClick={closeMenus}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ---------------- Left: Upcoming 5 quizzes ---------------- */}
        <div className="bg-white dark:bg-[#0D1321] dark:text-white rounded-2xl p-4 shadow border border-black/10 dark:border-white/15">
          {/* عنوان + سيرش بمحاذاة مرتبة */}
          <div className="flex items-center justify-between gap-6 mb-3">
            <h2 className="text-lg font-semibold whitespace-nowrap">
              Upcoming 5 quizzes
            </h2>
            <input
              type="text"
              placeholder="Search quizzes (title / date / time)..."
              value={searchQuiz}
              onChange={(e) => setSearchQuiz(e.target.value)}
              className="border border-gray-300 rounded-2xl px-4 py-2 w-full md:w-72 dark:bg-transparent"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {isIncomingLoading && <Loader />}
          {isIncomingError && (
            <p className="text-sm text-red-500">Failed to load quizzes.</p>
          )}

          {!isIncomingLoading && !isIncomingError && (
            <div className="space-y-4">
              {filteredQuizzes.map((quiz: any) => (
                <div
                  key={quiz._id}
                  onClick={() => navigate(`/dashboard/quizzes/${quiz._id}`)}
                  className={`flex items-center justify-between gap-4 rounded-2xl p-4 shadow-sm bg-white dark:bg-[#0D1321] border border-black/10 dark:border-white/15 cursor-pointer ${ITEM_H}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 p-2 rounded-md">
                      <img
                        src={QuizeImg}
                        alt=""
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {quiz.title ?? "Untitled quiz"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        {quiz.schadule &&
                        !isNaN(new Date(quiz.schadule).getTime())
                          ? new Date(quiz.schadule).toLocaleDateString("en-GB")
                          : "Date not available"}{" "}
                        |{" "}
                        {quiz.schadule &&
                        !isNaN(new Date(quiz.schadule).getTime())
                          ? new Date(quiz.schadule).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "--:--"}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 dark:text-gray-200">
                        No. of students enrolled: {quiz.participants ?? 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#f3caab]">
                    <span className="font-semibold text-sm">Open</span>
                    <span className="text-sm">→</span>
                  </div>
                </div>
              ))}

              {filteredQuizzes.length === 0 && (
                <p className="text-sm opacity-70">No quizzes found.</p>
              )}
            </div>
          )}
        </div>

        {/* ---------------- Right: Top 5 Students ---------------- */}
        <div className="bg-white dark:bg-[#0D1321] dark:text-white rounded-2xl p-4 shadow border border-black/10 dark:border-white/15">
          <div className="flex items-center justify-between gap-6 mb-3">
            <h2 className="text-lg font-semibold whitespace-nowrap">
              Top 5 Students
            </h2>
            {/* Search by name */}
            <input
              type="text"
              placeholder="Search by name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="border border-gray-300 rounded-2xl px-4 py-2 w-full md:w-72 dark:bg-transparent"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {isTopLoading && (
            <p className="text-sm text-gray-500">
              <Loader />
            </p>
          )}
          {isTopError && (
            <p className="text-sm text-red-500">Failed to load students.</p>
          )}

          {!isTopLoading && !isTopError && (
            <div className="space-y-3">
              {filteredTopList.map((s, idx) => {
                const name = `${s?.first_name ?? ""} ${
                  s?.last_name ?? ""
                }`.trim();
                const groupName =
                  typeof s?.group === "string"
                    ? s.group
                    : s?.group?.name ?? "—";
                const id = s?._id ?? String(idx);

                return (
                  <div
                    key={id}
                    className={`flex items-center justify-between border border-black/10 dark:border-white/15 rounded-2xl overflow-hidden bg-white dark:bg-[#0D1321] ${ITEM_H}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* الصورة */}
                    <div className="w-[96px] h-full">
                      <img
                        className="w-full h-full object-cover rounded-l-2xl"
                        src={`https://i.pravatar.cc/300?u=${id}`}
                        alt={name || "Student"}
                      />
                    </div>

                    {/* التفاصيل */}
                    <div className="flex-1 px-4 min-w-0">
                      <p className="font-semibold capitalize truncate">
                        {name || "Student"}
                      </p>
                      <p className="text-[13px] text-gray-500 dark:text-gray-300 truncate">
                        Group: {groupName}
                      </p>
                      <p className="flex items-center gap-1 text-emerald-600 font-medium">
                        Active{" "}
                        <HiMiniCheckBadge
                          size={18}
                          className="text-emerald-600"
                        />
                      </p>
                    </div>

                    {/* سهم يفتح منيو */}
                    <button
                      type="button"
                      className="m-3 w-9 h-9 rounded-full bg-[#0D1321] text-white grid place-items-center hover:opacity-90 transition"
                      aria-label="Open student"
                      onClick={(e) => openStudentMenu(e, id)}
                    >
                      →
                    </button>
                  </div>
                );
              })}

              {filteredTopList.length === 0 && (
                <p className="text-sm opacity-70">No data to show.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating menu: View / Delete */}
      {menu && (
        <div
          className="fixed z-50 min-w-[140px] rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-[#0D1321] shadow"
          style={{ top: menu.top, left: menu.left }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-t-lg"
            onClick={() => {
              setSelectedId(menu.id);
              setMenu(null);
            }}
          >
            View
          </button>
          <button
            className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-white/10 rounded-b-lg"
            onClick={() => {
              setDeleteId(menu.id);
              setMenu(null);
            }}
          >
            Delete
          </button>
        </div>
      )}

      {/* Delete modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteId}
        title="Delete Student"
        message="Are you sure you want to delete this Student?"
        isLoading={isDeleting}
        onCancel={() => setDeleteId("")}
        onConfirm={handleDeleteConfirm}
      />

      {/* View modal */}
      <SharedViewModal
        isOpen={!!selectedId}
        onClose={() => setSelectedId("")}
        title={`${studentDetails?.first_name ?? ""} Details`}
      >
        {isDetailsLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : studentDetails ? (
          <div className="space-y-3">
            <div className="bg-[#ffeddf53] dark:bg-[#ffeddfc1] p-4 rounded-2xl">
              <h5 className="font-bold mb-2">Personal Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-[#00000333] p-4 rounded-2xl">
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

            <div className="bg-[#ffeddf53] dark:bg-[#ffeddfc1] p-4 rounded-2xl">
              <h5 className="font-bold mb-2">Group Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-[#00000333] p-4 rounded-2xl">
                <div>
                  <p className="font-semibold">Group Name</p>
                  <p>{studentDetails?.group?.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Students Count</p>
                  <p>{studentDetails?.group?.students?.length}</p>
                </div>
                <div>
                  <p className="font-semibold">Status</p>
                  <p>{studentDetails?.status}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </SharedViewModal>
    </div>
  );
};

export default Dashboard;
