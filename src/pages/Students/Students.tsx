import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddStudent } from "@/services/API/Students";
import ReusableModal from "@/components/AddEditModal/AddEditModal";
import { studentSchema } from "@/utils/validation/validation";
import type { StudentPayload } from "@/interface/StudentInterface";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStudentModal = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentPayload>({
    resolver: zodResolver(studentSchema),
  });

  const addStudentMutation = useAddStudent();

  const onSubmit = (data: StudentPayload) => {
    addStudentMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      onConfirm={handleSubmit(onSubmit)}
      title="Add student"
      confirmDisabled={addStudentMutation.isPending}
    >
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="bg-orange-100 w-fit px-2 py-0.5 rounded text-sm mb-1">
            Name
          </label>
          <input
            {...register("name")}
            className="border border-gray-300 rounded-md px-3 py-2 outline-none"
            type="text"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="bg-orange-100 w-fit px-2 py-0.5 rounded text-sm mb-1">
            Phone
          </label>
          <input
            {...register("phone")}
            className="border border-gray-300 rounded-md px-3 py-2 outline-none"
            type="text"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </form>
    </ReusableModal>
  );
};
