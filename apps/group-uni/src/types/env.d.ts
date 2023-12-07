// / <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_PORT: number;

  readonly VITE_ENV: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_PROJECT_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
