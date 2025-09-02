import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export type Rifa = {
  id: string;
  nombre: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  total_boletos: number;
  precio_boleto: number;
  permitir_cuotas: boolean;
};

export function useRifasActivas() {
  const [rifas, setRifas] = useState<Rifa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchRifas() {
      setLoading(true);
      setError(null);
      const today = new Date().toISOString().slice(0, 10);
      const { data, error } = await supabase
        .from('rifas')
        .select('*')
        .gte('fecha_fin', today)
        .order('fecha_inicio', { ascending: false });
      if (error) {
        setError(error.message);
        setRifas([]);
      } else {
        setRifas(data || []);
      }
      setLoading(false);
    }
    fetchRifas();
  }, []);

  return { rifas, loading, error };
}
