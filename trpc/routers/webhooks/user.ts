import { createTRPCRouter, prisma, publicProcedure } from '../../init';
import { z } from 'zod'

export const webhookUserRouter = createTRPCRouter({
  createUser: publicProcedure.input(z.object({
    data: z.object({}).catchall(z.any()),
  })).mutation(async ({ input }) => { 
    const { data } = input
    await prisma.user.create({
      data: {
        userId: data.id,
        email: data.email_addresses[0].email_address,
        emailObject: data.email_addresses[0],
        banned: data.banned,
      
        firstName: data.first_name,
        lastName: data.last_name,
        gender: data.gender,
        birthday: data.birthday,
        phoneNumbers: data.phone_numbers,
        imageUrl: data.image_url,
      
        username: data.username,
        passwordEnabled: data.password_enabled,
        profileImageUrl: data.profile_image_url,
        twoFactorEnabled: data.two_factor_enabled,
        object: data.object,

        createdAt: new Date(data.created_at).toISOString(),
        updatedAt: new Date(data.updated_at).toISOString()
    }})
  }),
  updateUser: publicProcedure.input(z.object({
    data: z.object({}).catchall(z.any()),
  })).mutation(async ({ input }) => {
    const { data } = input
    await prisma.user.update({
      where: {
        userId: data.id
      },
      data: {
        emailObject: data.email_addresses[0],
        banned: data.banned,
      
        firstName: data.first_name,
        lastName: data.last_name,
        gender: data.gender,
        birthday: data.birthday,
        phoneNumbers: data.phone_numbers,
        imageUrl: data.image_url,
      
        passwordEnabled: data.password_enabled,
        profileImageUrl: data.profile_image_url,
        twoFactorEnabled: data.two_factor_enabled,
        object: data.object,

        updatedAt: new Date(data.updated_at).toISOString()
      }
    })
  }),
  deleteUser: publicProcedure.input(z.object({
    id: z.string()
  })).mutation(async ({ input }) => {
    const { id } = input
    if (id)
    {
      await prisma.user.delete({
      where: {
        userId: id
      }
    })}
  })
})