"use client"

import { useRole } from "@/context/AppContext"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function RoleSwitcher() {
  const { role, setRole, isAdmin } = useRole()

  return (
    <div className="flex items-center space-x-2 bg-surface-card dark:bg-surface-dark-card border border-border p-3 rounded-xl shadow-sm">
      <Switch 
        id="role-switch" 
        checked={isAdmin}
        onCheckedChange={(checked) => setRole(checked ? "admin" : "viewer")}
      />
      <Label htmlFor="role-switch" className="text-sm font-medium cursor-pointer">
        {isAdmin ? "Admin View" : "Viewer View"}
      </Label>
    </div>
  )
}
