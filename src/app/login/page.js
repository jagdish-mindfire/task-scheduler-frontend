"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, Lock } from 'lucide-react';
import Image from 'next/image'

import { Button } from "@/app/components/Common/Button";
import Input from "@/app/components/Common/Input";
import Label from "@/app/components/Common/Label";
import useAuth from '@/app/hooks/useAuth';
import { loginSchema } from "@/app/validation-schema/schema";

import CONSTANTS_STRING from '../constants/strings';

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { loginMutation } = useAuth();

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-2 sm:p-4 lg:p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl flex">
          {/* Left side - Form */}
          <div className="w-full lg:w-[45%] p-6 sm:p-8">
            <div className="w-full max-w-md mx-auto space-y-6">
              {/* Logo and Title */}
              <div className="space-y-4">
                <div className="flex items-center justify-start">
                  <Image src="/logo.png" alt="Schedule Me Logo" className="w-8 h-8" width={30} height={20}/>
                  <h1 className="ml-2 text-xl font-bold text-gray-900">{CONSTANTS_STRING.APP_TITLE}</h1>
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">{CONSTANTS_STRING.WELCOME_BACK}</h2>
                  <p className="text-sm text-gray-500">{CONSTANTS_STRING.ENTER_CREDENTIALS}</p>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="email" className="text-xs font-medium text-gray-700">
                    {CONSTANTS_STRING.EMAIL}
                    </Label>
                    <div className="mt-1 relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10 w-full h-10 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900"
                        placeholder="Enter your email"
                        register={register}
                        errors={errors}
                        name="email"
                        required
                      />
                    </div>
                    {errors?.email && (
                      <label className="text-xs text-red-700 mt-1">{errors.email.message}</label>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-xs font-medium text-gray-700">
                    {CONSTANTS_STRING.PASSWORD}
                      </Label>
                    </div>
                    <div className="mt-1 relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        required
                        className="pl-10 w-full h-10 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900"
                        placeholder="Enter your password"
                        register={register}
                        errors={errors}
                        name="password"
                      />
                    </div>
                    {errors?.password && (
                      <label className="text-xs text-red-700 mt-1">{errors.password.message}</label>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full h-10 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-lg
                    transition-all duration-150 ease-in-out hover:shadow-lg"
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <p className="text-center text-xs text-gray-500">
              {CONSTANTS_STRING.DONT_HAVE_ACCOUNT_TEXT}
              {" "}
                <button
                  onClick={() => router.push('/signup')}
                  className="font-medium text-gray-900 hover:text-gray-700"
                >
                    {CONSTANTS_STRING.SIGNUP}
                </button>
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="hidden lg:block lg:w-[55%] bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              alt="Productivity"
              className="w-full h-full object-cover rounded-l-2xl"
              width={300} height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}