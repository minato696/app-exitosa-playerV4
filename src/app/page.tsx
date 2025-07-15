// src/app/page.tsx
import RadioPlayer from '@/components/RadioPlayer';

export default function Home() {
  // No necesitamos pasar ningún prop, ahora RadioPlayer obtiene el ID de la estación del contexto
  return <RadioPlayer />;
}