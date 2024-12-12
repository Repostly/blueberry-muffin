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

interface PlatformMetadataProps<T> {
  metadata: T;
  updateMetadata: (field: string, value: string) => void;
}

type YouTubeMetadataType = { title: string; description: string; tags: string };
type TikTokMetadataType = { caption: string; hashtags: string };
type InstagramMetadataType = { caption: string; hashtags: string };
type MetadataType =
  | YouTubeMetadataType
  | TikTokMetadataType
  | InstagramMetadataType;

export function MetadataSection({ videoUrl }: { videoUrl: string }) {
  const [enabledPlatforms, setEnabledPlatforms] = useState({
    youtube: false,
    tiktok: false,
    instagram: false,
  });
  const [metadata, setMetadata] = useState({
    youtube: { title: "", description: "", tags: "" },
    tiktok: { caption: "", hashtags: "" },
    instagram: { caption: "", hashtags: "" },
  });
  const [posting, setPosting] = useState(false);

  const togglePlatform = (platform: keyof typeof enabledPlatforms) => {
    setEnabledPlatforms((prev) => ({ ...prev, [platform]: !prev[platform] }));
  };

  const updateMetadata = (
    platform: keyof typeof metadata,
    field: string,
    value: string
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
    console.log("Button clicked.")
    setPosting(true)

    const body = {
      video_url: videoUrl,
      metadata: metadata
    }

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data)

      setPosting(false);
    } catch (error) {
      console.error('Error uploading video:', error);

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
                updateMetadata={(field: string, value: string) =>
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
