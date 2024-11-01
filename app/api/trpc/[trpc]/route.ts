import { createTRPCContext } from "@/trpc/context";
import { appRouter } from "@/trpc/routers";
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (req: Request) => fetchRequestHandler({
  endpoint: '/api/trpc',
  req,
  router: appRouter,
  createContext: createTRPCContext as any
})

export {handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE}