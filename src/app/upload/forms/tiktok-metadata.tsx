import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TikTokMetadataProps {
  metadata: {
    caption: string;
    hashtags: string;
  };
  updateMetadata: (field: string, value: string) => void;
}

export function TikTokMetadata({
  metadata,
  updateMetadata,
}: TikTokMetadataProps) {
  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="tiktok-caption">Caption</Label>
        <Input
          id="tiktok-caption"
          value={metadata.caption}
          onChange={(e) => updateMetadata("caption", e.target.value)}
          placeholder="Enter TikTok caption"
        />
      </div>
      <div>
        <Label htmlFor="tiktok-hashtags">Hashtags</Label>
        <Input
          id="tiktok-hashtags"
          value={metadata.hashtags}
          onChange={(e) => updateMetadata("hashtags", e.target.value)}
          placeholder="Enter hashtags, separated by spaces"
        />
      </div>
    </div>
  );
}
