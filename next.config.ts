import type { NextConfig } from "next";

// Extraer los dominios directamente de las variables de entorno
const getImageDomains = () => {
  const domainString = process.env.NEXT_PUBLIC_DOMAIN || 'localhost:9544';
  return domainString.split(',').map(domain => {
    // Extraer solo el nombre de dominio sin el puerto
    return domain.trim().split(':')[0];
  });
};

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  images: {
    domains: getImageDomains(),
  },
  // Permitir orígenes de desarrollo para corregir el warning
  allowedDevOrigins: ['http://localhost:9544', 'http://185.236.232.32:9544'],
  // Configura el dominio público para que sea accesible correctamente
  publicRuntimeConfig: {
    basePath: '',
  },
};

export default nextConfig;