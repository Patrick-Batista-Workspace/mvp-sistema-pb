/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera um site 100% estatico em /out para o Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
