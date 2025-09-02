import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export function useConsultarCuotas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [boletos, setBoletos] = useState<any[]>([]);

  const consultar = async (cedula: string) => {
    setLoading(true);
    setError(null);
    setBoletos([]);
    // Buscar boletos por cedula
    const { data: boletosData, error: boletosError } = await supabase
      .from('boletos')
      .select('*')
      .eq('comprador_cedula', cedula)
      .order('numero', { ascending: true });
    if (boletosError || !boletosData || boletosData.length === 0) {
      setError('NO_BOLETOS');
      setLoading(false);
      return;
    }
    setBoletos(boletosData);
    setLoading(false);
  };

  // Consultar historial de pagos de un boleto
  const consultarPagos = async (boletoId: string) => {
    const { data, error } = await supabase
      .from('pagos')
      .select('monto, metodo, referencia, fecha_pago')
      .eq('boleto_id', boletoId)
      .order('fecha_pago', { ascending: true });
    if (error) return [];
    return data || [];
  };

  // Registrar pago: inserta en pagos y actualiza pagado en boletos
  const registrarPago = async (boletoId: string, pago: { monto: number; metodo: string; referencia: string }) => {
    setLoading(true);
    setError(null);
    // Insertar pago
    const { error: insertError } = await supabase
      .from('pagos')
      .insert({ boleto_id: boletoId, monto: pago.monto, metodo: pago.metodo, referencia: pago.referencia });
    if (insertError) {
      setError('Error registrando el pago.');
      setLoading(false);
      return false;
    }
    // Consultar total pagado
    const { data: pagosData } = await supabase.from('pagos').select('monto').eq('boleto_id', boletoId);
    const totalPagado = pagosData ? pagosData.reduce((sum: number, p: any) => sum + (p.monto || 0), 0) : 0;
    // Consultar precio del boleto
    const { data: boletoData } = await supabase.from('boletos').select('precio').eq('id', boletoId).single();
    const precio = boletoData?.precio || 0;
    // Actualizar pagado si corresponde
    const pagado = totalPagado >= precio;
    await supabase.from('boletos').update({ pagado }).eq('id', boletoId);
    // Actualizar boletos
    const boleto = boletos.find((b) => b.id === boletoId);
    if (boleto) await consultar(boleto.comprador_cedula);
    setLoading(false);
    return true;
  };

  return { loading, error, boletos, consultar, registrarPago, consultarPagos };
}
