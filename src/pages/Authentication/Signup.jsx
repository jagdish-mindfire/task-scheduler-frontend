import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import CONSTANTS_STRING from "../../constants/strings";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/Common/InputField";
import { signupSchema } from "../../validation-schema/schema";
import useAuth from "../../hooks/useAuth";
export default function Signup() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const {signupMutation} = useAuth();

  const onSubmit = (data) => {
      signupMutation.mutate(data);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-3">
          <h2 className="mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {CONSTANTS_STRING.APP_TITLE}
          </h2>
          <img
            alt="Mindfire"
            src="https://www.mindfiresolutions.com/home-assets/images/logo.webp"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {CONSTANTS_STRING.SIGN_UP_TO_USE_APP}
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="rounded-lg border border-gray-300 shadow-lg p-6 bg-white">
            <form
              action="#"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <InputField
                label={CONSTANTS_STRING.EMAIL}
                type="email"
                register={register}
                errors={errors}
                name="email"
                required
              />
              <InputField
                label={CONSTANTS_STRING.NAME}
                type="text"
                register={register}
                errors={errors}
                name="name"
                required
              />
              <InputField
                label={CONSTANTS_STRING.PASSWORD}
                type="password"
                register={register}
                errors={errors}
                name="password"
                required
              />

              <div>
                <button
                  type="submit"
                  data-testid="submit_signup"
                  disabled={signupMutation.isPending}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    signupMutation.isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-slate-900 hover:bg-slate-950 focus-visible:outline-slate-950"
                  }`}
                >
                  {signupMutation.isPending ? CONSTANTS_STRING.LOADING : CONSTANTS_STRING.SIGNUP}
                </button>
              </div>
            </form>

            <p className="mt-5 text-center text-sm text-gray-500">
              {CONSTANTS_STRING.ALREADY_HAVE_AN_ACCOUNT}{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-slate-800 hover:text-slate-950"
              >
                {CONSTANTS_STRING.SIGNIN}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

