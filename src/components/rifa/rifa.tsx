'use client';

import RifaSuccessAlert from '@/components/ui/RifaSuccessAlert';
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBoletos } from '@/hooks/useBoletos';
import { useRifaSubmission } from '@/hooks/useRifaSubmission';
import { useRifasActivas } from '@/hooks/useRifasActivas';
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from '@/components/ui/toast';
import { FiUpload } from 'react-icons/fi';
import '@/styles/rifa.css';

const CUOTA_TOTAL = 175000;
const CUOTA_OPTIONS = [1, 2, 3, 4];

function calcularCuota(numCuotas: number) {
  if (!numCuotas) return 0;
  return Math.round(CUOTA_TOTAL / numCuotas);
}

const Rifa: React.FC = () => {
  const [numCuotas, setNumCuotas] = useState(1);
  const [form, setForm] = useState({
    nombre: '',
    documento: '',
    telefono: '',
    email: '',
    cuotas: 1,
  });
  const [errors, setErrors] = useState({
    nombre: '',
    documento: '',
    telefono: '',
    email: '',
    comprobante: '',
    boleto: '',
  });
  const [comprobanteName, setComprobanteName] = useState('');
  const [comprobanteFile, setComprobanteFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showNequi, setShowNequi] = useState(false);
  const [showBancolombia, setShowBancolombia] = useState(false);
  const [selectedBoleto, setSelectedBoleto] = useState<number | null>(null);
  const [verificacionId, setVerificacionId] = useState('');
  const [verificacionInfo, setVerificacionInfo] = useState<any>(null);
  const [verificando, setVerificando] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContainer, setModalContainer] = useState<Element | null>(null);
  useEffect(() => {
    setModalContainer(document.body);
  }, []);

  const { rifas, loading: rifasLoading } = useRifasActivas();
  const activeRifa = rifas.length > 0 ? rifas[0] : null;
  // Consulta boletos comprados
  const { boletos, loading: boletosLoading } = useBoletos(activeRifa ? activeRifa.id : null);
  // Usar el total_boletos de la rifa activa
  const TOTAL_BOLETOS = activeRifa ? activeRifa.total_boletos : 0;
  const boletosComprados = boletos.map((b) => b.numero);
  const boletosDisponibles = Array.from({ length: TOTAL_BOLETOS }, (_, i) => i + 1).filter(
    (num) => !boletosComprados.includes(num),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (name === 'cuotas') setNumCuotas(Number(value));
  };

  // Hook para enviar la info
  const { loading, error, success, submitRifa } = useRifaSubmission();
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="rifa-container">
      <Header />
      <main className="homepage-main rifa-bg">
        <div className="rifa-form-wrapper card-glass wide">
          <h2 className="rifa-title gradient-text">🎉 Participa en la Rifa Solidaria</h2>
          {activeRifa && (
            <div className="rifa-info-box">
              <p className="rifa-subtitle">
                <b>{activeRifa.nombre}</b>
                <br />
                {activeRifa.descripcion}
                <br />
                <span className="rifa-date">
                  Inicio: {activeRifa.fecha_inicio} | Fin: {activeRifa.fecha_fin}
                </span>
              </p>
              <div className="rifa-stats">
                <span className="rifa-stat">
                  🎟️ <b>{activeRifa.total_boletos}</b> boletos disponibles
                </span>
                <span className="rifa-stat">
                  💵 Valor por boleto: <b>${activeRifa.precio_boleto} COP</b>
                </span>
                {activeRifa.permitir_cuotas && <span className="rifa-stat">Permite cuotas</span>}
              </div>
            </div>
          )}
          <form className="rifa-form fancy-form">
            <div className="rifa-bank-icons">
              <span className="rifa-label">Cuentas para pago:</span>
              <div style={{ display: 'flex', gap: '1.5rem', margin: '0.7rem 0' }}>
                <div style={{ textAlign: 'center' }}>
                  <img
                    src="/assets/logo/nequi.png"
                    alt="Nequi"
                    className="rifa-bank-logo"
                    onClick={() => setShowNequi((v) => !v)}
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
                    onClick={() => setShowBancolombia((v) => !v)}
                    style={{ cursor: 'pointer' }}
                  />
                  {showBancolombia && (
                    <div className="rifa-bank-info">
                      <b>Bancolombia</b>
                      <br />
                      Cuenta ahorros
                      <br />
                      26200030124
                      <br />
                      NIT 900425311
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="nombre" className="rifa-label">
                Nombre completo *
              </label>
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
              {errors.nombre && (
                <span className="rifa-error" style={{ color: 'red', fontSize: '0.95em' }}>
                  {errors.nombre}
                </span>
              )}
            </div>
            <div>
              <label className="rifa-label">Elige tu número de boleto *</label>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.7rem' }}>
                <button
                  type="button"
                  className="rifa-pag-btn"
                  onClick={() => {
                    if (boletosDisponibles.length > 0) {
                      const random = boletosDisponibles[Math.floor(Math.random() * boletosDisponibles.length)];
                      setSelectedBoleto(random);
                    }
                  }}
                >
                  Elegir boleto aleatorio
                </button>
                <button
                  type="button"
                  className="rifa-pag-btn"
                  onClick={() => {
                    setModalOpen(true);
                    setVerificacionId('');
                    setVerificacionInfo(null);
                  }}
                >
                  Verificar boleto
                </button>
                {modalOpen &&
                  modalContainer &&
                  createPortal(
                    <div className="rifa-modal-bg">
                      <div className="rifa-modal">
                        <h3>Verificar boleto</h3>
                        <div style={{ marginBottom: '1rem', color: '#374151', fontSize: '1rem' }}>
                          Ingresa el ID del boleto para consultar su estado y fecha de registro.
                        </div>
                        <input
                          type="text"
                          className="rifa-input"
                          style={{ width: '100%', marginBottom: '0.7rem' }}
                          placeholder="Número del boleto"
                          value={verificacionId}
                          onChange={(e) => setVerificacionId(e.target.value.replace(/\D/g, ''))}
                        />
                        <button
                          type="button"
                          className="rifa-pag-btn"
                          style={{ marginBottom: '0.7rem' }}
                          onClick={async () => {
                            if (!verificacionId) return;
                            setVerificando(true);
                            setVerificacionInfo(null);
                            // Consultar boleto por numero
                            const supabase = (await import('@/utils/supabase/client')).createClient();
                            const { data, error } = await supabase
                              .from('boletos')
                              .select('*')
                              .eq('numero', Number(verificacionId))
                              .eq('rifa_id', activeRifa?.id)
                              .single();
                            if (error || !data) {
                              setVerificacionInfo({ error: 'No se encontró el boleto.' });
                            } else {
                              setVerificacionInfo({
                                fecha: data.created_at,
                                estado: data.pagado ? 'Pagado' : 'Pendiente',
                              });
                            }
                            setVerificando(false);
                          }}
                        >
                          Consultar
                        </button>
                        {verificando && <div className="rifa-loading">Verificando...</div>}
                        {verificacionInfo && (
                          <div className="rifa-verificacion-info">
                            {verificacionInfo.error ? (
                              <span style={{ color: 'red' }}>{verificacionInfo.error}</span>
                            ) : (
                              <>
                                <div>
                                  <b>Fecha de registro:</b> {verificacionInfo.fecha}
                                </div>
                                <div>
                                  <b>Estado:</b> {verificacionInfo.estado}
                                </div>
                                <div>
                                  <b>Datos censurados</b>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', marginTop: '1.2rem' }}>
                          <button
                            type="button"
                            className="rifa-pag-btn"
                            onClick={() => {
                              setModalOpen(false);
                              setVerificacionId('');
                              setVerificacionInfo(null);
                            }}
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </div>,
                    modalContainer,
                  )}
              </div>
              {boletosLoading ? (
                <div className="rifa-loading">Cargando boletos...</div>
              ) : (
                <div className="rifa-boletos-grid scrollable-boletos">
                  {Array.from({ length: TOTAL_BOLETOS }, (_, i) => i + 1).map((num) => {
                    const vendido = boletosComprados.includes(num);
                    // Calcular el número con ceros a la izquierda
                    const numStr = num.toString().padStart(TOTAL_BOLETOS.toString().length, '0');
                    return (
                      <button
                        type="button"
                        key={num}
                        className={`boleto-cuadro small${selectedBoleto === num ? ' selected' : ''}${vendido ? ' vendido' : ''}`}
                        onClick={() => !vendido && setSelectedBoleto(num)}
                        disabled={vendido || loading}
                      >
                        <span className="boleto-num">{numStr}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              <small className="rifa-cuota-info">
                Haz clic en el boleto que deseas. Los boletos en gris ya están vendidos.
              </small>
              {selectedBoleto && (
                <div className="rifa-cuota-info" style={{ marginTop: '0.3rem', color: '#1D4ED8', fontWeight: 600 }}>
                  Boleto elegido:{' '}
                  <span style={{ fontFamily: 'Roboto Mono, monospace' }}>
                    {selectedBoleto.toString().padStart(TOTAL_BOLETOS.toString().length, '0')}
                  </span>
                </div>
              )}
              {/* Solo el modal con createPortal permanece */}
              <div className="rifa-boletos-bar">
                <span className="rifa-boletos-label">
                  Boletos vendidos: {boletosComprados.length} / {TOTAL_BOLETOS}
                </span>
                <div className="rifa-boletos-progress">
                  <div
                    className="rifa-boletos-fill"
                    style={{ width: `${(boletosComprados.length / (TOTAL_BOLETOS || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="documento" className="rifa-label">
                Cédula / Documento de identidad *
              </label>
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
              {errors.documento && (
                <span className="rifa-error" style={{ color: 'red', fontSize: '0.95em' }}>
                  {errors.documento}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="telefono" className="rifa-label">
                Teléfono / WhatsApp *
              </label>
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
              {errors.telefono && (
                <span className="rifa-error" style={{ color: 'red', fontSize: '0.95em' }}>
                  {errors.telefono}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="rifa-label">
                Correo electrónico *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="rifa-input"
                placeholder="tucorreo@ejemplo.com"
              />
              {errors.email && (
                <span className="rifa-error" style={{ color: 'red', fontSize: '0.95em' }}>
                  {errors.email}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="cuotas" className="rifa-label">
                Número de cuotas a pagar *
              </label>
              <select
                id="cuotas"
                name="cuotas"
                required
                value={form.cuotas}
                onChange={handleChange}
                className="rifa-select"
              >
                {CUOTA_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt} cuota{opt > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              <div className="rifa-cuota-info">
                {numCuotas === 1 && '1 cuota → $175.000'}
                {numCuotas === 2 && '2 cuotas → $87.500'}
                {numCuotas === 3 && '3 cuotas → $58.333'}
                {numCuotas === 4 && '4 cuotas → $43.750'}
              </div>
            </div>
            <div className="rifa-aviso-obligatorio">
              <span>⚠️ Para participar es obligatorio realizar el primer pago y adjuntar el comprobante.</span>
            </div>
            <div>
              <label className="rifa-label">Comprobante de pago *</label>
              <input
                type="file"
                id="comprobante"
                name="comprobante"
                className="rifa-file-hidden"
                accept="image/*,application/pdf"
                ref={fileInputRef}
                style={{ display: 'none' }}
                required
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setComprobanteName(e.target.files[0].name);
                    setComprobanteFile(e.target.files[0]);
                    setErrors((prev) => ({ ...prev, comprobante: '' }));
                  }
                }}
              />
              <button type="button" className="rifa-upload-btn" onClick={() => fileInputRef.current?.click()}>
                <FiUpload style={{ marginRight: 8, fontSize: '1.2em' }} />
                {comprobanteName ? comprobanteName : 'Cargar comprobante'}
              </button>
              {errors.comprobante && (
                <span className="rifa-error" style={{ color: 'red', fontSize: '0.95em' }}>
                  {errors.comprobante}
                </span>
              )}
            </div>
            <button
              type="button"
              className="rifa-submit"
              disabled={loading || rifasLoading || boletosLoading || !activeRifa}
              onClick={async () => {
                // Validación de campos
                const newErrors: any = {};
                if (!form.nombre.trim()) newErrors.nombre = 'Este campo es obligatorio';
                if (!form.documento.trim()) newErrors.documento = 'Este campo es obligatorio';
                if (!form.telefono.trim()) newErrors.telefono = 'Este campo es obligatorio';
                if (!form.email.trim()) newErrors.email = 'Este campo es obligatorio';
                if (!comprobanteFile) newErrors.comprobante = 'Adjunta el comprobante de pago';
                if (!selectedBoleto) newErrors.boleto = 'Selecciona un boleto';
                setErrors(newErrors);
                if (Object.keys(newErrors).length > 0 || !activeRifa || !comprobanteFile || !selectedBoleto) {
                  setShowToast(true);
                  return;
                }
                await submitRifa({
                  rifa_id: activeRifa.id,
                  nombre: form.nombre,
                  cedula: form.documento,
                  telefono: form.telefono,
                  email: form.email,
                  cuotas: Number(form.cuotas),
                  precio: activeRifa.precio_boleto,
                  comprobante: comprobanteFile as File,
                  boleto_numero: selectedBoleto as number,
                });
                setShowToast(true);
              }}
            >
              {loading ? 'Ejecutando...' : 'Participar ahora'}
            </button>
            {errors.boleto && (
              <span className="rifa-error" style={{ color: 'red', fontSize: '0.95em' }}>
                {errors.boleto}
              </span>
            )}
          </form>
        </div>
      </main>
      <Footer />
      <ToastProvider>
        <ToastViewport />
        {/* Alerta personalizada solo para éxito */}
        {showToast && success && <RifaSuccessAlert open={showToast} onClose={() => setShowToast(false)} />}
        {/* Toast de error */}
        {showToast && !success && (
          <Toast variant="destructive" open={true} onOpenChange={setShowToast}>
            <ToastTitle>
              <span style={{ color: '#1F2937' }}>Error en la participación</span>
            </ToastTitle>
            <ToastDescription>
              <span style={{ color: '#1F2937' }}>{error || 'Hubo un error al enviar tu registro.'}</span>
            </ToastDescription>
          </Toast>
        )}
      </ToastProvider>
    </div>
  );
};

export default Rifa;
