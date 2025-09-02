import { useState } from 'react';

export function useReporteIngresosRifa() {
  const [rifaId, setRifaId] = useState('');
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(false);

  const consultarReporte = async () => {
    setLoading(true);
    // TODO: Llamar API para consultar reporte de ingresos
    setLoading(false);
  };

  return { rifaId, setRifaId, reporte, consultarReporte, loading };
}
