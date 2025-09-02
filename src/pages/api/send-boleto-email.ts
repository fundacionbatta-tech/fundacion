import type { NextApiRequest, NextApiResponse } from 'next';

import fetch from 'node-fetch';
import { PDFDocument, rgb } from 'pdf-lib';
import formidable from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  // Usar formidable para manejar el archivo
  const form = formidable();
  // formidable v3+ usa options en el constructor
  // Si keepExtensions da error, se puede omitir, ya que no es necesario para la lógica actual

  form.parse(req, async (err: any, fields: Record<string, any>, files: Record<string, any>) => {
    if (err) {
      return res.status(400).json({ error: 'Error al procesar el formulario.' });
    }
    const { nombre, documento, telefono, email, numero, precio, rifaNombre } = fields;
    // formidable v3+ puede devolver el archivo como array
    let comprobanteFile = files.comprobante;
    if (Array.isArray(comprobanteFile)) comprobanteFile = comprobanteFile[0];

    // Generar PDF con la imagen adjunta (soporta PNG y JPG/JPEG)
    let pdfBuffer: Buffer | null = null;
    if (comprobanteFile && comprobanteFile.filepath) {
      const imageBytes = await fs.readFile(comprobanteFile.filepath);
      const pdfDoc = await PDFDocument.create();
      let image;
      if (comprobanteFile.mimetype === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      } else if (comprobanteFile.mimetype === 'image/jpeg' || comprobanteFile.mimetype === 'image/jpg') {
        image = await pdfDoc.embedJpg(imageBytes);
      } else {
        image = null;
      }
      if (image) {
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
        pdfBuffer = Buffer.from(await pdfDoc.save());
      }
    }

    const to = process.env.BOLETO_NOTIFICATION_EMAIL;
    const subject = `🎟️ Nuevo boleto vendido: #${numero} - ${rifaNombre}`;
    const html = `<!DOCTYPE html>
<html lang=\"es\">
<head>
  <meta charset=\"UTF-8\">
  <style>
    body { font-family: Arial, Helvetica, sans-serif; background-color: #f5f6f8; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 1px 6px rgba(0,0,0,0.1); }
    h2 { color: #2c3e50; margin-bottom: 15px; font-size: 20px; }
    .info { background: #f0f8ff; padding: 10px; border-radius: 6px; margin-bottom: 15px; font-size: 15px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    td { padding: 8px 6px; border-bottom: 1px solid #eee; font-size: 14px; }
    td:first-child { font-weight: bold; color: #34495e; width: 35%; }
    .footer { margin-top: 20px; font-size: 12px; color: #6c757d; text-align: center; }
  </style>
</head>
<body>
  <div class=\"container\">
    <h2>📢 Nuevo boleto vendido</h2>
    <div class=\"info\">
      Se ha registrado la compra de un nuevo boleto en la rifa.
    </div>
    <table>
      <tr><td>Boleto</td><td>#${numero}</td></tr>
      <tr><td>Nombre</td><td>${nombre}</td></tr>
      <tr><td>Documento</td><td>${documento}</td></tr>
      <tr><td>Teléfono</td><td>${telefono}</td></tr>
      <tr><td>Email</td><td>${email}</td></tr>
      <tr><td>Precio</td><td>$${precio}</td></tr>
    </table>
    <div class=\"footer\">
      🗂️ Este correo es solo informativo.<br>
      Puedes gestionar este boleto desde el panel de administración.
    </div>
  </div>
</body>
</html>`;

    // Enviar correo con Brevo API
    try {
      const body: any = {
        sender: { name: 'Fundación Batta', email: process.env.BREVO_SMTP_USER },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      };
      if (pdfBuffer) {
        body.attachment = [
          {
            name: `comprobante_${numero}.pdf`,
            content: pdfBuffer.toString('base64'),
            type: 'application/pdf',
          },
        ];
      }
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY || '',
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: 'No se pudo enviar el correo.', details: String(err) });
    }
  });
}
