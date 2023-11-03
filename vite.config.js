import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    server: {
        proxy: {
            '/user-admin': {
                target: 'https://lampblack.lewinsmarteye.com:61000/',
                changeOrigin: true
            }
        }
    }
})
