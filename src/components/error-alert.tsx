"use client"

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useUserContext } from "../context/user-context"
import { Button } from "../components/ui/button"

export function ErrorAlert() {
  const { error, fetchUsers } = useUserContext()

  if (!error) return null

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>{error}</p>
        <Button variant="outline" size="sm" className="w-fit mt-2" onClick={() => fetchUsers()}>
          Try Again
        </Button>
      </AlertDescription>
    </Alert>
  )
}
