'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import useAuth from '@/app/hooks/useAuth';
import { Button } from '@/app/components/Common/Button';
import { signupSchema } from '@/app/validation-schema/schema';
import Input from '@/app/components/Common/Input';
import Label from '@/app/components/Common/Label';
import CONSTANTS_STRING from '../constants/strings';

const SignupPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const { signupMutation } = useAuth();
  console.log(errors);
  const onSubmit = (data) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="h-screen p-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center overflow-auto">
      <div className="w-full max-w-4xl">
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl flex m-4">
          {/* Left side - Form */}
          <div className="w-full lg:w-[45%] p-4">
            <div className="w-full max-w-sm mx-auto space-y-4">
              {/* Logo and Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-start">
                  <Image
                    src="/logo.png"
                    alt="Schedule Me Logo"
                    className="w-6 h-6"
                    width={30}
                    height={30}
                  />
                  <h1 className="ml-2 text-md font-bold text-gray-900">
                    {CONSTANTS_STRING.APP_TITLE}
                  </h1>
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-bold tracking-tight text-gray-900">
                    {CONSTANTS_STRING.CREATE_ACCOUNT}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {CONSTANTS_STRING.GET_STARTED_WITH_FREE_ACCOUNT}
                  </p>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="space-y-2">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-[10px] font-medium text-gray-600"
                    >
                      {CONSTANTS_STRING.NAME}
                    </Label>
                    <div className="mt-1 relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                      <Input
                        id="name"
                        required={'true'}
                        register={register}
                        errors={errors}
                        name="name"
                        className="pl-8 w-full h-8 bg-gray-50 border-gray-200 rounded-md focus:ring-2 focus:ring-gray-900"
                        placeholder="Enter your name"
                      />
                    </div>
                    {errors?.name && (
                      <label className="text-xs text-red-700 mt-1">
                        {errors.name.message}
                      </label>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-[10px] font-medium text-gray-600"
                    >
                      {CONSTANTS_STRING.EMAIL}
                    </Label>
                    <div className="mt-1 relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        required={'true'}
                        errors={errors}
                        register={register}
                        className="pl-8 w-full h-8 bg-gray-50 border-gray-200 rounded-md focus:ring-2 focus:ring-gray-900"
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors?.email && (
                      <label className="text-xs text-red-700 mt-1">
                        {errors.email.message}
                      </label>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="password"
                      className="text-[10px] font-medium text-gray-600"
                    >
                      {CONSTANTS_STRING.PASSWORD}
                    </Label>
                    <div className="mt-1 relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        required={'true'}
                        errors={errors}
                        register={register}
                        className="pl-8 w-full h-8 bg-gray-50 border-gray-200 rounded-md focus:ring-2 focus:ring-gray-900"
                        placeholder="Create a password"
                      />
                    </div>
                    {errors?.password && (
                      <label className="text-xs text-red-700 mt-1">
                        {errors.password.message}
                      </label>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="confirmPassword"
                      className="text-[10px] font-medium text-gray-600"
                    >
                      {CONSTANTS_STRING.CONFIRM_PASSWORD}
                    </Label>
                    <div className="mt-1 relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        required={'true'}
                        errors={errors}
                        register={register}
                        className="pl-8 w-full h-8 bg-gray-50 border-gray-200 rounded-md focus:ring-2 focus:ring-gray-900"
                        placeholder="Confirm your password"
                      />
                    </div>
                    {errors?.confirmPassword && (
                      <label className="text-xs text-red-700 mt-1">
                        {errors.confirmPassword.message}
                      </label>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className="w-full h-8 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-md transition-all duration-150 ease-in-out hover:shadow-lg"
                >
                  {signupMutation.isPending
                    ? 'Creating account...'
                    : 'Create account'}
                </Button>
              </form>

              <p className="text-center text-xs text-gray-500">
                {CONSTANTS_STRING.ALREADY_HAVE_AN_ACCOUNT}{' '}
                <button
                  onClick={() => router.push('/login')}
                  className="font-medium text-gray-900 hover:text-gray-700"
                >
                  {CONSTANTS_STRING.SIGNIN}
                </button>
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="hidden lg:block lg:w-[55%] bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
              alt="Productivity"
              className="w-full h-full object-cover rounded-l-2xl"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
