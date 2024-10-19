import { useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import Modal from "../../components/Common/Modal";
import { ShowErrorToast } from "../../services/toastService";
import InputField from "../../components/Common/InputField";
import { userLogin } from "../../api/apiLogin";
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
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });


  const loginMutation = useMutation({
    mutationFn: (credentials) => userLogin(credentials),
    onSuccess: () => {
      window.location.replace('/dashboard');
    },
    onError: (error) => {
      console.log(error);
      ShowErrorToast(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
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
        "Your account was created successfully. Please log in to proceed."
      }
    />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {CONSTANTS_STRING.APP_TITLE}
          </h2>
          <img
            alt="Mindfire"
            src="https://www.mindfiresolutions.com/home-assets/images/logo.webp"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {CONSTANTS_STRING.LOGIN_TO_YOUR_ACCOUNT}
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="rounded-lg border border-gray-300 shadow-lg p-6 bg-white">
            <form
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
                  data-testid="submit_login"
                  disabled={isSubmitting}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600"
                  }`}
                >
                  {isSubmitting ? CONSTANTS_STRING.LOADING : CONSTANTS_STRING.SIGNIN}
                </button>
              </div>
            </form>

            <p className="mt-5 text-center text-sm text-gray-500">
              {CONSTANTS_STRING.DONT_HAVE_ACCOUNT}{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-slate-800 hover:text-slate-950"
              >
                {CONSTANTS_STRING.SIGNUP}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
