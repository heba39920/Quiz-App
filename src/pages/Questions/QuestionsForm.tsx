import ReusableModal from "@/components/AddEditModal/AddEditModal";
import Loader from "@/components/Loader/Loader";
import type { QuestionsInterface } from "@/interface/QuestionsInterface";
import { questionSchema } from "@/utils/validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";

import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Circles } from "react-loader-spinner";


interface QuestionsFormProps {
    OnSubmit?: SubmitHandler<QuestionsInterface>;
    isModalOpen?: boolean;
    handleCloseModal?: () => void;
    onConfirm?: () =>SubmitHandler<QuestionsInterface>;
    isPending: boolean;
    modalType: "add" | "edit";
    isEditing?: boolean;
      questionData?: QuestionsInterface, // <-- Add this prop to receive question data for editing
        isLoading?: boolean;

}
const QuestionsForm:React.FC<QuestionsFormProps> = ({isLoading,OnSubmit, isModalOpen,handleCloseModal, onConfirm,isPending, modalType, isEditing,questionData}) => {
const {register ,reset, handleSubmit, formState:{errors}}= useForm<QuestionsInterface>({
 mode: "onChange",
 resolver: zodResolver(questionSchema)
});
console.log("Question Data:", questionData);

  // Reset form with question data when editing
useEffect(() => {
  if (modalType === "edit" && isModalOpen && questionData) {
    reset({
      title: questionData.title || "",
      description: questionData.description || "",
      options: {
        A: questionData.options?.A || "",
        B: questionData.options?.B || "",
        C: questionData.options?.C || "",
        D: questionData.options?.D || "",
      },
      answer: questionData.answer || "",
      difficulty: questionData.difficulty || "",
      type: questionData.type || "",
    });
  } else if (modalType === "add") {
    reset({
      title: "",
      description: "",
      options: { A: "", B: "", C: "", D: "" },
      answer: "",
      difficulty: "",
      type: "",
    });
  }
}, [modalType, isModalOpen, questionData, reset]);
  return (
      <ReusableModal   
          title={modalType === "add" ? "Set up a new question" : "Edit question"}
 isOpen={isModalOpen}
  onConfirm={onConfirm} onClose={handleCloseModal} className="w-[100%] md:w-[70%]  mx-auto h-[80%] overflow-y-auto"> 
  {isLoading?<div className="flex h-[500px] justify-center items-center"><Loader /></div>:( <form
      className="space-y-4 px-0 md:px-8"
      onSubmit={OnSubmit ? handleSubmit(OnSubmit) : undefined}
      aria-labelledby="form-title"
      autoComplete="off"
    >
      <h5
        id="form-title"
        className="mb-4 font-semibold text-lg"
        tabIndex={-1}
      >
        Details
      </h5>
      {/* Title Input Group */}
        <AnimatePresence mode="popLayout">
            <motion.div
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{delay: 0.1, duration: 0.3 }}
                  layout
                  
                 className="flex items-center space-x-2 relative">
        <label
          className="w-[100px] font-medium text-gray-700 absolute bg-[#FFEDDF] inset-y-0 p-2 rounded-lg"
          htmlFor="title"
        >
          Title
        </label>
        <input
          type="text"
          id="title"  
          aria-required="true"
          aria-label="Question Title"
         
        {...register("title", { required: true })}
          className="flex-1 p-2 ps-[105px] border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </motion.div>
      </AnimatePresence>
        <p className="text-red-500 text-xs">{errors?.title && (errors?.title?.message as string)}</p>

            {/* Description Input Group */}
             <AnimatePresence mode="popLayout">
            <motion.div
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{delay:0.2, duration: 0.3 }}
                  layout
                  
                 className="flex items-center space-x-2 relative">
        <label
          className="w-[100px] font-medium text-gray-700 absolute bg-[#FFEDDF] inset-y-0 px-2 py-5 rounded-lg"
          htmlFor="description"
        >
         Description
        </label>
        <textarea
          id="description"
         
          
          aria-required="true"
          aria-label="Question Description"
         
        {...register("description", { required: true })}
          className="flex-1 p-2 ps-[105px] border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </motion.div>
      </AnimatePresence>
        <p className="text-red-500 text-xs">{errors?.description && (errors?.description?.message as string)}</p>

              {/* Difficulty Input Group */}
                     
                     
                     <AnimatePresence mode="popLayout">
            <motion.div
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{delay:0.3, duration: 0.3 }}
                  layout
                  
                 className="flex items-center space-x-2 relative">
        <label
          className="w-[100px] font-medium text-gray-700 absolute bg-[#FFEDDF] inset-y-0 p-2 rounded-lg"
          htmlFor="difficulty"
        >
         Difficulty
        </label>
        <select  id="difficulty"
         
          
          aria-required="true"
          aria-label="Question Difficulty"
         
        {...register("difficulty", { required: true })}
          className="flex-1 p-2 ps-[105px] border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option value="">Choose Difficulty</option>
              <option value="easy">Easy</option>
            <option value="hard">Hard</option>
           
        
        </select>
      </motion.div>
      </AnimatePresence>
        <p className="text-red-500 text-xs">{errors?.difficulty && (errors?.difficulty?.message as string)}</p>

      {/* Options A, B, C, D */}
      <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-labelledby="options-group">
        <legend id="options-group" className="sr-only">
          Options
        </legend>
        {/* Option A */}
           <AnimatePresence mode="popLayout">
              <motion.div
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{delay:0.4, duration: 0.3 }}
                  layout
                  
                 className="flex items-center space-x-2 relative">
          <label
            className="w-[49.14px] font-medium text-sm text-gray-700 absolute bg-[#FFEDDF] inset-y-0 p-3 ps-4.5 rounded-lg"
            htmlFor="optionA"
          >
            A
          </label>
          <input
            id="optionA"
           
            type="text"
           
            aria-required="true"
            aria-label="Option A"
        {...register("options.A", { required: true })}
          
            className="flex-1 ps-[54px] p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
            <p className="text-red-500 text-xs">{errors?.options?.A && (errors?.options?.A?.message as string)}</p>

        </motion.div>
