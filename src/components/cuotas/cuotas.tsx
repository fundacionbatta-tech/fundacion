"use client";


import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';
import { useState } from 'react';
import { useConsultarCuotas } from '@/hooks/useConsultarCuotas';
import '@/styles/cuotas.css';

export default function Cuotas() {
  const [cedula, setCedula] = useState('');
  const [showPagoForm, setShowPagoForm] = useState(false);
  const [numeroCuota, setNumeroCuota] = useState('');
  const [valorPago, setValorPago] = useState('');
  const [fechaPago, setFechaPago] = useState('');
  const {
    loading,
    error,
    participante,
    cuotas,
    consultar,
    registrarPago,
    marcarApto
  } = useConsultarCuotas();

  // Calcular cuotas pagadas
  const cuotasPagadas = cuotas.filter(c => c.estado === 'Pagada').length;
  const cuotasPendientes = participante ? participante.cuotas_total - cuotasPagadas : 0;

  // Mensaje final
  let mensajeFinal = '';
  if (participante && participante.es_apto && cuotasPendientes === 0) {
    mensajeFinal = `¡Felicidades ${participante.nombre}! Ya estás al día y eres apto para participar.`;
  } else if (participante && cuotasPendientes > 0 && participante.cuotas_total > 1) {
    mensajeFinal = `Tienes ${cuotasPendientes} cuotas pendientes por pagar.`;
  }

  // Registrar pago handler
  const handleRegistrarPago = async (e: any) => {
    e.preventDefault();
    if (!participante) return;
    const form = e.target;
    const comprobanteFile = form.comprobante.files[0];
    const ok = await registrarPago(participante.id, Number(numeroCuota), Number(valorPago), fechaPago, comprobanteFile);
    if (ok && cuotasPagadas + 1 === participante.cuotas_total) {
      await marcarApto(participante.id);
    }
    setNumeroCuota('');
    setValorPago('');
    setFechaPago('');
    setShowPagoForm(false);
  };


  return (
    <div className="homepage-container">
      <Header />
      <main className="homepage-main">
        <div className="cuotas-container">
          <h2 className="cuotas-title">Consultar Cuotas</h2>
          <form
            className="cuotas-form"
            onSubmit={e => { e.preventDefault(); consultar(cedula); }}
          >
            <label htmlFor="cedula">Ingrese su número de cédula para consultar sus cuotas:</label>
            <input
              type="text"
              id="cedula"
              value={cedula}
              onChange={e => setCedula(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>Consultar</button>
          </form>
          {error === 'NO_PARTICIPANTE' && (
            <div className="cuotas-info" style={{ textAlign: 'center', border: '2px solid #6366f1', background: '#f1f5f9', borderRadius: '1rem', padding: '2rem', marginTop: '2rem' }}>
              <h3 style={{ color: '#6366f1', fontWeight: 700, marginBottom: '1rem' }}>¡No es un participante!</h3>
              <p style={{ color: '#000', fontSize: '1.1rem', marginBottom: '1rem' }}>Pero te invitamos a participar en la rifa solidaria.<br />¡Anímate y apóyanos!</p>
              <a href="/rifa-solidaria" className="cuotas-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Ver rifa solidaria</a>
            </div>
          )}
          {participante && (
            participante.es_apto ? (
              <div className="cuotas-info" style={{
                background: 'linear-gradient(135deg, #e0e7ff 0%, #fff 100%)',
                border: '2px solid #6366f1',
                boxShadow: '0 8px 32px rgba(99,102,241,0.10)',
                borderRadius: '1.5rem',
                padding: '2.5rem 1.5rem',
                marginTop: '2rem',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-1.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#6366f1',
                  color: '#fff',
                  borderRadius: '2rem',
                  padding: '0.5rem 2rem',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  boxShadow: '0 2px 8px rgba(99,102,241,0.12)'
                }}>
                  Información del Participante
                </div>
                <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.1rem', color: '#6366f1', fontWeight: 600 }}>¡Hola <b style={{ color: '#000' }}>{participante.nombre}</b>!</span>
                  <p style={{ fontSize: '1rem', color: '#000', marginTop: '0.5rem' }}>Gracias por apoyar nuestra causa. Aquí tienes el resumen de tus datos y cuotas:</p>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <p><b>Teléfono:</b> <span style={{ color: '#6366f1' }}>{participante.telefono}</span></p>
                  <p><b>Email:</b> <span style={{ color: '#6366f1' }}>{participante.email}</span></p>
                  <p><b>Cuotas totales:</b> <span style={{ color: '#6366f1' }}>{participante.cuotas_total}</span></p>
                  <p><b>Valor de cada cuota:</b> <span style={{ color: '#6366f1' }}>${participante.cuota_valor}</span></p>
                  <p><b>Estado actual:</b> <span style={{ color: participante.es_apto ? '#22c55e' : '#f59e42', fontWeight: 600 }}>{participante.es_apto ? 'Apto' : 'Pendiente'}</span></p>
                </div>
                {/* Revisión de cuotas */}
                {participante.cuotas_total === 1 ? (
                  participante.es_apto ? (
                    <p className="cuotas-success">Felicidades, ya completaste tu pago y estás apto.</p>
                  ) : (
                    <button className="cuotas-btn" onClick={() => setShowPagoForm(true)}>Registrar Pago</button>
                  )
                ) : (
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ color: '#6366f1', fontWeight: 600 }}>Cuotas</h4>
                    <table className="cuotas-table">
                      <thead>
                        <tr>
                          <th>N° de cuota</th>
                          <th>Valor</th>
                          <th>Estado</th>
                          <th>Fecha de pago</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cuotas.map((cuota, idx) => (
                          <tr key={idx}>
                            <td>{cuota.numero_cuota}</td>
                            <td>{cuota.valor_pago}</td>
                            <td>{cuota.pagada ? 'Pagada' : 'Pendiente'}</td>
                            <td>{cuota.fecha_pago ? new Date(cuota.fecha_pago).toLocaleDateString() : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {cuotasPendientes > 0 && (
                      <button className="cuotas-btn" onClick={() => setShowPagoForm(true)}>Registrar Pago</button>
                    )}
                  </div>
                )}
                {/* Formulario de registro de cuotas */}
                {showPagoForm && (
                  <form className="cuotas-form" style={{ marginTop: '2rem' }} onSubmit={handleRegistrarPago}>
                    <h4 style={{ color: '#6366f1', fontWeight: 600 }}>Registrar Pago</h4>
                    <label>Número de cuota pendiente:</label>
                    <input type="number" value={numeroCuota} onChange={e => setNumeroCuota(e.target.value)} required />
                    <label>Valor del pago:</label>
                    <input type="number" value={valorPago} onChange={e => setValorPago(e.target.value)} required />
                    <label>Fecha de pago:</label>
                    <input type="date" value={fechaPago} onChange={e => setFechaPago(e.target.value)} required />
                    <label>Comprobante de pago (imagen o PDF):</label>
                    <input type="file" accept="image/png,image/jpeg,application/pdf" style={{ marginBottom: '1rem' }} required id="comprobante" name="comprobante" />
                    <button className="cuotas-btn" type="submit" disabled={loading}>Registrar Pago</button>
                    <button className="cuotas-btn" type="button" style={{ background: '#f1f5f9', color: '#6366f1', marginLeft: '1rem' }} onClick={() => setShowPagoForm(false)}>Cancelar</button>
                  </form>
                )}
                {/* Mensaje final */}
                {mensajeFinal && (
                  <p className={participante.es_apto ? 'cuotas-success' : 'cuotas-warning'}>{mensajeFinal}</p>
                )}
              </div>
            ) : (
              <div className="cuotas-info" style={{
                background: 'linear-gradient(135deg, #e0e7ff 0%, #fff 100%)',
                border: '3px solid #3b82f6',
                borderRadius: '1.5rem',
                padding: '2.5rem 1.5rem',
                marginTop: '2rem',
                color: '#1e293b',
                fontWeight: 600,
                fontSize: '1.1rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(59,130,246,0.10)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'inline-block',
                  position: 'relative',
                  top: '-1.2rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#3b82f6',
                  color: '#fff',
                  borderRadius: '2rem',
                  padding: '0.7rem 2.5rem',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  boxShadow: '0 2px 8px rgba(59,130,246,0.12)',
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  zIndex: 2,
                  marginBottom: '0.5rem'
                }}>
                  No apto para la participación en la rifa
                </div>
                <p style={{ marginTop: '0.5rem', color: '#1e293b', fontWeight: 500, fontSize: '1.1rem' }}>
                  Lamentablemente, aún no eres apto para participar en la rifa solidaria.<br />
                  Por favor, completa tus pagos pendientes para habilitar tu participación.<br />
                  <span style={{ color: '#3b82f6', fontWeight: 700 }}>¡Ánimo, estás cerca de lograrlo!</span>
                </p>
                <div style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80%',
                  height: '0.5rem',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #e0e7ff 100%)',
                  borderRadius: '1rem',
                  opacity: 0.3
                }}></div>
              </div>
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
