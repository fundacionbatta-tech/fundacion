import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Cuota {
  id: string;
  nombre: string;
  cedula: string;
  telefono: string;
  email: string;
  cuotas_total: number;
  cuota_valor: number;
  fecha_registro: string;
  es_apto: boolean;
}

export function useCuotasTable() {
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetchCuotas();
  }, []);

  async function fetchCuotas() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('participantes')
      .select('*');
    if (error) setError(error.message);
    setCuotas(data || []);
    setLoading(false);
  }

  async function updateApto(id: string, es_apto: boolean) {
    setLoading(true);
    const { error } = await supabase
      .from('participantes')
      .update({ es_apto })
      .eq('id', id);
    if (error) setError(error.message);
    await fetchCuotas();
    setLoading(false);
  }

  return { cuotas, loading, error, updateApto };
}
