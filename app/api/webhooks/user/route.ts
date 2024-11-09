import { caller } from "@/trpc/routers"
import { verifyWebhook } from "@/utils/server/webhook"
import { UserWebhookEvent } from "@clerk/nextjs/server"

export async function handler(req: Request) {
  const eventData = await verifyWebhook(req) as UserWebhookEvent
  console.log(eventData)
  switch (eventData.type) {
    case "user.created":
      await caller.webhooks.user.createUser({
        data: eventData.data,
      })
      break;
    case "user.updated":
      await caller.webhooks.user.updateUser({
        data: eventData.data
      })
      break;
    case "user.deleted":
      await caller.webhooks.user.deleteUser({
        id: eventData.data.id || ''
      })
      break;
    default:
      break;
  }
  return new Response('', {status: 200})
}

export {handler as POST}