</AnimatePresence>
        {/* Option B */}
           <AnimatePresence mode="popLayout">
              <motion.div
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{delay:0.5, duration: 0.3 }}
                  layout
                  
                 className="flex items-center space-x-2 relative">
          <label
            className="w-[49.14px] font-medium text-sm text-gray-700 absolute bg-[#FFEDDF] inset-y-0 p-3 ps-4.5 rounded-lg"
            htmlFor="optionB"
          >
            B
          </label>
          <input
            id="optionB"
          
            type="text"
          
            aria-required="true"
            aria-label="Option B"
         {...register("options.B", { required: true })}
          
            className="flex-1 ps-[54px] p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
            <p className="text-red-500 text-xs">{errors?.options?.B && (errors?.options?.B?.message as string)}</p>

        </motion.div>
</AnimatePresence>
        {/* Option C */}
        <AnimatePresence mode="popLayout">
              <motion.div
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{delay:0.6, duration: 0.3 }}
                  layout
                  
                 className="flex items-center space-x-2 relative">
          <label
            className="w-[49.14px] font-medium text-sm text-gray-700 absolute bg-[#FFEDDF] inset-y-0 p-3 ps-4.5 rounded-lg"
            htmlFor="optionC"
          >
            C
          </label>
          <input
            id="optionC"
           
            type="text"
          
            aria-required="true"
            aria-label="Option C"
        
          {...register("options.C", { required: true })}
            className="flex-1 ps-[54px] p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
            <p className="text-red-500 text-xs">{errors?.options?.C && (errors?.options?.C?.message as string)}</p>

        </motion.div>
