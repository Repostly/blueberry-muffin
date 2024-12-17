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

    useEffect(() => {
        setPasswordStrength(calculatePasswordStrength(password))
    }, [password])

    const calculatePasswordStrength = (password: string): number => {
        let strength = 0
        if (password.length >= 8) strength += 25
        if (password.match(/[0-9]+/)) strength += 25
        if (password.match(/[a-z]+/)) strength += 25
        if (password.match(/[A-Z]+/)) strength += 25
        if (password.match(/[^a-zA-Z0-9]+/)) strength += 25
        return Math.min(100, strength)
    }
    const getPasswordStrengthColor = (strength: number): string => {
        if (strength === 0) return 'bg-gray-200'
        if (strength < 50) return 'bg-red-500'
        if (strength < 80) return 'bg-yellow-500'
        return 'bg-emerald-100'
    }

    const handleSignUp = () => {
        setIsLoading(true)
        const base64query = Buffer.from(JSON.stringify({ email: email.toLowerCase(), password: password })).toString('base64');
        fetch('http://localhost:3000/api/user/create', {
            method: 'POST',
            body: base64query,
        }).then(response => response.json())

        .then(data => {
            alert(`${data.message}`)
        })
        setTimeout(() => setIsLoading(false), 2000)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>
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
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {password && (
                        <Progress 
                            value={passwordStrength} 
                            className={`h-1 mt-2 ${getPasswordStrengthColor(passwordStrength)}`}
                        />
                    )}

                    <Button 
                        onClick={handleSignUp} 
                        disabled={isLoading || password !== confirmPassword || passwordStrength < 100} 
                        className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                        {isLoading ? 'Loading...' : 'Sign Up'}
                    </Button>
                </div>
                {password !== confirmPassword && confirmPassword && (
                    <p className="mt-2 text-sm text-red-500">Passwords do not match</p>
                )}
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Password should be at least 8 characters long, include a number, and a special character.
                </p>
            </div>
        </div>
    )
}