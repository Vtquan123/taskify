"use client"

import { useAuth, useSignIn } from "@clerk/nextjs";
import { Button, FormControl, FormField, FormItem, Input } from "@components";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type ForgotPasswordForm = {
  email: string,
}

export default function ForgotPassword() {
  const method = useForm<ForgotPasswordForm>()
  const { isLoaded, signIn } = useSignIn()
  const isSignIn = useAuth()
  
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleForgotPassword = async (data:ForgotPasswordForm) => { 
    if (!isLoaded) return
    if (isSignIn) router.push('/dashboard');
    try { 
      setLoading(true)
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: data.email,
      }).then(() => { 
        setLoading(false)
        router.push('/reset-password');
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  return <div className="flex flex-col items-center justify-center h-full relative">
    <div className="flex flex-col gap-4 max-w-[450px] p-6 m-auto">
      <Image width={200} height={80} src="/images/logo.svg" alt="logo" />
      <FormProvider {...method}>
        <form
          id="forgot-password"
          onSubmit={method.handleSubmit(handleForgotPassword)}
          className="flex flex-col gap-4"
        >
          <p className="text-lg py-4 font-semibold">We will send a verify code to your email.<br/> Please enter your email</p>
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Email" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="flex w-full" loading={loading} disabled={loading}>Send</Button>
        </form>
      </FormProvider>
    </div>
    <div>
      <Link href="/sign-in" className="ml-2 text-primary"><i className="ri-arrow-left-line mr-2"/>Go back</Link>
    </div>
  </div>
}