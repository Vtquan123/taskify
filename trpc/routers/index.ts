import { createCallerFactory, createTRPCRouter, protectedProcedure, publicProcedure } from "../init";
import { webhooks } from "./webhooks";

export const appRouter = createTRPCRouter({
  healthCheck: publicProcedure.query(({ ctx }) => { 
    return {auth: ctx.auth}
  }),
  webhooks: webhooks
})

const createCaller = createCallerFactory(appRouter)

export const caller = createCaller({})

export type AppRouter = typeof appRouter