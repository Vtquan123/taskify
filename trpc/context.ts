import { getAuth } from "@clerk/nextjs/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const createTRPCContext = async ({ req }: CreateNextContextOptions) => {
  const auth = getAuth(req)
  return {
    auth,
  }
}
type Optional<T> = {
  [P in keyof T]?: T[P]
} 
export type Context = Optional<Awaited<ReturnType<typeof createTRPCContext>>>