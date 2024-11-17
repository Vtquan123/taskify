import { UserContext } from "@/app/(protected)/layout"
import { User } from "@prisma/client"
import { useContext } from "react"

export const useUser = () => { 
  const data = useContext(UserContext)
  if (!data) {
    throw new Error("useUser should be used within the UserContext provider")
  }
  return data
}