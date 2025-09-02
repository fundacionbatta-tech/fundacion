import { useState } from 'react';

export function useCancelarPago() {
  const [pagoId, setPagoId] = useState('');
  const [loading, setLoading] = useState(false);

  const cancelarPago = async () => {
    setLoading(true);
    // TODO: Llamar API para cancelar/eliminar pago
    setLoading(false);
  };

  return { pagoId, setPagoId, cancelarPago, loading };
}
