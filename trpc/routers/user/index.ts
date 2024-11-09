import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";

const userRouters = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user) {
      return ctx.user
    }
    return {
      message: "No user was found"
    }
  }),
  read: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findFirst({ where: { userId: input.id } })
    if (user) {
      return user
    }
    return {
      message: "No user was found"
    }
  })
})

export default userRouters