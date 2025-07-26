import InputField from "@/components/InputField";
import type { ChangePasswordData } from "@/interface/AuthInterface";
import { useChangePassword } from "@/utils/hooks/Auth";
import { changePasswordSchema } from "@/utils/validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaCircleCheck, FaKey } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

// Type inferred from schema
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate, isPending } = useChangePassword();

  const onSubmit = (data: ChangePasswordFormData) => {
    const changePassData = {
      password: data.password,
      password_new: data.password_new,
    };
    mutate(changePassData);
  };

  return (
    <>
      <h2 className="text-xl text-lime-300 font-semibold mb-6">
        Change Password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col min-h-[200px] justify-between"
        noValidate
      >
        {/* Old Password Input */}
        <div>
          <label htmlFor="oldPassword" className="block text-sm mb-1">
            Old Password
          </label>
          <InputField
            id="oldPassword"
            icon={<FaKey />}
            type="password"
            placeholder="Type your Old password"
            autoComplete="current-password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "error-oldPassword" : undefined}
            {...register("password")}
          />
          {errors.password && (
            <p
              id="error-oldPassword"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* New Password Input */}
        <div>
          <label htmlFor="newPassword" className="block text-sm mb-1">
            New Password
          </label>
          <InputField
            id="newPassword"
            icon={<FaKey />}
            type="password"
            placeholder="Type your New password"
            autoComplete="new-password"
            aria-invalid={errors.password_new ? "true" : "false"}
            aria-describedby={
              errors.password_new ? "error-newPassword" : undefined
            }
            {...register("password_new")}
          />
          {errors.password_new && (
            <p
              id="error-newPassword"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {errors.password_new.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isPending}
            className="bg-white text-black font-semibold py-2 px-6 rounded-md flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            aria-busy={isPending}
            aria-disabled={isPending}
          >
            {isPending ? (
              <>
                Changing... <ImSpinner2 className="animate-spin ml-2 size-5" />
              </>
            ) : (
              <>
                Change <FaCircleCheck className="size-6" />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
