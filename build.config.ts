import { defineConfig } from 'robuild'

export default defineConfig({
  entries: [
    {
      type: 'bundle',
      input: './src/index.tsx',
      format: ['esm'],
    },
  ],
})