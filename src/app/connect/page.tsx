'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

interface SocialMediaAccount {
  id: string
  name: string
  icon: keyof typeof Icons
  connected: boolean
}

export default function ConnectPage() {


  const [accounts, setAccounts] = useState<SocialMediaAccount[]>([
    { id: 'tiktok', name: 'TikTok', icon: 'tiktok', connected: false },
    { id: 'instagram', name: 'Instagram', icon: 'instagram', connected: false },
    { id: 'youtube', name: 'YouTube', icon: 'youtube', connected: false },
    { id: 'twitter', name: 'Twitter (Coming Soon)', icon: 'twitter', connected: false },
    { id: 'facebook', name: 'Facebook (Coming Soon)', icon: 'facebook', connected: false },
  ])

  const toggleConnection = (id: string) => {
    setAccounts(accounts.map(account =>
      account.id === id ? { ...account, connected: !account.connected } : account
    ))
  }

  const connectAccount = (id: string) => {
    // Here you would typically initiate the OAuth flow for the selected platform
    console.log(`Connecting to ${id}`)
    // For demonstration, we'll just toggle the connection state
    toggleConnection(id)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Connect Your Social Media Accounts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => {
          const IconComponent = Icons[account.icon];
          
          return (
          <Card key={account.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {IconComponent && <IconComponent className="h-6 w-6" />}
                {account.name}
              </CardTitle>
              <CardDescription>
                {account.connected ? 'Connected' : 'Not connected'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Switch
                  checked={account.connected}
                  onCheckedChange={() => toggleConnection(account.id)}
                  disabled={account.name.includes('Coming Soon')}
                />
                <Button
                  variant="outline"
                  onClick={() => connectAccount(account.id)}
                  disabled={account.connected || account.name.includes('Coming Soon')}
                >
                  {account.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </CardContent>
          </Card>
          )
        })}
      </div>
    </div>
  )
}

