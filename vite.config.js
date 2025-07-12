import tailwindcss from '@tailwindcss/postcss'; // 确保引入
import { defineConfig } from 'vite'

export default defineConfig({
    base:'./',
    plugins:[tailwindcss("tailwind.config.js")]
})