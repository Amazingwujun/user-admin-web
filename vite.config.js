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
                target: 'http://192.168.32.63',
                changeOrigin: true
            }
        }
    }
})
