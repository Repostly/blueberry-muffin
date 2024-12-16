"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface AccountFormValues {
  name: string
  email: string
}

const defaultValues: AccountFormValues = {
  name: "Your Name",
  email: "your-email@example.com",
}

export function AccountForm() {
  const [formValues, setFormValues] = useState<AccountFormValues>(defaultValues)

  const { toast } = useToast()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(formValues, null, 2)}</code>
        </pre>
      ),
    })
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
        />
        <p className="text-sm text-muted-foreground">
          This is the name that will be displayed on your profile and in emails.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="Your email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
        <p className="text-sm text-muted-foreground">
          This is the email that will be used for account-related notifications.
        </p>
      </div>
      <Button type="submit">Update account</Button>
    </form>
  )
}
