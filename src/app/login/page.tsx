'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

export default function LoginPage() {
  
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const result = await signIn('google', { callbackUrl: '/' })
      if (result?.error) {
        // Handle error
        console.error('Login failed:', result.error)
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailLogin = async () => {
    setIsLoading(true)
    try {
      const result = await signIn('email', { callbackUrl: '/' })
      if (result?.error) {
        // Handle error
        console.error('Login failed:', result.error)
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose how you login to Repostly</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="w-full mb-4" 
            onClick={handleEmailLogin} 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>
                <Icons.mail className="mr-2 h-4 w-4" />
                Sign in with Email
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleLogin} 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>
                <Icons.google className="mr-2 h-4 w-4" />
                Sign in with Google
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

