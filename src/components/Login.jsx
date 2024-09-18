import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Modal from "./Modal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email?.length === 0 || emailRegex.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }

    if (password?.length === 0 || password?.length >= 8) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }

    if (
      password?.length === 0 ||
      password?.length < 8 ||
      email?.length === 0 ||
      !isValidEmail
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
    console.log(buttonDisabled);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buttonDisabled) {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.post(apiUrl + "/auth/login", {
          email,
          password,
        });
        const refreshToken = response.data.refresh_token;
        const name = response.data?.name;
        login(refreshToken, name);
        navigate("/dashboard");
      } catch (error) {
        console.log(error.response.data);
        setErrorMessage(error?.response?.data?.message);
      }
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
            Task Scheduler
          </h2>
          <img
            alt="Mindfire"
            src="https://www.mindfiresolutions.com/home-assets/images/logo.webp"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <h4 className="text-red-500  font-bold text-center mt-1">{errorMessage}</h4>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className={
                    (!isValidEmail
                      ? " ring-red-700 focus:ring-red-700 "
                      : "ring-gray-300 focus:ring-indigo-600") +
                    " block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  }
                />
              </div>
              {!isValidEmail && (
                <label className="text-red-700">
                  Please Enter a valid email address
                </label>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className={
                    (!isValidPassword
                      ? "ring-red-700 focus:ring-red-700"
                      : "focus:ring-indigo-600 ring-gray-300") +
                    "block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  }
                />
              </div>
              {!isValidPassword && (
                <label className="text-red-700">
                  Password shoud contains minimun 8 chars
                </label>
              )}
            </div>

            <div>
              <button
                onClick={handleSubmit}
                disabled={buttonDisabled}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  buttonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                }`}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have a account ?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 "
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
