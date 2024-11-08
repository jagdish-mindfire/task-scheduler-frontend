import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Common/Button'
import Input from '../../components/Common/Input'
import Label from '../../components/Common/Label'
import { Mail, Lock, User } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '../../validation-schema/schema'
import useAuth from '../../hooks/useAuth'

const SignupPage = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) })

  const { signupMutation } = useAuth()
  console.log(errors)
  const onSubmit = (data) => {
    signupMutation.mutate(data)
    // console.log("didisignup",data);
  }

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
                  <img
                    src="/logo.png"
                    alt="Schedule Me Logo"
                    className="w-6 h-6"
                  />
                  <h1 className="ml-2 text-md font-bold text-gray-900">
                    Schedule Me
                  </h1>
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-bold tracking-tight text-gray-900">
                    Create account
                  </h2>
                  <p className="text-xs text-gray-500">
                    Get started with your free account
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
                      Full Name
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
                      Email
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
                      Password
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
                      className="text-[5px] font-medium text-gray-600"
                    >
                      Confirm Password
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
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
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
              className="w-full h-full object-cover rounded-l-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
