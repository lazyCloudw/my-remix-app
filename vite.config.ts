import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { flatRoutes } from 'remix-flat-routes';
import { remixRoutes } from 'remix-routes/vite';

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      ignoredRouteFiles: ['*/**'],
        routes: async (defineRoutes) => {
          return flatRoutes('routes', defineRoutes, {
            ignoredRouteFiles: [
              '.*',
              '**/*.css',
              '**/*.test.{js,jsx,ts,tsx}',
              '**/__*.*',
              '**/*.server.*',
              '**/*.client.*',
            ],
          });
        },
    }),
    remixRoutes(),
    tsconfigPaths(),
  ],
});
