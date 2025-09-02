import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export type Premio = {
  id: string;
  rifa_id: string;
  tipo: 'mayor' | 'secundario' | 'semanal';
  nombre: string;
  descripcion: string;
  imagen_url: string | null;
  cantidad: number;
};

export function usePremiosRifa(rifaId: string) {
  const [premios, setPremios] = useState<Premio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!rifaId) return;
    async function fetchPremios() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from('premios').select('*').eq('rifa_id', rifaId);
      if (error) {
        setError(error.message);
        setPremios([]);
      } else {
        setPremios(data || []);
      }
      setLoading(false);
    }
    fetchPremios();
  }, [rifaId]);

  return { premios, loading, error };
}
