import { useState, useMemo } from "react";
import QuestionsForm from "./QuestionsForm";
import {
  useAddQuestion,
  useDeleteQuestion,
  useEditQuestion,
  useGetAllQuestions,
  useGetQuestionById,
} from "@/utils/hooks/Questions";
import { IoAddCircleSharp } from "react-icons/io5";
import Loader from "@/components/Loader/Loader";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal/ConfirmDeleteModal";
import SharedViewModal from "@/components/SharedViewModal/SharedViewModal";
import type { QuestionsInterface } from "@/interface/QuestionsInterface";

const QuestionsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [questionId, setQuestionId] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");

  // Pagination and filters
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const { mutate: addQuestion, isPending: isAdding } = useAddQuestion();
  const { data: allData, isLoading: isLoadingQuestions } = useGetAllQuestions();
  const { mutate: deleteQuestion, isPending: isDeleting } = useDeleteQuestion(deleteId);
  const { data: questionData, isLoading: isLoadingQuestion } = useGetQuestionById(selectedId);
  const { mutate: editQuestion, isPending: isEditing } = useEditQuestion(questionId);

  // Filter and search logic
  const filteredQuestions = useMemo(() => {
    let filtered = allData || [];
    if (searchTitle.trim()) {
      filtered = filtered.filter((q: QuestionsInterface) =>
        q.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }
    if (filterType) {
      filtered = filtered.filter((q: QuestionsInterface) => q.type === filterType);
    }
    if (filterDifficulty) {
      filtered = filtered.filter((q: QuestionsInterface) => q.difficulty === filterDifficulty);
    }
    return filtered;
  }, [allData, searchTitle, filterType, filterDifficulty]);

  // Pagination logic
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredQuestions.slice(start, start + itemsPerPage);
  }, [filteredQuestions, currentPage, itemsPerPage]);

  // Reset pagination when filters change
  const handleFilterChange = () => setCurrentPage(1);

  // Accessibility: focus management for modals
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDeleteQuestion = (id: string) => setDeleteId(id);

  const handleViewQuestion = (id: string) => {
    setSelectedId(id);
    setOpenViewModal(true);
  };

  const onSubmit = (data: QuestionsInterface) => {
    if (modalType === "add") {
      addQuestion(data, {
        onSuccess: () => setIsModalOpen(false),
      });
    } else {
      editQuestion(data, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  const handleAddNewQuestion = () => {
    setModalType("add");
    setIsModalOpen(true);
  };

  const handleEditQuestion = (id: string) => {
    setModalType("edit");
    setIsModalOpen(true);
      setSelectedId(id);
    setQuestionId(id);
  };


  const handleClearFilters = () => {
    setSearchTitle("");
    setFilterType("");
    setFilterDifficulty("");
    setCurrentPage(1);
  };

  return (
    <div className="m-6 border border-[#00000033] p-5 rounded-xl dark:border-[#fff] ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0D1321] dark:text-white">
          Bank of Questions
        </h1>
        <button
          onClick={handleAddNewQuestion}
          className="flex items-center border p-2 border-[#00000033] dark:border-[#fff] hover:dark:text-[#0D1321] rounded-xl bg-orange-50 hover:bg-orange-100 dark:bg-[#0D1321] transition"
          aria-label="Add new question"
        >
          <IoAddCircleSharp size={25} className="me-2" />
          <span>Add Question</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center ">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={e => { setSearchTitle(e.target.value); handleFilterChange(); }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-[50%]  "
        />
        <select
          value={filterType}
          onChange={e => { setFilterType(e.target.value); handleFilterChange(); }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-50  dark:bg-[#0D1321]"
        >
          <option value="">All Types</option>
          <option value="FE">FE</option>
          <option value="BE">BE</option>
          <option value="DO">DO</option>
        </select>
        <select
          value={filterDifficulty}
          onChange={e => { setFilterDifficulty(e.target.value); handleFilterChange(); }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-50 dark:bg-[#0D1321] "
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={handleClearFilters}
          className="px-5 py-2 rounded-lg bg-gray-200  text-gray-700 dark:bg-[#0D1321] dark:border dark:border-[#fff] dark:text-white hover:bg-orange-100 hover:dark:text-[#0D1321] transition"
        >
          Clear Filters
        </button>
      </div>

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border border-gray-200 rounded-lg shadow-xs overflow-hidden">
              <table className="min-w-full divide-y divide-[#fff]">
                <thead className="bg-[#0D1321] text-white uppercase text-xs">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start font-medium border-2 border-[#fff]">Title</th>
                    <th scope="col" className="px-6 py-3 text-start font-medium border-2 border-[#fff]">Description</th>
                    <th scope="col" className="px-6 py-3 text-center font-medium border-2 border-[#fff]">Difficulty</th>
                    <th scope="col" className="px-6 py-3 text-center font-medium border-2 border-[#fff]">Type</th>
                    <th scope="col" className="px-6 py-3 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 whitespace-nowrap text-[#000] dark:text-[#fff]">
                  {paginatedQuestions.map((question: QuestionsInterface) => (
                    <tr
                      key={question._id}
                      className="hover:bg-[#FFEDDF] dark:hover:bg-[#0D1321] transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 text-start border border-[#00000033] dark:border-[#fff]">{question.title}</td>
                      <td className="px-6 py-4 text-start border border-[#00000033] dark:border-[#fff]">{question.description}</td>
                      <td className="px-6 py-4 text-center border border-[#00000033] dark:border-[#fff]">
                        <span className={`py-1.5 px-5 rounded-2xl dark:text-[#0D1321] ${question.difficulty === "easy" ? "bg-green-100" : question.difficulty === "medium" ? "bg-yellow-100" : "bg-red-100"}`}>{question?.difficulty}</span>
                      </td>
                      <td className="px-6 py-4 text-center border border-[#00000033] dark:border-[#fff]">
                        <span className={`py-1.5 px-5 rounded-2xl dark:text-[#0D1321] ${question.type === "FE" ? "bg-purple-100" : question.type === "DO" ? "bg-lime-100" : "bg-blue-100"}`}>{question.type}</span>
                      </td>
                      <td className="px-6 py-4 text-end border border-[#00000033] dark:border-[#fff]">
                        <button
                          onClick={() =>{  if (question._id) handleViewQuestion(question?._id)}}
                          className="text-yellow-500 mx-1"
                          aria-label={`View ${question.title}`}
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => {
                            if (question._id) handleEditQuestion(question._id);
                          }}
                          className="text-blue-500 mx-3"
                          aria-label={`Edit ${question.title}`}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() =>{ if (question._id) handleDeleteQuestion(question?._id)}}
                          className="text-red-500 mx-1"
                          aria-label={`Delete ${question.title}`}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {isLoadingQuestions && (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        <Loader />
                      </td>
                    </tr>
                  )}
                  {!isLoadingQuestions && paginatedQuestions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500">
                        No questions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              <nav
                className="mt-6 flex flex-wrap justify-center items-center gap-2 text-sm py-5"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full border text-sm text-gray-600 disabled:opacity-30 hover:bg-gray-100 dark:text-[#fff] "
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
                  className="w-8 h-8 flex items-center justify-center rounded-full border text-sm text-gray-600 disabled:opacity-30 hover:bg-gray-100 dark:text-[#fff]"
                  aria-label="Next Page"
                >
                  ›
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        title="Delete Question"
        message="Are you sure you want to delete this Question?"
        isLoading={isDeleting}
        onCancel={() => setDeleteId("")}
        onConfirm={() => {
          if (deleteId) {
            deleteQuestion(deleteId, {
              onSuccess: () => setDeleteId(""),
              onError: () => setDeleteId(""),
            });
          }
        }}
      />

      <SharedViewModal
        isOpen={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title="Question Details"
      >
        {isLoadingQuestion ? (
          <Loader />
        ) : (
          <>
            <div className="p-4 bg-gray-50 rounded-2xl overflow-y-auto">
              <h3 className="text-lg font-medium mb-4">Question</h3>
              <p>
                Title : <strong> {questionData?.title}</strong>
              </p>
              <p className="mb-2">
                Description : <strong>{questionData?.description}</strong>
              </p>
            </div>
            <div className="p-4 my-3 bg-gray-300 rounded-2xl ">
              <h3 className="text-lg font-medium mb-4">Options</h3>
              {["A", "B", "C", "D"].map((opt) => (
                <p
                  key={opt}
                  className="flex items-center space-x-3 cursor-default hover:bg-gray-50 rounded p-2"
                >
                  <span
                    className={`bg-gray-100 px-2 rounded-full font-semibold ${
                      questionData?.answer === opt
                        ? "text-[#fff] bg-green-800"
                        : ""
                    }`}
                  >
                    {opt}
                  </span>
                  <span className="flex items-center justify-between w-full">
                    <span>{questionData?.options?.[opt]}</span>
                    {questionData?.answer === opt ? (
                      <span className="text-green-800 bg-green-100 p-1 font-semibold rounded-2xl px-2">
                        Correct Answer
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                </p>
              ))}
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl grid grid-cols-2 capitalize">
              <p className="mb-2">
                Difficulty : <strong>{questionData?.difficulty}</strong>
              </p>
              <p className="mb-2">
                Type : <strong>{questionData?.type}</strong>
              </p>
              <p className="mb-2">
                Points : <strong>{questionData?.points}</strong>
              </p>
              <p className="mb-2">
                Status : <strong>{questionData?.status}</strong>
              </p>
            </div>
          </>
        )}
      </SharedViewModal>

      <QuestionsForm
        modalType={modalType}
        handleCloseModal={handleCloseModal}
        isPending={isAdding}
        isEditing={isEditing}
        OnSubmit={onSubmit}
        isModalOpen={isModalOpen}
        questionData={modalType === "edit" ? questionData : undefined}
      />
    </div>
  );
};

export default QuestionsList;