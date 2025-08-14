// QuizModal.tsx
import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import { useGroup } from "@/utils/hooks/Group";
import { BsCheck } from "react-icons/bs";

export type QuizModalProps = {
  onClose: () => void;
  onSubmit: (data: any) => void;
};

const QuizModal = ({ onClose, onSubmit }: QuizModalProps) => {
  const { register, handleSubmit } = useForm();

  const { data: groups, isLoading, isError } = useGroup();

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[800px] rounded-lg p-6  dark:bg-[#0D1321] dark:border dark:border-[#fff] dark:text-[#fff]"
      >
        <div className="flex items-center justify-between border-b border-[#00000033] shadow-sm dark:border-[#fff]">
          <h2 className="px-6 py-2 text-lg font-semibold text-gray-800  dark:text-[#fff]">
            Set up a new quiz
          </h2>
          <div className="flex items-center border-s ">
            <button
              type="submit"
              className="w-12 h-12 text-gray-700 hover:bg-gray-100 flex items-center justify-center  border-e-1 dark:border-[#fff] dark:text-[#fff]"
            >
              <BsCheck className="w-5 h-5 text-[#00000033] dark:text-[#fff]" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-12 h-12 text-[#00000033] dark:text-[#fff] hover:bg-gray-100 "
            >
              ✕
            </button>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <h2 className="py-1 text-lg font-semibold text-gray-800  dark:text-[#fff]">Details</h2>

          <FormInput label="Title:" labelWidth="150px" labelHeight="40px">
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full px-3 py-2 text-sm focus:outline-none"
            />
          </FormInput>

          <div className="grid grid-cols-3 gap-3">
            <FormInput
              label="Duration (min)"
              labelWidth="150px"
              labelHeight="40px"
            >
              <input
                type="number"
                {...register("duration", { required: true })}
                className="w-full px-3 py-2 text-sm focus:outline-none"
              />
            </FormInput>
            <FormInput
              label="No. of questions"
              labelWidth="150px"
              labelHeight="40px"
            >
              <input
                type="number"
                {...register("questionsCount", { required: true })}
                className="w-full px-3 py-2 text-sm focus:outline-none"
              />
            </FormInput>
            <FormInput
              label="Score/question"
              labelWidth="150px"
              labelHeight="40px"
            >
              <input
                type="number"
                {...register("score", { required: true })}
                className="w-full px-3 py-2 text-sm focus:outline-none"
              />
            </FormInput>
          </div>

          <FormInput label="Description" labelWidth="150px" labelHeight="100px">
            <textarea
              rows={3}
              {...register("description", { required: true })}
              className="w-full px-3 py-2 text-sm focus:outline-none resize-none"
            />
          </FormInput>

          <div className="flex items-center gap-2">
            <span className="bg-[#FFEDDF] px-3 py-2 text-sm font-medium rounded text-gray-800 ">
              Schedule
            </span>
            <input
              type="date"
              {...register("scheduleDate", { required: true })}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="time"
              {...register("scheduleTime", { required: true })}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <FormInput
              label="Difficulty level"
              labelWidth="150px"
              labelHeight="40px"
            >
              <select
                {...register("difficulty", { required: true })}
                className="w-full px-3 py-2 text-sm focus:outline-none dark:bg-[#0D1321]  dark:text-[#fff]"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </FormInput>

            <FormInput
              label="Category type"
              labelWidth="150px"
              labelHeight="40px"
            >
              <select
                {...register("category", { required: true })}
                className="w-full px-3 py-2 text-sm focus:outline-none dark:bg-[#0D1321]  dark:text-[#fff]"
              >
                <option value="BE">BE</option>
                <option value="FE">FE</option>
                <option value="DO">DO</option>
              </select>
            </FormInput>

            <FormInput label="Group name" labelWidth="150px" labelHeight="40px">
              <select
                {...register("group", { required: true })}
                className="w-full px-3 py-2 text-sm focus:outline-none dark:bg-[#0D1321]  dark:text-[#fff]"
                disabled={isLoading || isError}
              >
                <option value="">Select a group</option>
                {groups?.map((group: any) => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))}
              </select>
              {isLoading && (
                <p className="text-xs text-gray-500 mt-1">Loading groups...</p>
              )}
              {isError && (
                <p className="text-xs text-red-500 mt-1">
                  Failed to load groups.
                </p>
              )}
            </FormInput>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuizModal;
