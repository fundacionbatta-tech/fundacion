'use client';

import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';
import { useState } from 'react';
import { useConsultarCuotas } from '@/hooks/useConsultarCuotas';
import CuotasCards, { Boleto } from './CuotasCards';
import BoletoModal, { Pago } from './BoletoModal';
import '@/styles/cuotas.css';

export default function Cuotas() {
  const [cedula, setCedula] = useState('');
  const [selectedBoleto, setSelectedBoleto] = useState<Boleto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pagos, setPagos] = useState<Pago[]>([]);
  const { loading, error, boletos, consultar, registrarPago, consultarPagos } = useConsultarCuotas();

  // Abrir modal y cargar pagos
  const handleVerDetalle = async (boleto: Boleto) => {
    setSelectedBoleto(boleto);
    setModalOpen(true);
    // Consultar pagos del boleto
    const pagosBoleto = await consultarPagos(boleto.id);
    setPagos(pagosBoleto);
  };

  // Registrar pago handler
  const handleRegistrarPago = async (boletoId: string, pago: { monto: number; metodo: string; referencia: string }) => {
    await registrarPago(boletoId, pago);
    // Actualizar pagos y estado del boleto
    if (selectedBoleto) {
      const pagosActualizados = await consultarPagos(boletoId);
      setPagos(pagosActualizados);
      consultar(cedula); // refrescar boletos
    }
  };

  return (
    <div
      className="homepage-container"
      style={{
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
        minHeight: '100vh',
      }}
    >
      <Header />
      <main
        className="homepage-main"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh' }}
      >
        <div
          className="cuotas-container"
          style={{
            background: '#fff',
            borderRadius: '1.5rem',
            boxShadow: '0 8px 32px rgba(60,60,120,0.10)',
            padding: '2.5rem 2rem',
            marginTop: '3rem',
            minWidth: '350px',
            maxWidth: '480px',
            width: '100%',
          }}
        >
          <h2
            className="cuotas-title"
            style={{
              color: '#312e81',
              fontWeight: 800,
              fontSize: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}
          >
            Consultar Cuotas
          </h2>
          <form
            className="cuotas-form"
            onSubmit={(e) => {
              e.preventDefault();
              consultar(cedula);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}
          >
            <label
              htmlFor="cedula"
              style={{ color: '#312e81', fontWeight: 500, fontSize: '1.1rem', marginBottom: '0.2rem' }}
            >
              Ingrese su número de cédula para consultar sus cuotas:
            </label>
            <input
              type="text"
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
              style={{
                padding: '0.8rem 1rem',
                borderRadius: '0.8rem',
                border: '1.5px solid #6366f1',
                fontSize: '1.1rem',
                color: '#312e81',
                background: '#f1f5f9',
                outline: 'none',
                fontWeight: 500,
                transition: 'border 0.2s',
                boxShadow: '0 2px 8px rgba(99,102,241,0.04)',
              }}
              onFocus={(e) => (e.currentTarget.style.border = '2px solid #312e81')}
              onBlur={(e) => (e.currentTarget.style.border = '1.5px solid #6366f1')}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(90deg, #6366f1 0%, #312e81 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.1rem',
                border: 'none',
                borderRadius: '0.8rem',
                padding: '0.8rem 1rem',
                boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'background 0.2s, opacity 0.2s',
              }}
            >
              Consultar
            </button>
          </form>
          {error === 'NO_BOLETOS' && (
            <div
              className="cuotas-info"
              style={{
                textAlign: 'center',
                border: '2px solid #6366f1',
                background: 'linear-gradient(120deg, #f1f5f9 0%, #e0e7ff 100%)',
                borderRadius: '1rem',
                padding: '2rem',
                marginTop: '2rem',
                boxShadow: '0 2px 8px rgba(99,102,241,0.04)',
              }}
            >
              <h3 style={{ color: '#6366f1', fontWeight: 700, marginBottom: '1rem', fontSize: '1.3rem' }}>
                ¡No tienes boletos registrados!
              </h3>
              <p style={{ color: '#312e81', fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 500 }}>
                Te invitamos a participar en la rifa solidaria.
                <br />
                ¡Anímate y apóyanos!
              </p>
              <a
                href="/rifa-solidaria"
                className="cuotas-btn"
                style={{
                  textDecoration: 'none',
                  display: 'inline-block',
                  background: 'linear-gradient(90deg, #6366f1 0%, #312e81 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  borderRadius: '0.8rem',
                  padding: '0.7rem 1.2rem',
                  marginTop: '0.5rem',
                  boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
                }}
              >
                Ver rifa solidaria
              </a>
            </div>
          )}
          {boletos.length > 0 && (
            <div className="cuotas-info" style={{ marginTop: '2rem' }}>
              <h4
                style={{
                  color: '#6366f1',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  marginBottom: '1.2rem',
                  textAlign: 'center',
                }}
              >
                Tus boletos
              </h4>
              <CuotasCards boletos={boletos} onVerDetalle={handleVerDetalle} />
            </div>
          )}
          {selectedBoleto && (
            <BoletoModal
              boleto={selectedBoleto}
              pagos={pagos}
              open={modalOpen}
              onClose={() => {
                setModalOpen(false);
                setSelectedBoleto(null);
                setPagos([]);
              }}
              onRegistrarPago={handleRegistrarPago}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
