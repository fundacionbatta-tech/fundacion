import React from 'react';

export interface Boleto {
  id: string;
  numero: string;
  precio: number;
  numero_cuotas: number;
  pagado: boolean;
  total_pagado: number;
  saldo_pendiente: number;
  comprador_correo: string;
  comprador_telefono: string;
}

interface CuotasCardsProps {
  boletos: Boleto[];
  onVerDetalle: (boleto: Boleto) => void;
}

const CuotasCards: React.FC<CuotasCardsProps> = ({ boletos, onVerDetalle }) => {
  if (!boletos.length) return null;
  return (
    <div className="cuotas-cards-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {boletos.map((boleto) => (
        <div
          key={boleto.id}
          className="cuotas-card"
          style={{
            background: 'linear-gradient(120deg, #f1f5f9 0%, #e0e7ff 100%)',
            borderRadius: '1.2rem',
            boxShadow: '0 4px 16px rgba(99,102,241,0.08)',
            padding: '1.5rem 1.2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.7rem',
            border: '1.5px solid #6366f1',
            fontWeight: 500,
          }}
        >
          <h3 style={{ color: '#312e81', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            Boleto #{boleto.numero}
          </h3>
          <p style={{ color: '#312e81', fontSize: '1.05rem' }}>
            Precio: <span style={{ fontWeight: 700 }}>${boleto.precio}</span>
          </p>
          <p style={{ color: '#312e81', fontSize: '1.05rem' }}>
            Cuotas pactadas: <span style={{ fontWeight: 700 }}>{boleto.numero_cuotas}</span>
          </p>
          <p style={{ color: '#312e81', fontSize: '1.05rem' }}>
            Total pagado: <span style={{ fontWeight: 700 }}>${boleto.total_pagado}</span>
          </p>
          <p style={{ color: boleto.saldo_pendiente > 0 ? '#f59e42' : '#22c55e', fontSize: '1.05rem' }}>
            Saldo pendiente: <span style={{ fontWeight: 700 }}>${boleto.saldo_pendiente}</span>
          </p>
          <p style={{ color: boleto.pagado ? '#22c55e' : '#f59e42', fontWeight: 700, fontSize: '1.08rem' }}>
            Estado: {boleto.pagado ? 'Pagado' : 'Pendiente'}
          </p>
          <button
            className="cuotas-btn"
            onClick={() => onVerDetalle(boleto)}
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #312e81 100%)',
              color: '#fff',
              fontWeight: 700,
              border: 'none',
              borderRadius: '0.8rem',
              padding: '0.7rem 1.2rem',
              marginTop: '0.5rem',
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              cursor: 'pointer',
              fontSize: '1.05rem',
              transition: 'background 0.2s',
            }}
          >
            Ver detalle
          </button>
        </div>
      ))}
    </div>
  );
};

export default CuotasCards;
