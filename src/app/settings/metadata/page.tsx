import { MetadataForm } from "../forms/metadata-form"

export default function SettingsMetadataPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Metadata Defaults</h3>
        <p className="text-sm text-muted-foreground">
          Set default metadata for TikTok, YouTube, and Instagram.
        </p>
      </div>
      <MetadataForm />
    </div>
  )
}
