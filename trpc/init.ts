import {initTRPC, TRPCError} from '@trpc/server'
import { Context } from './context'
import {PrismaClient} from '@prisma/client'

const t = initTRPC.context<Context>().create()
export const prisma = new PrismaClient()

const isAuth = t.middleware( async ({ next, ctx }) => { 
  if (!ctx?.auth?.userId) {
    await prisma.$disconnect()
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  const user = await prisma.user.findFirst({where: {userId: ctx.auth.userId}})
  return next({
    ctx: {
      auth: ctx.auth,
      prisma,
      user
    }
  })
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuth)
export const createCallerFactory = t.createCallerFactory