</AnimatePresence>
        {/* Option D */}
        <AnimatePresence mode="popLayout">
              <motion.div
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{delay:0.7, duration: 0.3 }}
                  layout
                  
                 className="flex items-center space-x-2 relative">
          <label
            className="w-[49.14px] font-medium text-sm text-gray-700 absolute bg-[#FFEDDF] inset-y-0 p-3 ps-4.5 rounded-lg"
            htmlFor="optionD"
          >
            D
          </label>
          <input
            id="optionD"
       
            type="text"
          
            aria-required="true"
            aria-label="Option D"
         
          {...register("options.D", { required: true })}
            className="flex-1 p-2 ps-[54px] border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
            <p className="text-red-500 text-xs">{errors?.options?.D && (errors?.options?.D?.message as string)}</p>

        </motion.div>
</AnimatePresence>
      </fieldset>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Right Answer */}
        <AnimatePresence mode="popLayout">
              <motion.div
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{delay:0.8, duration: 0.3 }}
                  layout
                  
                 className="flex items-center space-x-2 relative">
          <label
            className="w-[106px] font-medium text-sm text-gray-700 absolute bg-[#FFEDDF] inset-y-0 p-2 rounded-lg"
            htmlFor="rightAnswer"
          >
            Right Answer
          </label>
          <select id="rightAnswer"
          
         
            aria-required="true"
            aria-label="Right Answer"
        
          {...register("answer", { required: true })}
            className="flex-1 ps-[110px] p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
             <option value="">Choose Answer</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
         </select> 
        </motion.div>
        </AnimatePresence>
            <p className="text-red-500 text-xs block  md:hidden">{errors?.answer && (errors?.answer?.message as string)}</p>

        {/* Category Type Dropdown */}
        <AnimatePresence mode="popLayout">
              <motion.div
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{delay:0.9, duration: 0.3 }}
                  layout
                  
                 className="flex items-center space-x-2 relative">
          <label
            className="w-[106px] font-medium text-sm text-gray-700 absolute bg-[#FFEDDF] inset-y-0 p-2 rounded-lg"
            htmlFor="categoryType"
          >
            Category type
          </label>
          <select
            id="categoryType"
            aria-label="Category Type"
            
          {...register("type", { required: true })}
            className="flex-1 ps-[110px] p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Choose Type</option>
            <option value="FE">FE</option>
            <option value="BE">BE</option>
            <option value="DO">DO</option>
          </select>
        </motion.div>
</AnimatePresence>
 
      </div>   
           <div className="flex justify-between"> 
            <p className="text-red-500 text-xs hidden md:block">{errors?.answer && (errors?.answer?.message as string)}</p>
            
            <p className="text-red-500 text-xs">{errors?.type && (errors?.type?.message as string)}</p>
            </div>
<AnimatePresence mode="popLayout">
           <motion.div role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{delay:1, duration: 0.3 }}
                  layout
                  className="flex justify-end mt-4">
                    
              
                 
     <button
  type="submit"
  aria-label={modalType === "add" ? "Add Question" : "Edit Question"}
  className={`px-[10px] py-[5px] main-text bg-[#FFEDDF] transition rounded-2xl cursor-pointer flex items-center justify-center min-w-[120px] ${
    isPending || isEditing ? "opacity-70 cursor-not-allowed" : "hover:bg-[#FFD8B9]"
  }`}
  disabled={isPending || isEditing}
>
  {isPending && modalType === "add" ? (
    <>

      Adding... 
           <Circles  
          color="#0D1321"
        ariaLabel="circles-loading"
         width={20} height={20} />
    </>
  ) : isEditing && modalType === "edit" ? (
    <>
      
     Editing...
      <Circles  
          color="#0D1321"
        ariaLabel="circles-loading"
         width={20} height={20} />
    </>
  ) : modalType === "add" ? (
    "Add Question"
  ) : (
    "Edit Question"
  )}
</button>
        </motion.div>
        </AnimatePresence>
    </form>)}
    
   
    </ReusableModal>
  );
};

export default QuestionsForm;