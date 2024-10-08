import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FaAsterisk, FaSpinner } from "react-icons/fa";
import { loginFunction } from "../Services/API";
import ToastMsg from "../Utility/ToastMsg";

const Login = () => {
  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const handleLogin = async (formData) => {
    //console.log(formData);
    setFormLoading(true);
    try {
      const { registrationNo, password } = formData;
      const response = await loginFunction(registrationNo, password);
      console.log(response);

      if (response.status == 200) {
        const { name, registrationNo, _id } = response.data.data;

        // Store the required fields in session storage
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("registrationNo", registrationNo);
        sessionStorage.setItem("id", _id);

        ToastMsg(response.data.message, "success");

        // Website refreshed after 1 seconds
        setTimeout(() => {
          window.location.reload();
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
          Login
        </h2>
        <form
          name="login-form"
          className="w-full"
          onSubmit={handleSubmit(handleLogin)}
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
              className={`form-control ${
                errors.registrationNo ? "border-red-500" : ""
              }`}
              name="Registration No"
              type="text"
              id="registrationNo"
              placeholder="Registration No"
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

          {/* Password */}
          <div className="mb-3 w-full px-2">
            <label
              className="text-sm font-medium text-gray-700 flex items-center"
              htmlFor="password"
            >
              Password:{" "}
              <FaAsterisk className="text-red-500 ml-[2px] text-[6px]" />
            </label>
            <input
              className={`form-control ${
                errors.password ? "border-red-500" : ""
              }`}
              name="Password"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Login button */}
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
                "Login"
              )}
            </button>
          </div>

          {/* Signup */}
          <div className="mt-3 text-center">
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
