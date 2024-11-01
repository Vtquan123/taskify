import 'server-only'

import { cache } from "react";
import { makeQueryClient } from "./query-client";
import { createCallerFactory } from "./init";
import { appRouter } from "./routers";
import { createTRPCContext } from "./context";
import { createHydrationHelpers } from '@trpc/react-query/rsc'

const getQueryClient = cache(makeQueryClient)
const caller = createCallerFactory(appRouter)(createTRPCContext as any)

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient
)