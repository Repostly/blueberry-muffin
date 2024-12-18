import { VideoUploadForm } from "./components/video-upload-form";
import { VideoPlayer } from "./components/video-player";
import { MetadataSection } from "./components/metadata-section";

type SearchParams = Promise<{
  videoUrl?: string
}>

export default async function UploadDashboard({ searchParams }: { searchParams: SearchParams }) {
  const { videoUrl } = await searchParams;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Video Upload Dashboard</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <VideoUploadForm />
              {videoUrl && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Uploaded Video</h2>
                  <VideoPlayer src={videoUrl} />
                </div>
              )}
            </div>
            <div>
              {videoUrl && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Metadata</h2>
                  <MetadataSection videoUrl={videoUrl} />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
