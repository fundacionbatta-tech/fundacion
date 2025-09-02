import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface Boleto {
  id: string;
  rifa_id: string;
  numero: number;
  precio: number;
  comprador_cedula: string;
  comprador_correo: string;
  comprador_telefono: string;
  pagado: boolean;
  created_at: string;
}

export function useBoletos(rifaId: string | null) {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!rifaId) return;
    setLoading(true);
    setError(null);
    const supabase = createClient();
    supabase
      .from('boletos')
      .select('*')
      .eq('rifa_id', rifaId)
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setBoletos(data || []);
        setLoading(false);
      });
  }, [rifaId]);

  return { boletos, loading, error };
}
