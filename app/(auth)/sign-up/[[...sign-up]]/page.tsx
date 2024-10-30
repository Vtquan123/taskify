"use client"

import { useSignUp } from "@clerk/nextjs";
import { Button, FormControl, FormField, FormItem, Input } from "@components";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const method = useForm<SignUpForm>()
  const { isLoaded, signUp, setActive } = useSignUp()
  
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (data:SignUpForm) => { 
    if (!isLoaded) return;
    try {
      setLoading(true);
      const signInUpAttempt = await signUp.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.email,
        password: data.password,
      });
      if (signInUpAttempt.status === 'complete') {
        await setActive({ session: signInUpAttempt.createdSessionId });
        router.push('/dashboard');
      } else {
        console.error(JSON.stringify(signInUpAttempt, null, 2));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    }


  return <div className="flex flex-col items-center justify-center h-full relative">
    <div className="flex flex-col gap-4 max-w-[450px] p-6 m-auto w-full">
      <Image width={200} height={80} src="/images/logo.svg" alt="logo" />
      <FormProvider {...method}>
        <form
          id="sign-up"
          onSubmit={method.handleSubmit(handleSignIn)}
          className="flex flex-col gap-4"
        >
          <p className="text-lg py-4 font-semibold">Create an account</p>
          <FormField
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} label="First name" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} label="Last name" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} label="Email" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="password" label="Password" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      label="Confirm password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          <p className="text-sm my-4 text-left">
              By creating an account, you agree to our
              {' '}
              <span className="text-primary underline">
                Terms of Service
              </span>{' '}
              and{' '}
              <span className="text-primary underline">Privacy Policy.</span>{' '}
              .
            </p>
          <Button type="submit" className="flex w-full" loading={loading}>Sign Up</Button>
        </form>
      </FormProvider>
      {/* <div className="text-sm h-[1px] bg-gray-300 my-6 relative">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-white text-textGray1">
          Or
        </span>
      </div>
      <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleOauth('oauth_google')}
            >
              <img src="/icons/google.svg" className="w-[20px]" />
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleOauth('oauth_facebook')}
            >
              <img src="/icons/facebook.svg" className="w-[20px]" />
            </Button>
      </div> */}
    </div>
    <div>
      You had an account?
      <Link href="/sign-in" className="ml-2 text-primary">Sign In</Link>
    </div>
  </div>
}