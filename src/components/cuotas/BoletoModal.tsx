import React, { useState } from 'react';

export interface Pago {
  monto: number;
  metodo: string;
  referencia: string;
  fecha_pago: string;
}

interface BoletoModalProps {
  boleto: any;
  pagos: Pago[];
  open: boolean;
  onClose: () => void;
  onRegistrarPago: (boletoId: string, pago: { monto: number; metodo: string; referencia: string }) => void;
}

const BoletoModal: React.FC<BoletoModalProps> = ({ boleto, pagos, open, onClose, onRegistrarPago }) => {
  const [monto, setMonto] = useState(0);
  const [metodo, setMetodo] = useState('transferencia');
  const [referencia, setReferencia] = useState('');

  if (!open) return null;

  return (
    <div className="cuotas-modal-overlay">
      <div
        className="cuotas-modal"
        style={{
          background: 'linear-gradient(120deg, #f1f5f9 0%, #e0e7ff 100%)',
          padding: '2.5rem 2rem',
          borderRadius: '1.5rem',
          minWidth: '350px',
          maxWidth: '95vw',
          position: 'relative',
          boxShadow: '0 8px 32px rgba(60,60,120,0.10)',
        }}
      >
        <button
          className="cuotas-modal-close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            cursor: 'pointer',
            color: '#6366f1',
            fontWeight: 700,
          }}
        >
          ×
        </button>
        <h2
          style={{
            color: '#312e81',
            fontWeight: 800,
            fontSize: '1.5rem',
            marginBottom: '1.2rem',
            textAlign: 'center',
            letterSpacing: '0.02em',
          }}
        >
          Detalle del Boleto #{boleto.numero}
        </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginBottom: '1.2rem',
            alignItems: 'center',
          }}
        >
          <p style={{ color: '#312e81', fontSize: '1.08rem' }}>
            Precio: <span style={{ fontWeight: 700 }}>${boleto.precio}</span>
          </p>
          <p style={{ color: '#312e81', fontSize: '1.08rem' }}>
            Total pagado: <span style={{ fontWeight: 700 }}>${boleto.total_pagado}</span>
          </p>
          <p style={{ color: boleto.saldo_pendiente > 0 ? '#f59e42' : '#22c55e', fontSize: '1.08rem' }}>
            Saldo pendiente: <span style={{ fontWeight: 700 }}>${boleto.saldo_pendiente}</span>
          </p>
          <p style={{ color: boleto.pagado ? '#22c55e' : '#f59e42', fontWeight: 700, fontSize: '1.08rem' }}>
            Estado: {boleto.pagado ? 'Pagado' : 'Pendiente'}
          </p>
        </div>
        <h3
          style={{
            color: '#6366f1',
            fontWeight: 700,
            fontSize: '1.15rem',
            marginBottom: '0.7rem',
            textAlign: 'center',
          }}
        >
          Historial de pagos
        </h3>
        <table
          className="cuotas-modal-table"
          style={{
            width: '100%',
            marginBottom: '1rem',
            borderCollapse: 'collapse',
            background: '#fff',
            borderRadius: '0.8rem',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(99,102,241,0.04)',
          }}
        >
          <thead>
            <tr style={{ background: '#e0e7ff', color: '#312e81', fontWeight: 700 }}>
              <th style={{ padding: '0.6rem' }}>Fecha</th>
              <th style={{ padding: '0.6rem' }}>Monto</th>
              <th style={{ padding: '0.6rem' }}>Método</th>
              <th style={{ padding: '0.6rem' }}>Referencia</th>
            </tr>
          </thead>
          <tbody>
            {pagos.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', color: '#6366f1', fontWeight: 500, padding: '0.8rem' }}>
                  Sin pagos registrados
                </td>
              </tr>
            ) : (
              pagos.map((pago, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '0.6rem', color: '#312e81' }}>{pago.fecha_pago}</td>
                  <td style={{ padding: '0.6rem', color: '#312e81' }}>${pago.monto}</td>
                  <td style={{ padding: '0.6rem', color: '#312e81' }}>{pago.metodo}</td>
                  <td style={{ padding: '0.6rem', color: '#312e81' }}>{pago.referencia}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <h3
          style={{
            color: '#6366f1',
            fontWeight: 700,
            fontSize: '1.15rem',
            marginBottom: '0.7rem',
            textAlign: 'center',
          }}
        >
          Registrar nuevo pago
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onRegistrarPago(boleto.id, { monto, metodo, referencia });
            setMonto(0);
            setReferencia('');
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '0.5rem' }}
        >
          <input
            type="number"
            min="1"
            placeholder="Monto"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
            required
            style={{
              padding: '0.7rem 1rem',
              borderRadius: '0.8rem',
              border: '1.5px solid #6366f1',
              fontSize: '1.08rem',
              color: '#312e81',
              background: '#f1f5f9',
              outline: 'none',
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(99,102,241,0.04)',
            }}
          />
          <select
            value={metodo}
            onChange={(e) => setMetodo(e.target.value)}
            style={{
              padding: '0.7rem 1rem',
              borderRadius: '0.8rem',
              border: '1.5px solid #6366f1',
              fontSize: '1.08rem',
              color: '#312e81',
              background: '#f1f5f9',
              outline: 'none',
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(99,102,241,0.04)',
            }}
          >
            <option value="transferencia">Transferencia</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
          </select>
          <input
            type="text"
            placeholder="Referencia"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            required
            style={{
              padding: '0.7rem 1rem',
              borderRadius: '0.8rem',
              border: '1.5px solid #6366f1',
              fontSize: '1.08rem',
              color: '#312e81',
              background: '#f1f5f9',
              outline: 'none',
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(99,102,241,0.04)',
            }}
          />
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #312e81 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.08rem',
              border: 'none',
              borderRadius: '0.8rem',
              padding: '0.7rem 1.2rem',
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'background 0.2s',
            }}
          >
            Registrar pago
          </button>
        </form>
      </div>
      <style>{`
        .cuotas-modal-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.18); display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
      `}</style>
    </div>
  );
};

export default BoletoModal;
