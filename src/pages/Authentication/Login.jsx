import { useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../components/Common/Modal";
import {UserLogin} from "../../services/authService";
import { ShowErrorToast } from "../../services/toastService";

import CONSTANTS_STRING from "../../constants/strings";

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async ({ email, password }) => {
    try {
      await UserLogin({ email, password });
      window.location.replace('/dashboard')
    } catch (error) {
      ShowErrorToast(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (location?.state?.showSuccess) {
      setShowModal(true);
    }
  }, []);
  return (
    <>
      <Modal
        open={showModal}
        setOpen={setShowModal}
        title={"Success"}
        description={
          "your account created Successfully,Please Login to proceed"
        }
      />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-0 mb-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {CONSTANTS_STRING.APP_TITLE}
          </h2>
          <img
            alt="Mindfire"
            src="https://www.mindfiresolutions.com/home-assets/images/logo.webp"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {CONSTANTS_STRING.LOGIN_TO_YOUR_ACCOUNT}
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {CONSTANTS_STRING.EMAIL}
              </label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  data-testid="email"
                  required
                  autoComplete="email"
                  className={
                    (errors.email
                      ? " ring-red-700 focus:ring-red-700 "
                      : "ring-gray-300 focus:ring-indigo-600") +
                    " block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  }
                />
              </div>
              {errors.email && (
                <label className="text-red-700">{errors.email.message}</label>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {CONSTANTS_STRING.PASSWORD}
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  data-testid="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className={
                    (errors.password
                      ? "ring-red-700 focus:ring-red-700"
                      : "focus:ring-indigo-600 ring-gray-300") +
                    "block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  }
                />
              </div>
              {errors.password && (
                <label className="text-red-700">
                  {errors.password.message}
                </label>
              )}
            </div>

            <div>
              <button
                type="submit"
                data-testid="submit_login"
                disabled={isSubmitting}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600"
                }`}
              >
                {isSubmitting ? CONSTANTS_STRING.LOADING: CONSTANTS_STRING.SIGNIN}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-Slate-900">
            {CONSTANTS_STRING.DONT_HAVE_ACCOUNT}{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-grey-600 hover:text-grey-500 "
            >
              {CONSTANTS_STRING.SIGNUP}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
