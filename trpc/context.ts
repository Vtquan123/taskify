import { getAuth } from "@clerk/nextjs/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const createTRPCContext = async ({ req }: CreateNextContextOptions) => { 
  return { auth: getAuth(req) }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>