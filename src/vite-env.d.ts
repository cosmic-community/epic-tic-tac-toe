/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COSMIC_BUCKET_SLUG: string
  readonly VITE_COSMIC_READ_KEY: string
  readonly VITE_COSMIC_WRITE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}