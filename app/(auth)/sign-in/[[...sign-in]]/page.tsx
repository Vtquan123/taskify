"use client"

import { cn } from "@/lib/utils";
import { useSignIn, useSignUp, SignIn as CLerkSignIn } from "@clerk/nextjs";
import { Button, FormControl, FormField, FormItem, Input } from "@components";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type SignInForm = {
  email: string,
  password: string
}

export default function SignIn() {
  const method = useForm<SignInForm>()
  const { isLoaded, signIn, setActive } = useSignIn()
  const { signUp, setActive: setSignUpActive } = useSignUp()
  
  const [loading, setLoading] = useState(false)
  const [oAuthLoading, setOAuthLoading] = useState('')
  const router = useRouter()

  const handleSignIn = async (data:SignInForm) => { 
    if (!isLoaded) return
    try { 
      setLoading(true)
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password
      })
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.push('/dashboard')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleOauth = async (method: string) => {
    if (!isLoaded || !signIn || !signUp) return;

    try {
      setOAuthLoading(method)

      // Transfer OAuth account to existed account
      const userExistsButNeedsToSignIn = signUp?.verifications.externalAccount.status === 'transferable' && signUp.verifications.externalAccount.error?.code === 'external_account_exists'
      if (userExistsButNeedsToSignIn) {
        const res = await signIn.create({ transfer: true })
        
        if (res.status === 'complete') {
          setActive({
            session: res.createdSessionId
          })
          router.push('/dashboard')
        }
      }

      // Create an account for an OAuth account
      const userNeedsToBeCreated = signIn.firstFactorVerification.status === 'transferable' && signIn.firstFactorVerification.error?.code === 'external_account_not_found'
      if (userNeedsToBeCreated) {
        const res = await signUp.create({
          transfer: true
        })

        if (res.status === 'complete') {
          setSignUpActive({
            session: res.createdSessionId
          })
          router.push('/dashboard')
        }
      } else {
          // Sign in to a OAuth/app account
          await signIn.authenticateWithRedirect({
            strategy: method as any,
            redirectUrl: '/dashboard',
            redirectUrlComplete: '/dashboard',
          });
          console.log('hello')
      }
    } catch (err: any) {
        throw new Error(err);
    } finally {
      setOAuthLoading('')
    }
  };

  useEffect(() => { 
    const userNeedsToBeCreated = signIn?.firstFactorVerification.status === 'transferable' && signIn?.firstFactorVerification.error?.code === 'external_account_not_found'
    if (userNeedsToBeCreated && signIn.firstFactorVerification.strategy) {
      handleOauth(signIn.firstFactorVerification.strategy)
    }
  },[signIn])

  return <div className={cn(
    "flex flex-col items-center justify-center h-full relative",
    `${oAuthLoading ? "opacity-50 pointer-events-none" : ''}`
  )}>
    <div className="flex flex-col gap-4 max-w-[450px] p-6 m-auto">
      <Image width={200} height={80} src="/images/logo.svg" alt="logo" />
      <FormProvider {...method}>
        <form
          id="sign-in"
          onSubmit={method.handleSubmit(handleSignIn)}
          className="flex flex-col gap-4"
        >
          <p className="text-lg py-4 font-semibold">Enter your email and password to continue</p>
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
                  <Input {...field} type="password" label="Password"/>
                </FormControl>
              </FormItem>
            )}
          />
          <Link href="/forgot-password" className="text-right py-2">Forgot password?</Link>
          <Button type="submit" className="flex w-full" loading={loading} disabled={loading}>Sign In</Button>
        </form>
      </FormProvider>
      <div className="text-sm h-[1px] bg-gray-300 my-4 relative mx-6">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-white text-textGray1">
          Or
        </span>
      </div>
      <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleOauth('oauth_google')}
              loading={oAuthLoading === 'oauth_google'}
              >
              <img src="/icons/google.svg" className="w-[20px]" />
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleOauth('oauth_facebook')}
              loading={oAuthLoading === 'oauth_facebook'}
            >
              <img src="/icons/facebook.svg" className="w-[20px]" />
            </Button>
      </div>
    </div>
    <div>
      Don't have an account?
      <Link href="/sign-up" className="ml-2 text-primary">Sign Up</Link>
    </div>
  </div>
}