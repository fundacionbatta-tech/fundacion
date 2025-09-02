import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

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

export function useCuotasTable(rifaId?: string) {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBoletos();
  }, [rifaId]);

  async function fetchBoletos() {
    setLoading(true);
    setError(null);
    let query = supabase.from('boletos').select('*');
    if (rifaId) {
      query = query.eq('rifa_id', rifaId);
    }
    const { data, error } = await query;
    if (error) setError(error.message);
    setBoletos(data || []);
    setLoading(false);
  }

  return { boletos, loading, error };

  async function updateApto(id: string, es_apto: boolean) {
    setLoading(true);
    const { error } = await supabase.from('participantes').update({ es_apto }).eq('id', id);
    if (error) setError(error.message);
    // await fetchCuotas(); // Remove old reference
    setLoading(false);
  }

  return { boletos, loading, error };
}
