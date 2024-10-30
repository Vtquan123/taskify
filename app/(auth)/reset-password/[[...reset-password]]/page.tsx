"use client"

import { useAuth, useSignIn } from "@clerk/nextjs";
import { Button, FormControl, FormField, FormItem, Input } from "@components";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type ResetPassword = {
  code: string,
  password: string
}

export default function ResetPassword() {
  const method = useForm<ResetPassword>()
  const { isLoaded, signIn, setActive } = useSignIn()
  const isSignIn = useAuth()
  
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleResetPassword = async (data: ResetPassword) => {
    if (!isLoaded) return;
    if (isSignIn) router.push('/dashboard');
    try {
      setLoading(true);
      await signIn
        ?.attemptFirstFactor({
          strategy: 'reset_password_email_code',
          code: data.code,
          password: data.password,
        })
        .then(async (result) => {
          setLoading(false);
          // if (result.status === 'needs_second_factor') {
          // } else
          if (result.status === 'complete') {
            router.push('/sign-in');
          }
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return <div className="flex flex-col items-center justify-center h-full relative">
    <div className="flex flex-col gap-4 max-w-[450px] p-6 m-auto">
      <Image width={200} height={80} src="/images/logo.svg" alt="logo" />
      <FormProvider {...method}>
        <form
          id="reset-password"
          onSubmit={method.handleSubmit(handleResetPassword)}
          className="flex flex-col gap-4"
        >
          <p className="text-lg py-4 font-semibold">Enter the verify code and new password to reset.</p>
          <FormField
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} label="Code" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" label="Password"/>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="flex w-full" loading={loading} disabled={loading}>Reset Password</Button>
        </form>
      </FormProvider>
    </div>
    <div>
      <Link href="/forgot-password" className="ml-2 text-primary"><i className="ri-arrow-left-line mr-2"/>Go back</Link>
    </div>
  </div>
}