"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface MetadataFormValues {
  tiktokTitle: string
  tiktokDescription: string
  tiktokHashtags: string
  youtubeTitle: string
  youtubeDescription: string
  youtubeHashtags: string
  instagramCaption: string
  instagramHashtags: string
}

const defaultValues: MetadataFormValues = {
  tiktokTitle: "",
  tiktokDescription: "",
  tiktokHashtags: "",
  youtubeTitle: "",
  youtubeDescription: "",
  youtubeHashtags: "",
  instagramCaption: "",
  instagramHashtags: "",
}

export function MetadataForm() {
  const [formValues, setFormValues] = useState<MetadataFormValues>(defaultValues)

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

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <h4 className="text-sm font-medium mb-4">TikTok Defaults</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tiktokTitle">Title</Label>
            <Input
              id="tiktokTitle"
              placeholder="TikTok title"
              name="tiktokTitle"
              value={formValues.tiktokTitle}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">
              Default title for your TikTok videos.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tiktokDescription">Description</Label>
            <Textarea
              id="tiktokDescription"
              placeholder="TikTok description"
              className="resize-none"
              name="tiktokDescription"
              value={formValues.tiktokDescription}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">
              Default description for your TikTok videos.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tiktokHashtags">Hashtags</Label>
            <Input
              id="tiktokHashtags"
              placeholder="TikTok hashtags"
              name="tiktokHashtags"
              value={formValues.tiktokHashtags}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">
              Default hashtags for your TikTok videos (comma-separated).
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-4">YouTube Defaults</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtubeTitle">Title</Label>
            <Input
              id="youtubeTitle"
              placeholder="YouTube title"
              name="youtubeTitle"
              value={formValues.youtubeTitle}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">
              Default title for your YouTube videos.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtubeDescription">Description</Label>
            <Textarea
              id="youtubeDescription"
              placeholder="YouTube description"
              className="resize-none"
              name="youtubeDescription"
              value={formValues.youtubeDescription}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">
              Default description for your YouTube videos.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtubeHashtags">Hashtags</Label>
            <Input
              id="youtubeHashtags"
              placeholder="YouTube hashtags"
              name="youtubeHashtags"
              value={formValues.youtubeHashtags}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">
              Default hashtags for your YouTube videos (comma-separated).
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-4">Instagram Defaults</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instagramCaption">Caption</Label>
            <Textarea
              id="instagramCaption"
              placeholder="Instagram caption"
              className="resize-none"
              name="instagramCaption"
              value={formValues.instagramCaption}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">
              Default caption for your Instagram posts.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagramHashtags">Hashtags</Label>
            <Input
              id="instagramHashtags"
              placeholder="Instagram hashtags"
              name="instagramHashtags"
              value={formValues.instagramHashtags}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">
              Default hashtags for your Instagram posts (comma-separated).
            </p>
          </div>
        </div>
      </div>

      <Button type="submit">Save metadata defaults</Button>
    </form>
  )
}
