
import { useState } from "react";
import QuestionsForm from "./QuestionsForm";
import { useAddQuestion, useEditQuestion } from "@/utils/hooks/Questions";

const QuestionsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelType, setModelType] = useState<"add" | "edit">("add");
  const [questionId, setQuestionId] = useState<string>("688be8e244dab7b8cb0479d4");
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const {mutate: addQuestion , isPending: isAdding }= useAddQuestion();
 
  const {mutate: editQuestion , isPending: isEditing }= useEditQuestion(questionId);
  const onSubmit = (data: any) => {
    if (modelType === "add") {
      addQuestion(data);
    } else {
      editQuestion(data);
    }
    handleCloseModal();
  };

  const handleAddNewQuestion = () => {
    setModelType("add");
    setIsModalOpen(true);
  };
  const handleEditQuestion = () => {
    setModelType("edit");
    setIsModalOpen(true);
  };
  return (
    <div>
      <button onClick={handleAddNewQuestion}>Add New Question</button>
      <button onClick={handleEditQuestion}>Edit Question</button>

      <QuestionsForm modalType={modelType} handleCloseModal={handleCloseModal} isPending={isAdding} isEditing={isEditing}  OnSubmit={onSubmit} isModalOpen={isModalOpen} />
    </div>
  );
};

export default QuestionsList;