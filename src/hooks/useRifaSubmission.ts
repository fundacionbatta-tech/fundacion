import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PDFDocument } from 'pdf-lib';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface RifaData {
  nombre: string;
  cedula: string;
  telefono: string;
  email?: string;
  cuotas_total: number;
  cuota_valor: number;
  es_apto: boolean;
  comprobante: File;
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

      // Insertar registro en la tabla
      const { error: insertError } = await supabase
        .from('participantes')
        .insert([
          {
            nombre: data.nombre,
            cedula: data.cedula,
            telefono: data.telefono,
            email: data.email || '',
            cuotas_total: data.cuotas_total,
            cuota_valor: data.cuota_valor,
            fecha_registro: new Date().toISOString(),
            es_apto: data.es_apto,
          },
        ]);
      if (insertError) throw insertError;

      // Crear PDF con la imagen
      const imageBytes = await data.comprobante.arrayBuffer();
      const pdfDoc = await PDFDocument.create();
      let image;
      if (data.comprobante.type === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        image = await pdfDoc.embedJpg(imageBytes);
      }
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
      const pdfBytes = await pdfDoc.save();
      // Convertir PDF a base64
      const pdfBase64 = typeof window !== 'undefined' ? btoa(String.fromCharCode(...new Uint8Array(pdfBytes))) : '';
      const pdfFileName = `${data.cedula}_comprobante.pdf`;

      // Enviar WhatsApp con UltraMsg (adjuntando el PDF)
      const whatsappBody = `🎉 ¡Hola ${data.nombre}!\n\nHemos recibido tu comprobante de pago para la cuota #${data.cuotas_total} de la Rifa Solidaria ✅.\n\n💵 Valor de la cuota: $${data.cuota_valor} COP\n\nGracias por tu apoyo 🙌. Una vez validemos tu pago, tu cuota quedará confirmada y podrás continuar con las siguientes cuotas.\n\n✨ ¡Mucha suerte en la rifa! 🎟️`;
      const token = 'f3uxbqh66wxukqqi';
      const instance = 'instance140154';
      const url = `https://api.ultramsg.com/${instance}/messages/document`;
      const params = new URLSearchParams({
        token,
        to: telefono,
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
