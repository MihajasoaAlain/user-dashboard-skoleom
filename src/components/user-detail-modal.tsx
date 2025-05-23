"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog"
import type { User } from "../types/user"
import { Building2, Mail, MapPin, Phone, Globe } from "lucide-react"

interface UserDetailModalProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
}

export function UserDetailModal({ user, isOpen, onClose }: UserDetailModalProps) {
  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{user.name}</DialogTitle>
          <DialogDescription className="text-sm">@{user.username}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Email</div>
              <a href={`mailto:${user.email}`} className="text-sm text-blue-600 hover:underline">
                {user.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Phone</div>
              <div className="text-sm">{user.phone}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Website</div>
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                {user.website}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Company</div>
              <div className="text-sm">{user.company.name}</div>
              <div className="text-xs text-muted-foreground italic">"{user.company.catchPhrase}"</div>
              <div className="text-xs text-muted-foreground mt-1">{user.company.bs}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Address</div>
              <div className="text-sm">
                {user.address.street}, {user.address.suite}
                <br />
                {user.address.city}, {user.address.zipcode}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Geo: {user.address.geo.lat}, {user.address.geo.lng}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
