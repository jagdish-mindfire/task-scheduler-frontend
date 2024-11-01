import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import Label from "../../components/Common/Label";
import { Mail, Lock, User } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../validation-schema/schema";
import useAuth from "../../hooks/useAuth";

const SignupPage = () => {
  const navigate = useNavigate();
 



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const { signupMutation } = useAuth();
  console.log(errors)
  const onSubmit = (data) => {
    // signupMutation.mutate(data);
    console.log("didisignup",data);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-5xl">
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl flex">
          {/* Left side - Form */}
          <div className="w-full lg:w-[45%] p-6">
            <div className="w-full max-w-md mx-auto space-y-6">
              {/* Logo and Title */}
              <div className="space-y-4">
                <div className="flex items-center justify-start">
                  <img
                    src="/logo.png"
                    alt="Schedule Me Logo"
                    className="w-8 h-8"
                  />
                  <h1 className="ml-2 text-xl font-bold text-gray-900">
                    Schedule Me
                  </h1>
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Create account
                  </h2>
                  <p className="text-sm text-gray-500">
                    Get started with your free account
                  </p>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </Label>
                    <div className="mt-1 relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        required={"true"}
                        register={register}
                        errors={errors}
                        name="name"
                        className="pl-10 w-full h-10 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </Label>
                    <div className="mt-1 relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        required={"true"}
                        errors={errors}

                        register={register}
                        className="pl-10 w-full h-10 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </Label>
                    <div className="mt-1 relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        required={"true"}
                        errors={errors}
                        register={register}
                        className="pl-10 w-full h-10 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900"
                        placeholder="Create a password"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </Label>
                    <div className="mt-1 relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        required={"true"}
                        errors={errors}

                        register={register}
                        className="pl-10 w-full h-10 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className="w-full h-10 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg
                    transition-all duration-150 ease-in-out hover:shadow-lg"
                >
                  {signupMutation.isPending
                    ? "Creating account..."
                    : "Create account"}
                </Button>
              </form>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-medium text-gray-900 hover:text-gray-700"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="hidden lg:block lg:w-[55%] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
              alt="Productivity"
              className="w-full h-full object-cover rounded-l-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
