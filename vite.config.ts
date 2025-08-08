import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
    // Настройки сервера для доступа с других устройств
    server: {
      host: '0.0.0.0', // Доступ по локальной сети
      port: 5173,      // Порт (можно изменить)
      open: true,      // Автоматически открывать браузер
    },
    };
});
