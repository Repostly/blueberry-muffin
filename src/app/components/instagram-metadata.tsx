import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InstagramMetadataProps {
  metadata: {
    caption: string;
    hashtags: string;
  };
  updateMetadata: (field: string, value: string) => void;
}

export function InstagramMetadata({
  metadata,
  updateMetadata,
}: InstagramMetadataProps) {
  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="instagram-caption">Caption</Label>
        <Textarea
          id="instagram-caption"
          value={metadata.caption}
          onChange={(e) => updateMetadata("caption", e.target.value)}
          placeholder="Enter Instagram caption"
        />
      </div>
      <div>
        <Label htmlFor="instagram-hashtags">Hashtags</Label>
        <Input
          id="instagram-hashtags"
          value={metadata.hashtags}
          onChange={(e) => updateMetadata("hashtags", e.target.value)}
          placeholder="Enter hashtags, separated by spaces"
        />
      </div>
    </div>
  );
}
