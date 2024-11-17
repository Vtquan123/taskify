import { createTRPCRouter, prisma, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const userRouters = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user) {
      const user = await ctx.prisma.user.findFirst({
        where: {
          userId: ctx.user.userId
      }})
      return user
    }
    throw new TRPCError({ code: "NOT_FOUND" })
  }),
  read: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findFirst({ where: { userId: input.id } })
    if (user) {
      return user
    }
    throw new TRPCError({ code: "NOT_FOUND" })
  }),
  toggleDarkMode: protectedProcedure.input(z.boolean()).mutation(async ({ input, ctx }) => {
    if (ctx.user) {
      await ctx.prisma.user.update({
        where: {
          userId: ctx.user.userId
        },
        data: {
          setting: {
            update: {
              theme: input ? 'dark' : 'light'
            }
          }
        }
      })
    }
  })
})

export default userRouters