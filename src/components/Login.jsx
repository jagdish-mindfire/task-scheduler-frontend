import {useState,useEffect,useContext} from 'react'
import { Link,useNavigate,useLocation } from "react-router-dom"
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Modal from "./Modal";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.post(apiUrl+'/auth/login',{email,password});
      const refreshToken = response.data.refresh_token;
      const name = response.data?.name;
      login(refreshToken,name);
      navigate('/dashboard');
      
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error?.response?.data?.message)
    }
  };

  useEffect(()=>{
    if(location?.state?.showSuccess){
      setShowModal(true);
    }
  },[])
  return (
    <>
      <Modal open={showModal} setOpen={setShowModal} title={'Success'} description={'your account created Successfully,Please Login to proceed'} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center m-6 text-xl font-bold">
          Welcome To Task Scheduler
        </div>
          <img
            alt="Mindfire"
            src="https://www.mindfiresolutions.com/home-assets/images/logo.webp"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <h4 className='text-red-500 text-center mt-5'>
            {errorMessage}
          </h4>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                  onChange={(e)=>setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have a account ?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
