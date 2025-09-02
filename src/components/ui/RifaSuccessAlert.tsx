import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface RifaSuccessAlertProps {
  open: boolean;
  onClose: () => void;
}

const CONFETTI_DURATION = 8000; // 8 segundos

const RifaSuccessAlert: React.FC<RifaSuccessAlertProps> = ({ open, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, CONFETTI_DURATION);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.reload();
    }, 400); // Espera breve para el scroll antes de refrescar
  };

  if (!open) return null;
  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          recycle={false}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none' }}
        />
      )}
      <div
        className="rifa-success-toast"
        style={{
          zIndex: 9999,
          minWidth: 'unset',
          maxWidth: '90vw',
          padding: '2.5em 2em',
          borderRadius: '2em',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ fontSize: '4em', marginBottom: '0.5em' }}>🎉🎟️</span>
        <div
          style={{
            color: '#1D4ED8',
            fontWeight: 900,
            fontSize: '2.5em',
            letterSpacing: '0.05em',
            display: 'inline-block',
            animation: 'pop 1s cubic-bezier(.17,.67,.83,.67)',
          }}
        >
          ¡Ya casi es tuyo!
        </div>
        <style>{`
          @keyframes pop {
            0% { transform: scale(0.7); opacity: 0; }
            60% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
        <div
          style={{
            color: '#374151',
            fontSize: '1.35em',
            marginTop: '1.2em',
            display: 'block',
            fontWeight: 600,
          }}
        >
          Validando tu participación.
          <br />
          En breve te enviaremos tu boleto al correo.
        </div>
        <button
          style={{
            marginTop: '2em',
            background: 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)',
            color: '#fff',
            fontWeight: 600,
            padding: '0.9rem 2.2rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
          }}
          onClick={handleClose}
        >
          Cerrar
        </button>
      </div>
    </>
  );
};

export default RifaSuccessAlert;
