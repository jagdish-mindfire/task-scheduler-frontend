import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signup() {
    const [data,setData] = useState({email:'',name:'',password:''});
    const [errorMessage,setErrorMessage] = useState(null);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isValidName, setIsValidName] = useState(true);



    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!buttonDisabled){
          if(data?.name?.length ===0 ){
            setIsValidName(false);
            return;
          }
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
          const response = await axios.post(apiUrl+'/auth/signup',{email:data?.email,password:data?.password,name:data?.name});
          navigate("/login",{ state: { showSuccess:true } });
        } catch (error) {
          console.log(error);
          // console.log(error.response.data);
          setErrorMessage(error?.response?.data?.message)
        }
      }
    }

    useEffect(() => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      if (data?.email?.length === 0 || emailRegex.test(data?.email)) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
  
      if (data?.password?.length === 0 || data?.password?.length >= 8) {
        setIsValidPassword(true);
      } else {
        setIsValidPassword(false);
      }

      if(data?.name?.length > 0){
        setIsValidName(true);
      }

      if (
        data?.password?.length === 0 ||
        !isValidPassword ||
        data?.email?.length === 0 ||
        !isValidEmail || data?.name?.length === 0 ) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    }, [data]);

    return (
      <>
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
              Sign up to use Task Scheduler
            </h2>
            <h3 className="mt-3 text-red-600 "></h3>
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
                    value={data?.email}
                    onChange={(e)=>setData((prev)=>{return {...prev,email:e.target.value}})}
                    autoComplete="email"
                    className={(!isValidEmail
                      ? "ring-red-700 focus:ring-red-700"
                      : "focus:ring-indigo-600 ring-gray-300") + " block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"}
                  />
                </div>
                {!isValidEmail && (
                <label className="text-red-700">
                  Please Enter a valid email address
                </label>
              )}
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={data?.name}
                    onChange={(e)=>setData((prev)=>{return {...prev,name:e.target.value}})}
                    required
                    autoComplete="true"
                    className={(!isValidName
                      ? "ring-red-700 focus:ring-red-700"
                      : "focus:ring-indigo-600 ring-gray-300") + " block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"}
                  />
                </div>
                {!isValidName  && (
                <label className="text-red-700">
                  Please enter a valid name
                </label>
              )}
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
                    value={data?.password}
                    onChange={(e)=>setData((prev)=>{return {...prev,password:e.target.value}})}
                    autoComplete="current-password"
                    className={(!isValidPassword
                      ? "ring-red-700 focus:ring-red-700"
                      : "focus:ring-indigo-600 ring-gray-300") + " block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"}
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
                  type="submit"
                  onClick={handleSubmit}
                  disabled={buttonDisabled}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    buttonDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already Got an account ?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign In
            </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  