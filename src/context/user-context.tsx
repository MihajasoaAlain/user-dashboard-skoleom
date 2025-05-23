
import { createContext, useContext, useState, useCallback, type ReactNode, useMemo } from "react"
import type { User } from "../types/user"
import { fetchUsers as apiGetUsers } from "../services/api"

type SortDirection = "asc" | "desc"
type SortField = "name" | "email" | null

interface UserContextType {
  users: User[]
  filteredUsers: User[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  itemsPerPage: number
  searchQuery: string
  sortField: SortField
  sortDirection: SortDirection
  fetchUsers: () => Promise<void>
  setCurrentPage: (page: number) => void
  setSearchQuery: (query: string) => void
  setSorting: (field: "name" | "email", direction: SortDirection) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const itemsPerPage = 5

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await apiGetUsers()
      setAllUsers(data)
    } catch (err) {
      setError("Failed to fetch users. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const setSorting = useCallback((field: "name" | "email", direction: SortDirection) => {
    setSortField(field)
    setSortDirection(direction)
  }, [])

  // Filter and sort users based on search query and sort settings
  const filteredUsers = useMemo(() => {
    let result = [...allUsers]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        const valueA = a[sortField].toLowerCase()
        const valueB = b[sortField].toLowerCase()

        if (sortDirection === "asc") {
          return valueA.localeCompare(valueB)
        } else {
          return valueB.localeCompare(valueA)
        }
      })
    }

    return result
  }, [allUsers, searchQuery, sortField, sortDirection])

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage))

  // Ensure current page is valid after filtering
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages)
  }

  // Get current page of users
  const users = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredUsers, currentPage, itemsPerPage])

  const value = {
    users,
    filteredUsers,
    loading,
    error,
    currentPage,
    totalPages,
    itemsPerPage,
    searchQuery,
    sortField,
    sortDirection,
    fetchUsers,
    setCurrentPage,
    setSearchQuery,
    setSorting,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider")
  }
  return context
}
