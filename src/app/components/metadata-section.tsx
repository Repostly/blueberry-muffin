"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { YouTubeMetadata } from "./youtube-metadata";
import { TikTokMetadata } from "./tiktok-metadata";
import { InstagramMetadata } from "./instagram-metadata";
import { useToast } from "@/hooks/use-toast";

interface PlatformMetadataProps<T> {
  metadata: T;
  updateMetadata: (field: string, value: string | string[]) => void;
}

type YouTubeMetadataType = { title: string; description: string; tags: string | string[], privacy_status: string };
type TikTokMetadataType = { caption: string; hashtags: string };
type InstagramMetadataType = { caption: string; hashtags: string };
type MetadataType =
  | YouTubeMetadataType
  | TikTokMetadataType
  | InstagramMetadataType;

type UploadResult =
| {
    platform: string;
    success: true;
    result: {
      body: {
        video_id: string;
        watch_url: string;
      };
    };
  }
| {
    platform: string;
    success: false;
    message: string;
  };

export function MetadataSection({ videoUrl }: { videoUrl: string }) {
  const [enabledPlatforms, setEnabledPlatforms] = useState({
    youtube: false,
    tiktok: false,
    instagram: false,
  });
  const [metadata, setMetadata] = useState({
    youtube: { title: "", description: "", tags: [], privacy_status: "" },
    tiktok: { caption: "", hashtags: "" },
    instagram: { caption: "", hashtags: "" },
  });
  const [posting, setPosting] = useState(false);
  const { toast } = useToast();

  const togglePlatform = (platform: keyof typeof enabledPlatforms) => {
    setEnabledPlatforms((prev) => ({ ...prev, [platform]: !prev[platform] }));
  };

  const updateMetadata = (
    platform: keyof typeof metadata,
    field: string,
    value: string | string[]
  ) => {
    console.log(`Updating ${platform} - ${field}:`, value); // Debug incoming values

    setMetadata((prev) => {
      const newState = {
        ...prev,
        [platform]: { ...prev[platform], [field]: value },
      };
      console.log("New metadata state:", newState); // Debug new state
      return newState;
    });
  };

  const handleSubmit = async () => {
    setPosting(true);

    const body = {
      video_url: videoUrl,
      metadata: Object.fromEntries(
        Object.entries(metadata).filter(([key]) => enabledPlatforms[key as keyof typeof enabledPlatforms])
      ),
    };

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      if (data.success) {
        toast({
          title: "Upload Successful",
          description: "Your video has been successfully uploaded.",
        });

        // Display individual platform results
        data.results.forEach((result: UploadResult) => {
          if (result.success) {
            toast({
              title: `${result.platform} Upload Successful`,
              description: `Video ID: ${result.result.body.video_id}`,
              action: (
                <Button variant="outline" size="sm" asChild>
                  <a href={result.result.body.watch_url} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </Button>
              ),
            });
          } else {
            toast({
              variant: "destructive",
              title: `${result.platform} Upload Failed`,
              description: result.message,
            });
          }
        });
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setPosting(false);
    }
  };

  const platforms: Array<{
    key: keyof typeof enabledPlatforms;
    label: string;
    component: React.ComponentType<PlatformMetadataProps<MetadataType>>;
  }> = [
    {
      key: "youtube" as const,
      label: "YouTube Metadata",
      component: YouTubeMetadata as React.ComponentType<
        PlatformMetadataProps<MetadataType>
      >,
    },
    {
      key: "tiktok" as const,
      label: "TikTok Metadata",
      component: TikTokMetadata as React.ComponentType<
        PlatformMetadataProps<MetadataType>
      >,
    },
    {
      key: "instagram" as const,
      label: "Instagram Metadata",
      component: InstagramMetadata as React.ComponentType<
        PlatformMetadataProps<MetadataType>
      >,
    },
  ];

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={Object.keys(enabledPlatforms).filter(
          (key) => enabledPlatforms[key as keyof typeof enabledPlatforms]
        )}
        className="w-full"
      >
        {platforms.map(({ key, label, component: Component }) => (
          <AccordionItem value={key} key={key}>
            <div className="flex items-center border-b py-4">
              <Checkbox
                id={`${key}-checkbox`}
                checked={enabledPlatforms[key as keyof typeof enabledPlatforms]}
                onCheckedChange={() =>
                  togglePlatform(key as keyof typeof enabledPlatforms)
                }
                className="ml-4"
              />
              <Label
                htmlFor={`${key}-checkbox`}
                className="flex-1 px-4 cursor-pointer"
              >
                {label}
              </Label>
            </div>
            <AccordionContent>
              <Component
                metadata={metadata[key as keyof typeof metadata]}
                updateMetadata={(field: string, value: string | string[]) =>
                  updateMetadata(key as keyof typeof metadata, field, value)
                }
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        onClick={handleSubmit}
        disabled={posting || Object.values(enabledPlatforms).every((v) => !v)}
      >
        {posting ? "Submitting..." : "Submit Metadata"}
      </Button>
    </div>
  );
}
