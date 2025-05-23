"use client"

import { Button } from "../components/ui/button"
import { useUserContext } from "../context/user-context"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination() {
  const { currentPage, totalPages, setCurrentPage, loading } = useUserContext()

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1 || loading}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages || loading}>
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
