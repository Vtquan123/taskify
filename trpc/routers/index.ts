import { createCallerFactory, createTRPCRouter, publicProcedure } from "../init";
import userRouters from "./user";
import { webhooks } from "./webhooks";

export const appRouter = createTRPCRouter({
  healthCheck: publicProcedure.query(({ ctx }) => { 
    return {auth: ctx.auth}
  }),
  webhooks: webhooks,

  user: userRouters
})

const createCaller = createCallerFactory(appRouter)

export const caller = createCaller({})

export type AppRouter = typeof appRouter