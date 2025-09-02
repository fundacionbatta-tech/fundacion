import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface RifaData {
  rifa_id: string;
  nombre: string;
  cedula: string;
  telefono: string;
  email?: string;
  cuotas: number;
  precio: number;
  comprobante: File;
  boleto_numero?: number;
  rifa_nombre?: string;
}

export function useRifaSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Inserta registro y envía WhatsApp
  const submitRifa = async (data: RifaData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Validar número y archivo
      const telefono = data.telefono.trim();
      const isValidPhone = /^3\d{9}$/.test(telefono);
      if (!isValidPhone) throw new Error('El número de teléfono debe ser colombiano y tener 10 dígitos.');
      if (!data.comprobante) throw new Error('Debes adjuntar el comprobante de pago.');
      if (!data.comprobante.type.startsWith('image/')) throw new Error('El comprobante debe ser una imagen.');

      // Insertar solo el boleto seleccionado
      if (!data.boleto_numero) throw new Error('Debes seleccionar un número de boleto.');
      const boleto = {
        rifa_id: data.rifa_id,
        numero: data.boleto_numero,
        precio: data.precio,
        comprador_cedula: data.cedula,
        comprador_correo: data.email || '',
        comprador_telefono: data.telefono,
        pagado: false,
        created_at: new Date().toISOString(),
      };
      // Insertar boleto
      const { data: boletoInsert, error: insertError } = await supabase.from('boletos').insert([boleto]).select();
      if (insertError) throw insertError;
      const boletoId = boletoInsert && boletoInsert[0] ? boletoInsert[0].id : null;
      if (!boletoId) throw new Error('No se pudo registrar el boleto.');
      // Registrar pago inicial
      const pago = {
        boleto_id: boletoId,
        monto: data.precio,
        fecha_pago: new Date().toISOString(),
        metodo: 'transferencia',
        referencia: data.comprobante.name || '',
      };
      const { error: pagoError } = await supabase.from('pagos').insert([pago]);
      if (pagoError) throw pagoError;
      // Enviar correo de notificación con FormData para adjuntar el comprobante
      try {
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('documento', data.cedula);
        formData.append('telefono', data.telefono);
        formData.append('email', data.email || '');
        formData.append('numero', String(data.boleto_numero));
        formData.append('precio', String(data.precio));
        formData.append('rifaNombre', data.rifa_nombre || '');
        formData.append('comprobante', data.comprobante);
        await fetch('/api/send-boleto-email', {
          method: 'POST',
          body: formData,
        });
      } catch (emailErr) {
        // No interrumpe el flujo si el correo falla
        console.error('Error enviando correo:', emailErr);
      }
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, success, submitRifa };
}
