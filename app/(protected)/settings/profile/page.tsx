"use client"

import { useUser } from "@/hooks/common";
import { getName } from "@/utils/client/common";
import { Avatar, AvatarFallback, AvatarImage, Button, FormControl, FormField, FormItem, Input, Label, RadioGroup, RadioGroupItem } from "@components";
import { FormProvider, useForm } from "react-hook-form";

type Profile = {
  firstName?: string,
  lastName?: string,
  birthday?: string,
  gender?: string,
}

export default function Profile() {
  const { user } = useUser()
  const { shortName } = getName(user?.firstName, user?.lastName)
  const methods = useForm<Profile>({
    values: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      birthday: user?.birthday,
      gender: user?.gender
    }
  })

  const handleSubmit = () => { }

  return <div className="container mx-auto w-full">
    <div className="mb-6">
      <Label className="block mb-4">Profile picture</Label>
      <div className="flex items-center gap-6">
        <Avatar className="w-[80px] h-[80px]">
          <AvatarImage src={user?.profileImageUrl} alt="profile-image" />
          <AvatarFallback>{shortName}</AvatarFallback>
        </Avatar>
        <Button>Change picture</Button>
      </div>
    </div>
    <FormProvider {...methods}>
      <form
        id="user-profile"
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="w-full flex-1"
      >
        <div className="grid gap-8 grid-cols-2">
          <FormField
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field}  label="First name" />
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
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} label="Birthday" placeholder="MM/DD/YYYY"/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Label className="mb-[12px] block leading-[inherit]">Gender</Label>
                    <RadioGroup {...field} onValueChange={field.onChange} defaultValue="male" className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="male" id="male"/>
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="female" id="female"/>
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} label="Email" disabled value={user?.email} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-8 flex justify-end">
          <Button type="submit" className="w-full max-w-[200px]">Save</Button>
        </div>
      </form>
    </FormProvider>
  </div>
}