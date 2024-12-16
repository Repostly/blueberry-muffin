"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
  defaultActive?: string
}

export function SidebarNav({ className, items, defaultActive, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const currentPath = pathname === '/' ? defaultActive : pathname

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => (
        <Button
          key={item.href}
          variant={currentPath === item.href ? "secondary" : "ghost"}
          className={cn(
            "justify-start",
            currentPath === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline"
          )}
          asChild
        >
          <Link href={item.href}>
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}

