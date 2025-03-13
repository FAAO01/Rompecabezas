import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Juego de Rompecabezas",
        short_name: "Rompecabezas",
        description: "Un juego de rompecabezas interactivo",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        icons: [
          {
            src: "/aca.jpg",  // Ruta correcta desde public/
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/aca2.jpg", // Asegúrate de que la imagen existe en public/
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
