import { Card, CardContent } from "@/components/ui/card";

interface VideoPlayerProps {
  src: string;
}

export function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-0">
        <video src={src} controls className="w-full h-auto max-h-[50vh]" />
      </CardContent>
    </Card>
  );
}
