"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadVideo } from "@/app/api/upload/route";

export function VideoUploadForm() {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData(event.currentTarget);
    const result = await uploadVideo(formData);

    if (result.success) {
      router.push(`/upload/?videoUrl=${encodeURIComponent(result.videoUrl)}`);
    }

    setUploading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="video">Upload Video</Label>
        <Input id="video" name="video" type="file" accept="video/*" required />
      </div>
      <Button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}
