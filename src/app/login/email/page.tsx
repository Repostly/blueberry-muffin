'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function SignUpPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [isLoading, setIsLoading] = useState(false)



    const handleSignUp = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 2000) // Simulating API call
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-semibold text-center mb-6">Welcome Back!</h1>
                <div className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
    
                    </div>       
                    <Button 
                        onClick={handleSignUp} 
                        disabled={isLoading || !email || !password} 
                        className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </Button>
                </div>
            </div>
        </div>
    )
}