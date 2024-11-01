import { createTRPCRouter, protectedProcedure, publicProcedure } from "../init";

export const appRouter = createTRPCRouter({
  healthCheck: protectedProcedure.query(({ctx}) => { 
    return {auth: ctx.auth}
  })
})

export type AppRouter = typeof appRouter