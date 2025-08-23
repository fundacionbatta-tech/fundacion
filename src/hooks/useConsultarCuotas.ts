import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export function useConsultarCuotas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [participante, setParticipante] = useState<any>(null);
  const [cuotas, setCuotas] = useState<any[]>([]);

  const consultar = async (cedula: string) => {
    setLoading(true);
    setError(null);
    setParticipante(null);
    setCuotas([]);
    // Buscar participante
    const { data: participanteData, error: participanteError } = await supabase
      .from('participantes')
      .select('*')
      .eq('cedula', cedula)
      .single();
    if (participanteError || !participanteData) {
      setError('NO_PARTICIPANTE');
      setLoading(false);
      return;
    }
    setParticipante(participanteData);
    // Buscar cuotas si hay más de una
    if (participanteData.cuotas_total > 1) {
      const { data: cuotasData, error: cuotasError } = await supabase
        .from('cuotas')
        .select('id,participante_id,numero_cuota,valor_pago,pagada,fecha_pago')
        .eq('participante_id', participanteData.id)
        .order('numero_cuota', { ascending: true });
      if (!cuotasError) {
        setCuotas(cuotasData || []);
      }
      // Si hay error en cuotas, no mostrar mensaje de no participante
    }
    setLoading(false);
  };

  const registrarPago = async (participanteId: number, numero: number, valor: number, fecha: string, comprobanteFile?: File) => {
    setLoading(true);
    setError(null);
    try {
      // Procesar comprobante
      let pdfBase64 = '';
      let pdfFileName = '';
      if (comprobanteFile) {
        const { PDFDocument } = await import('pdf-lib');
        const imageBytes = await comprobanteFile.arrayBuffer();
        const pdfDoc = await PDFDocument.create();
        let image;
        if (comprobanteFile.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else if (comprobanteFile.type === 'image/jpeg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else {
          // Si es PDF, simplemente adjuntar
          pdfBase64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              const base64 = result.split(',')[1];
              resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(comprobanteFile);
          });
        }
        if (image) {
          const page = pdfDoc.addPage([image.width, image.height]);
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
          });
          const pdfBytes = await pdfDoc.save();
          pdfBase64 = typeof window !== 'undefined' ? btoa(String.fromCharCode(...new Uint8Array(pdfBytes))) : '';
        }
        pdfFileName = `${participante.cedula}_comprobante.pdf`;
      }

      // Registrar pago en cuotas
      const { error: insertError } = await supabase
        .from('cuotas')
        .insert([{ participante_id: participanteId, numero_cuota: numero, valor_pago: valor, pagada: true, fecha_pago: fecha }]);
      if (insertError) {
        setError('Error registrando el pago.');
        setLoading(false);
        return false;
      }

      // Enviar WhatsApp con UltraMsg si hay comprobante
      if (pdfBase64 && participante) {
        const whatsappBody = `📌 Confirmación de Pago de Cuota\n\nHola ${participante.nombre} 👋\n\nHemos registrado tu pago correspondiente a la cuota #${numero} por un valor de $${valor} ✅.\n\n📅 Fecha de pago: ${fecha}\n💵 Valor abonado: $${valor}\n📊 Cuotas pagadas: ${numero} de ${participante.cuotas_total}\n\n🔔 Recuerda que al completar todas tus cuotas quedarás apto para participar.\n\n¡Gracias por tu puntualidad y confianza! 🙌`;
        const token = 'f3uxbqh66wxukqqi';
        const instance = 'instance140154';
        const url = `https://api.ultramsg.com/${instance}/messages/document`;
        const params = new URLSearchParams({
          token,
          to: participante.telefono,
          caption: whatsappBody,
          filename: pdfFileName,
          document: pdfBase64,
        });
        const resp = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });
        const respJson = await resp.json();
        if (respJson.error) throw new Error('Error enviando WhatsApp: ' + JSON.stringify(respJson.error));
      }

      // Actualizar cuotas
      await consultar(participante.cedula);
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err.message || 'Error inesperado');
      setLoading(false);
      return false;
    }
  };

  const marcarApto = async (participanteId: number) => {
    await supabase
      .from('participantes')
      .update({ es_apto: true })
      .eq('id', participanteId);
  };

  return { loading, error, participante, cuotas, consultar, registrarPago, marcarApto };
}
