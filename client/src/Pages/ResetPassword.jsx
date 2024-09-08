import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FaAsterisk, FaSpinner } from "react-icons/fa";
import { updatePasswordFunction } from "../Services/API";
import ToastMsg from "../Utility/ToastMsg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formLoading, setFormLoading] = useState(false);
  const regNo = sessionStorage.getItem("registrationNo");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      registrationNo: regNo || "",
    },
  });

  const handleReset = async (formData) => {
    setFormLoading(true);
    try {
      const { registrationNo, currentPassword, newPassword } = formData;
      const response = await updatePasswordFunction(
        registrationNo,
        newPassword,
        currentPassword
      );
      console.log(response);

      if (response.status == 200) {
        ToastMsg(response.data.message, "success");

        // Navigate to Login page after 1 seconds
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        ToastMsg(response.response.data.message, "error");
      }
    } catch (error) {
      console.log("Internal Server Error: ", error);
      ToastMsg("Internal Server Error", "error");
    } finally {
      setFormLoading(false);
      reset();
    }
  };

  // Capitalize the registration no.
  const registrationNo = watch("registrationNo");
  useEffect(() => {
    setValue("registrationNo", registrationNo?.toUpperCase());
  }, [registrationNo, setValue]);

  return (
    <div className="login-area w-full h-screen flex justify-center items-center pt-[80px] sm:pt-[50px] pb-[50px]">
      {/* Login box */}
      <div className="box sm:w-full md:max-w-[480px] mx-auto sm:py-[50px]">
        <h2 className="text-gray-700 outline-none block text-[40px] xl:text-[44px] font-bold mx-auto mb-3 w-full text-center">
          Reset Password
        </h2>
        <form
          name="login-form"
          className="w-full"
          onSubmit={handleSubmit(handleReset)}
          noValidate
        >
          {/*Registration number */}
          <div className="mb-3 w-full px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="registrationNo"
            >
              Registration No:{" "}
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              className={`form-control cursor-not-allowed ${
                errors.registrationNo ? "border-red-500" : ""
              }`}
              name="Registration No"
              type="text"
              id="registrationNo"
              placeholder="21BCE1846"
              disabled
              {...register("registrationNo", {
                required: "Registration number is required",
                pattern: {
                  value:
                    /^[A-Za-z]+\.?[A-Za-z0-9]+[0-9]{4}[A-Za-z]*@vitstudent\.ac\.in$|^(1|2)[0-9](B|M)[A-Z]{2}[0-9]{4}$/,
                  message: "Invalid registration number",
                },
              })}
            />
            {errors.registrationNo && (
              <div className="invalid-feedback">
                {errors.registrationNo.message}
              </div>
            )}
          </div>

          {/* Current Password */}
          <div className="mb-3 w-full px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="currentPassword"
            >
              Current Password:{" "}
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              className={`form-control ${
                errors.currentPassword ? "border-red-500" : ""
              }`}
              name="Password"
              type="password"
              id="currentPassword"
              placeholder="Current Password"
              {...register("currentPassword", {
                required: "Current Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.currentPassword && (
              <div className="invalid-feedback">
                {errors.currentPassword.message}
              </div>
            )}
          </div>

          {/* New Password */}
          <div className="mb-3 w-full px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="newPassword"
            >
              New Password:{" "}
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              className={`form-control ${
                errors.newPassword ? "border-red-500" : ""
              }`}
              name="Password"
              type="password"
              id="newPassword"
              placeholder="New Password"
              {...register("newPassword", {
                required: "New Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.newPassword && (
              <div className="invalid-feedback">
                {errors.newPassword.message}
              </div>
            )}
          </div>

          {/* Reset Password button */}
          <div className="mt-3 text-center">
            <button
              type="submit"
              disabled={formLoading}
              className={`btnSubmit ${
                formLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {formLoading ? (
                <>
                  <FaSpinner className="mr-3 animate-spin" />
                  Loading...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>

          <div className="mt-3 text-center">
            <p className="text-sm">
              Wanna go back to{" "}
              <Link to="/" className="text-primary font-medium hover:underline">
                Home
              </Link>{" "}
              page ?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
