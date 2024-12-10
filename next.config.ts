import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignora errores de TypeScript en el build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora errores de ESLint en el build (si aplica)
  },
  /* Otros ajustes de configuración aquí */
}

export default nextConfig
