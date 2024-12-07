import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface YouTubeMetadataProps {
  metadata: {
    title: string;
    description: string;
    tags: string;
  };
  updateMetadata: (field: string, value: string) => void;
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
        <Input
          id="youtube-tags"
          value={metadata.tags}
          onChange={(e) => updateMetadata("tags", e.target.value)}
          placeholder="Enter tags, separated by commas"
        />
      </div>
    </div>
  );
}
