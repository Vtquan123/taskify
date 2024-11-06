import { createTRPCRouter } from "@/trpc/init";
import { webhookUserRouter } from "./user";

export const webhooks = createTRPCRouter({
  user: webhookUserRouter
})