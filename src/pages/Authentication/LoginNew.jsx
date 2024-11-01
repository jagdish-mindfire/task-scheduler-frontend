import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import Label from "../../components/Common/Label";
import { Mail, Lock } from 'lucide-react';
import useAuth from "../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../validation-schema/schema";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  
  const {loginMutation} = useAuth();

  const onSubmit = (data) => {
    console.log("Submitting data:--", data); // Log the submitted data

    // loginMutation.mutate(data);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   setIsLoading(false);
  //   console.log('Login submitted');
  // };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-6xl">
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl flex">
          {/* Left side - Form */}
          <div className="w-full lg:w-[45%] p-8 sm:p-12">
            <div className="w-full max-w-md mx-auto space-y-8">
              {/* Logo and Title */}
              <div className="space-y-6">
                <div className="flex items-center justify-start">
                  <img src="/logo.png" alt="Schedule Me Logo" className="w-10 h-10" />
                  <h1 className="ml-2 text-2xl font-bold text-gray-900">Schedule Me</h1>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h2>
                  <p className="text-gray-500">Enter your credentials to access your account</p>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <div className="mt-1 relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10 w-full h-11 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900"
                        placeholder="Enter your email"
                        register={register}
                        errors={errors}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                      </Label>
                      <button
                        type="button"
                        onClick={() => navigate('/forgot-password')}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="mt-1 relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        required
                        className="pl-10 w-full h-11 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900"
                        placeholder="Enter your password"
                        register={register}
                        errors={errors}
                        name="password"

                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg
                    transition-all duration-150 ease-in-out hover:shadow-lg"
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate('/signup')}
                  className="font-medium text-gray-900 hover:text-gray-700"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="hidden lg:block lg:w-[55%] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              alt="Productivity"
              className="w-full h-full object-cover rounded-l-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}