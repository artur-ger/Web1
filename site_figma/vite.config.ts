import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(rootDir, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // React + Tailwind plugins for project styles and JSX transform
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Shortcut import path to src
      '@': path.resolve(rootDir, './src'),
    },
  },

  // File types available for raw import
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
