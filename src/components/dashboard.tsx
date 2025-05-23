"use client"

import { useState } from "react"
import { UserProvider } from "../context/user-context"
import { UserTable } from "../components/user-table"
import { SearchFilters } from "../components/search-filters"
import { Pagination } from "../components/pagination"
import { UserDetailModal } from "../components/user-detail-modal"
import { ErrorAlert } from "../components/error-alert"
import type { User } from "../types/user"

export function Dashboard() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  return (
    <UserProvider>
      <div className="container mx-auto py-8 px-4 w-full flex justify-center flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>

        <ErrorAlert />

        <div className="bg-card rounded-lg shadow-sm border p-6">
          <SearchFilters />

          <UserTable onUserClick={handleUserClick} />

          <div className="mt-6">
            <Pagination />
          </div>
        </div>

        <UserDetailModal user={selectedUser} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </UserProvider>
  )
}
