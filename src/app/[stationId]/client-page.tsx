'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import RadioPlayer from '@/components/RadioPlayer';

export default function StationClientPage() {
  const params = useParams();
  
  useEffect(() => {
    if (params?.stationId) {
      // Asegurarse de que stationId es una cadena
      const id = Array.isArray(params.stationId) 
        ? params.stationId[0] 
        : params.stationId;
      
      console.log('⚡ Client: Params stationId:', id);
    }
  }, [params]);
  
  console.log('🖥️ Client: Rendering RadioPlayer with context');
  
  // Ya no pasamos el initialStationId como prop
  // El componente RadioPlayer lo obtendrá del contexto
  return <RadioPlayer />;
}