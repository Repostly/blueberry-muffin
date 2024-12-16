"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function VideoUploadForm() {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function uploadVideo(file: File, filename: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading video:', error);
      return { success: false };
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData(event.currentTarget);
    const fileInput = formData.get('video') as File;

    if (!fileInput || !(fileInput instanceof File)) {
      console.error('No file selected');
      setUploading(false);
      return;
    }

    const filename = fileInput.name;
    const result = await uploadVideo(fileInput, filename);

    if (result.success) {
      router.push(`/upload/?videoUrl=${encodeURIComponent(result.url)}`);
    } else {
      console.error('Upload failed');
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
