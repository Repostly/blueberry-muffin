'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { toast } from "@/hooks/use-toast"

interface SocialMediaAccount {
  id: string
  name: string
  icon: keyof typeof Icons
  connected: boolean
}

const providerConfig = {
  tiktok: {
    authUrl: 'https://www.tiktok.com/auth/authorize/',
    client_key: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY,
    scope: 'user.info.basic,video.list',
  },
  youtube: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    client_id: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
    access_type: "offline",
    prompt: "consent",
  },
};


export default function ConnectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [accounts, setAccounts] = useState<SocialMediaAccount[]>([
    { id: 'tiktok', name: 'TikTok', icon: 'tiktok', connected: false },
    { id: 'youtube', name: 'YouTube', icon: 'youtube', connected: false },
    { id: 'instagram', name: 'Instagram', icon: 'instagram', connected: false },
    { id: 'twitter', name: 'Twitter (Coming Soon)', icon: 'twitter', connected: false },
    { id: 'facebook', name: 'Facebook (Coming Soon)', icon: 'facebook', connected: false },
  ])

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch('/api/user/connections')
        if (response.ok) {
          const connections = await response.json()
          setAccounts(prevAccounts => 
            prevAccounts.map(account => ({
              ...account,
              connected: !!connections[account.id]
            }))
          )
        }
      } catch (error) {
        console.error('Error fetching connections:', error)
      }
    }

    fetchConnections()
  }, [])

  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const provider = searchParams.get('provider');

    if (success && provider) {
      setAccounts(prevAccounts => 
        prevAccounts.map(account => 
          account.id === provider ? { ...account, connected: true } : account
        )
      );
      toast({
        title: "Connected",
        description: `Successfully connected to ${provider}`,
      });
    } else if (error && provider) {
      toast({
        title: "Error",
        description: `Failed to connect to ${provider}. Please try again.`,
        variant: "destructive",
      });
    }
  }, [searchParams]);

  const toggleConnection = async (id: string) => {
    const account = accounts.find(a => a.id === id);
    if (!account) return;
  
    if (account.connected) {
      try {
        const response = await fetch(`/api/disconnect/${id}`, { method: 'POST' });
        if (!response.ok) throw new Error('Failed to disconnect');
  
        setAccounts(prevAccounts => 
          prevAccounts.map(a => a.id === id ? { ...a, connected: false } : a)
        );
        toast({
          title: "Disconnected",
          description: `Successfully disconnected from ${account.name}`,
        });
      } catch (error) {
        console.error('Error disconnecting:', error);
        toast({
          title: "Error",
          description: "Failed to disconnect. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      const config = providerConfig[id as keyof typeof providerConfig];
      if (!config) return;
  
      const { authUrl, ...params } = config; // Destructure config to get authUrl and other parameters
  
      // Construct URL dynamically
      const authUrlObject = new URL(authUrl);
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          authUrlObject.searchParams.append(key, value as string);
        }
      });
  
      authUrlObject.searchParams.append('redirect_uri', `${window.location.origin}/api/auth/callback/${id}`);
      authUrlObject.searchParams.append('response_type', 'code');
  
      router.push(authUrlObject.toString());
    }
  };
  

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Connect Your Social Media Accounts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => {
          const IconComponent = Icons[account.icon];
          const isComingSoon = account.name.includes('Coming Soon');
          
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
                    disabled={isComingSoon}
                  />
                  <Button
                    variant="outline"
                    onClick={() => toggleConnection(account.id)}
                    disabled={isComingSoon}
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
