import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "./tag-input";

interface YouTubeMetadataProps {
  metadata: {
    title: string;
    description: string;
    tags: string[];
    privacy_status: string;
  };
  updateMetadata: (field: string, value: string | string[]) => void;
}

export function YouTubeMetadata({
  metadata,
  updateMetadata,
}: YouTubeMetadataProps) {
  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="youtube-title">Title</Label>
        <Input
          id="youtube-title"
          value={metadata.title}
          onChange={(e) => updateMetadata("title", e.target.value)}
          placeholder="Enter YouTube title"
        />
      </div>
      <div>
        <Label htmlFor="youtube-description">Description</Label>
        <Textarea
          id="youtube-description"
          value={metadata.description}
          onChange={(e) => updateMetadata("description", e.target.value)}
          placeholder="Enter YouTube description"
        />
      </div>
      <div>
        <Label htmlFor="youtube-tags">Tags</Label>
        <TagInput
          tags={metadata.tags}
          updateTags={(tags) => updateMetadata("tags", tags)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="youtube-privacy-status"
          checked={metadata.privacy_status === "public"}
          onCheckedChange={(isChecked) =>
            updateMetadata("privacy_status", isChecked ? "public" : "private")
          }
        />
        <span>{metadata.privacy_status === "public" ? "Public" : "Private"}</span>
      </div>
    </div>
  );
}
