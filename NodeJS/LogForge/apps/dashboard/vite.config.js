import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('/recharts/')) return 'recharts';
          const d3Package = id.match(/node_modules\/(d3-[^/]+)/)?.[1];
          if (d3Package) return d3Package;
          if (id.includes('@tanstack')) return 'query';
          return undefined;
        }
      }
    }
  }
});
