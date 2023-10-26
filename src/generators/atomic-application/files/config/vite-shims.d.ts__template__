/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Support for switching our package export condition
    // to use typescript imports directly. All github submodules
    // in this repo are set up to support this
    ATOMIC_DESIGN_USE_TYPESCRIPT_IMPORTS: string;
}

// This is for Intellisense on the import.meta object, so that we
// can use import.meta.env
interface ImportMeta {
  readonly env: ImportMetaEnv
}