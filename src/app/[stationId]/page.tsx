// src/app/[stationId]/page.tsx
import { getStations } from '@/lib/dataManager';
import RadioPlayer from '@/components/RadioPlayer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Esta función se ejecuta en el servidor para verificar que la estación exista
export async function generateStaticParams() {
  const stations = await getStations();
  return stations.map((station) => ({
    stationId: station.id,
  }));
}

// Generación dinámica de metadatos para SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { stationId: Promise<string> | string } 
}): Promise<Metadata> {
  const stationId = await Promise.resolve(params.stationId);
  
  const stations = await getStations();
  const station = stations.find(s => s.id === stationId);
  
  if (!station) {
    return {
      title: 'Estación no encontrada - Radio Exitosa',
    };
  }
  
  return {
    title: `Radio Exitosa ${station.name} ${station.frequency || ''}`,
    description: station.description || `Escucha Radio Exitosa ${station.name} en vivo - ${station.frequency || ''}`,
  };
}

export default async function StationPage({ 
  params 
}: { 
  params: { stationId: Promise<string> | string } 
}) {
  const stationId = await Promise.resolve(params.stationId);
  
  // Verificar que la estación existe
  const stations = await getStations();
  const stationExists = stations.some(station => station.id === stationId);
  
  // Si la estación no existe, devolver 404
  if (!stationExists) {
    notFound();
  }
  
  // No necesitamos pasar props, el contexto maneja la estación
  return <RadioPlayer />;
}