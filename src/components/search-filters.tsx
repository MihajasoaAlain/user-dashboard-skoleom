"use client"

import { useState, useEffect } from "react"
import { Input } from "../components/ui/input"
import { useUserContext } from "../context/user-context"
import { Search } from "lucide-react"

export function SearchFilters() {
  const { setSearchQuery } = useUserContext()
  const [localQuery, setLocalQuery] = useState("")

  // Debounce search input to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, setSearchQuery])

  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name or email..."
          className="pl-8"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
      </div>
    </div>
  )
}
