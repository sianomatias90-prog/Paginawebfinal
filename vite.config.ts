import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

function skipSpacedPublicFiles(): Plugin {
  return {
    name: 'skip-spaced-public-files',
    apply: 'build',
    writeBundle(options) {
      const outDir = options.dir || 'dist';
      const publicDir = path.resolve(process.cwd(), 'public');
      const copyDir = (src: string, dest: string) => {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
          if (entry.name.includes(' ')) continue;
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
          } else {
            try { fs.copyFileSync(srcPath, destPath); } catch { /* skip */ }
          }
        }
      };
      copyDir(publicDir, outDir);
    },
  };
}

export default defineConfig({
  plugins: [react(), skipSpacedPublicFiles()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    copyPublicDir: false,
  },
});
