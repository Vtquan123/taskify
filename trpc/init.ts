import {initTRPC, TRPCError} from '@trpc/server'
import { Context } from './context'

const t = initTRPC.context<Context>().create()

const isAuth = t.middleware(({ next, ctx }) => { 
  if (!ctx?.auth?.userId) {
    throw new TRPCError({code: 'UNAUTHORIZED'})
  }

  return next({
    ctx: {
      auth: ctx.auth
    }
  })
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuth)
export const createCallerFactory = t.createCallerFactory