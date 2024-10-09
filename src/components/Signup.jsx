import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CONSTANTS_STRING from "../constants/strings";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import signupAPI from "../api/signupAPI";
export default function Signup() {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(3),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async ({ email, name, password }) => {
    try {
      const response = await signupAPI({ email, name, password });
      navigate("/login", { state: { showSuccess: true } });
    } catch (error) {
      setError("root", {
        message:
          error?.response?.data?.message ||
          CONSTANTS_STRING.SOMETHING_WENT_WRONG,
      });
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {CONSTANTS_STRING.APP_TITLE}
          </h2>
          <img
            alt="Mindfire"
            src="https://www.mindfiresolutions.com/home-assets/images/logo.webp"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {CONSTANTS_STRING.SIGN_UP_TO_USE_APP}
          </h2>
          <h2 className="mt-1 text-red-600 font-bold text-center ">
            {errors?.root?.message}
          </h2>
        </div>

        <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
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
              <div className="mt-1">
                <input
                  data-testid="email"
                  {...register("email")}
                  required
                  autoComplete="email"
                  className={
                    (errors.email
                      ? "ring-red-700 focus:ring-red-700"
                      : "focus:ring-indigo-600 ring-gray-300") +
                    " block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  }
                />
              </div>
              {errors.email && (
                <label className="text-red-700">{errors.email.message}</label>
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {CONSTANTS_STRING.NAME}
              </label>
              <div className="mt-1">
                <input
                  data-testid="name"
                  type="text"
                  {...register("name")}
                  required
                  autoComplete="true"
                  className={
                    (errors.name
                      ? "ring-red-700 focus:ring-red-700"
                      : "focus:ring-indigo-600 ring-gray-300") +
                    " block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  }
                />
              </div>
              {errors.name && (
                <label className="text-red-700">{errors.name.message}</label>
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
              <div className="mt-1">
                <input
                  data-testid="password"
                  {...register("password")}
                  type="password"
                  required
                  autoComplete="current-password"
                  className={
                    (errors.password
                      ? "ring-red-700 focus:ring-red-700"
                      : "focus:ring-indigo-600 ring-gray-300") +
                    " block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
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
                data-testid="submit_signup"
                disabled={isSubmitting}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                }`}
              >
                {isSubmitting
                  ? CONSTANTS_STRING.LOADING
                  : CONSTANTS_STRING.SIGNUP}
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            {CONSTANTS_STRING.ALREADY_HAVE_AN_ACCOUNT}{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {CONSTANTS_STRING.SIGNIN}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
