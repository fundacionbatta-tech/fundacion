import { useState } from 'react';

export function useRegistrarPago() {
  const [boletoId, setBoletoId] = useState('');
  const [monto, setMonto] = useState(0);
  const [metodo, setMetodo] = useState('');
  const [referencia, setReferencia] = useState('');
  const [loading, setLoading] = useState(false);

  const registrarPago = async () => {
    setLoading(true);
    // TODO: Llamar API para registrar pago
    setLoading(false);
  };

  return {
    boletoId,
    setBoletoId,
    monto,
    setMonto,
    metodo,
    setMetodo,
    referencia,
    setReferencia,
    registrarPago,
    loading,
  };
}
