// uno.config.ts
import { defineConfig } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetIcons({ /* options */ }),
    // ...other presets
  ],
})
