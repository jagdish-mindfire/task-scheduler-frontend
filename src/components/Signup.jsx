import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
export default function Signup() {
    const [data,setData] = useState({email:'',name:'',password:''});
    const [errorMessage,setErrorMessage] = useState(null);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
          const response = await axios.post(apiUrl+'/auth/signup',{email:data?.email,password:data?.password,name:data?.name});
          const message = response.data?.message;
          
        } catch (error) {
          console.log(error.response.data);
          setErrorMessage(error?.response?.data?.message)
        }
    }
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
                    className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
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
                    value={data?.password}
                    onChange={(e)=>setData((prev)=>{return {...prev,password:e.target.value}})}
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already Got an account ?{' '}
              <Link to="/login">
            <a  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign In
             </a>
            </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  