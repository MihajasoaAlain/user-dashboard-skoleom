"use client"

import { useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Skeleton } from "../components/ui/skeleton"
import { useUserContext } from "../context/user-context"
import type { User } from "../types/user"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../components/ui/button"

interface UserTableProps {
  onUserClick: (user: User) => void
}

export function UserTable({ onUserClick }: UserTableProps) {
  const { users, loading, error, fetchUsers, sortField, sortDirection, setSorting } = useUserContext()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleSort = (field: "name" | "email") => {
    if (sortField === field) {
      setSorting(field, sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSorting(field, "asc")
    }
  }

  if (loading) {
    return <TableSkeleton />
  }

  if (error) {
    return null
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">No users found. Try adjusting your search criteria.</div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="flex items-center gap-1 font-medium"
              >
                Name
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "name" && <span className="ml-1 text-xs">({sortDirection === "asc" ? "↑" : "↓"})</span>}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("email")}
                className="flex items-center gap-1 font-medium"
              >
                Email
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "email" && <span className="ml-1 text-xs">({sortDirection === "asc" ? "↑" : "↓"})</span>}
              </Button>
            </TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onUserClick(user)}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.company.name}</TableCell>
              <TableCell>{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[200px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[250px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[180px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
