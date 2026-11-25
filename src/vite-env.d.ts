/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** EduCap origins allowed to embed Eddy Studio (commas and/or spaces). */
  readonly VITE_EDUCAP_ORIGINS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Written at container start into /config.js (see docker/30-eddy-config.sh). */
interface Window {
  __EDDY_CONFIG__?: { educapOrigins?: string }
}
