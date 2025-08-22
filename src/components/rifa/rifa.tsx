"use client";
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';
import React, { useState, useRef } from 'react';
import { useRifaSubmission } from '@/hooks/useRifaSubmission';
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from '@/components/ui/toast';
import { FiUpload } from 'react-icons/fi';
import '@/styles/rifa.css';

const CUOTA_TOTAL = 175000;
const CUOTA_OPTIONS = [1, 2, 3, 4];

function calcularCuota(numCuotas: number) {
  if (!numCuotas) return 0;
  return Math.round(CUOTA_TOTAL / numCuotas);
}

export default function Rifa() {
  const [numCuotas, setNumCuotas] = useState(1);
  const [form, setForm] = useState({
    nombre: '',
    documento: '',
    telefono: '',
    email: '',
    cuotas: 1,
  });
  const [comprobanteName, setComprobanteName] = useState('');
  const [comprobanteFile, setComprobanteFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showNequi, setShowNequi] = useState(false);
  const [showBancolombia, setShowBancolombia] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'cuotas') setNumCuotas(Number(value));
  };

  // Hook para enviar la info
  const { loading, error, success, submitRifa } = useRifaSubmission();
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="rifa-container">
      <Header />
      <main className="homepage-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="rifa-form-wrapper">
          <h2 className="rifa-title">Participa en la Rifa Solidaria 🎉</h2>
          <p className="rifa-subtitle">
            Con tu aporte estarás apoyando nuestra causa.<br />
            El valor de la boleta es de <b>$175.000 COP</b>, puedes pagarlo en una sola cuota o dividirlo en varias cuotas.
          </p>
          <form className="rifa-form">
            <div className="rifa-bank-icons">
              <span className="rifa-label">Cuentas para pago:</span>
              <div style={{ display: 'flex', gap: '1.5rem', margin: '0.7rem 0' }}>
                <div style={{ textAlign: 'center' }}>
                  <img
                    src="/assets/logo/nequi.png"
                    alt="Nequi"
                    className="rifa-bank-logo"
                    onClick={() => setShowNequi(v => !v)}
                    style={{ cursor: 'pointer' }}
                  />
                  {showNequi && (
                    <div className="rifa-bank-info">
                      <b>Nequi:</b> 3133063990
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img
                    src="/assets/logo/bancolombia.png"
                    alt="Bancolombia"
                    className="rifa-bank-logo"
                    onClick={() => setShowBancolombia(v => !v)}
                    style={{ cursor: 'pointer' }}
                  />
                  {showBancolombia && (
                    <div className="rifa-bank-info">
                      <b>Bancolombia</b><br />Cuenta ahorros<br />26200030124<br />NIT 900425311
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="nombre" className="rifa-label">Nombre completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={form.nombre}
                onChange={handleChange}
                className="rifa-input"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <label htmlFor="documento" className="rifa-label">Cédula / Documento de identidad *</label>
              <input
                type="number"
                id="documento"
                name="documento"
                required
                value={form.documento}
                onChange={handleChange}
                className="rifa-input"
                placeholder="Número de documento"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="rifa-label">Teléfono / WhatsApp *</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                value={form.telefono}
                onChange={handleChange}
                className="rifa-input"
                placeholder="Ej: 3001234567"
              />
            </div>
            <div>
              <label htmlFor="email" className="rifa-label">Correo electrónico (opcional)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="rifa-input"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            <div>
              <label htmlFor="cuotas" className="rifa-label">Número de cuotas a pagar *</label>
              <select
                id="cuotas"
                name="cuotas"
                required
                value={form.cuotas}
                onChange={handleChange}
                className="rifa-select"
              >
                {CUOTA_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt} cuota{opt > 1 ? 's' : ''}</option>
                ))}
              </select>
              <div className="rifa-cuota-info">
                {numCuotas === 1 && '1 cuota → $175.000'}
                {numCuotas === 2 && '2 cuotas → $87.500'}
                {numCuotas === 3 && '3 cuotas → $58.333'}
                {numCuotas === 4 && '4 cuotas → $43.750'}
              </div>
            </div>
            <div>
              <label className="rifa-label">Comprobante de pago</label>
              <input
                type="file"
                id="comprobante"
                name="comprobante"
                className="rifa-file-hidden"
                accept="image/*,application/pdf"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setComprobanteName(e.target.files[0].name);
                    setComprobanteFile(e.target.files[0]);
                  }
                }}
              />
              <button
                type="button"
                className="rifa-upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <FiUpload style={{ marginRight: 8, fontSize: '1.2em' }} />
                {comprobanteName ? comprobanteName : 'Cargar comprobante'}
              </button>
            </div>
            <button
              type="button"
              className="rifa-submit"
              disabled={loading}
              onClick={async () => {
                if (!comprobanteFile) {
                  setShowToast(true);
                  return;
                }
                await submitRifa({
                  nombre: form.nombre,
                  cedula: form.documento,
                  telefono: form.telefono,
                  email: form.email,
                  cuotas_total: Number(form.cuotas),
                  cuota_valor: calcularCuota(Number(form.cuotas)),
                  es_apto: true,
                  comprobante: comprobanteFile,
                });
                setShowToast(true);
              }}
            >
              {loading ? 'Ejecutando...' : 'Participar ahora'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
      <ToastProvider>
        <ToastViewport />
        {showToast && (
          <Toast variant={success ? 'default' : 'destructive'} open={true} onOpenChange={setShowToast}>
            <ToastTitle>{success ? '¡Participación exitosa!' : 'Error en la participación'}</ToastTitle>
            <ToastDescription>
              {success
                ? 'Tu registro fue enviado correctamente. Pronto recibirás confirmación.'
                : error || 'Hubo un error al enviar tu registro.'}
            </ToastDescription>
          </Toast>
        )}
      </ToastProvider>
    </div>
  );
}
