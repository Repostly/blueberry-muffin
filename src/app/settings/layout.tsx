import { Metadata } from "next"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent } from "@/components/ui/card"
import { SidebarProvider } from "@/components/ui/sidebar"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and set metadata defaults.",
}

const sidebarNavItems = [
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Metadata Defaults",
    href: "/settings/metadata",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <SidebarProvider>
      <div className="container mx-auto py-10">
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <aside className="w-full md:w-1/3 p-6 border-r">
                <h2 className="text-2xl font-bold tracking-tight mb-4">Settings</h2>
                <SidebarNav items={sidebarNavItems} />
              </aside>
              <main className="flex-1 p-6">
                {children}
              </main>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarProvider>
  )
}

