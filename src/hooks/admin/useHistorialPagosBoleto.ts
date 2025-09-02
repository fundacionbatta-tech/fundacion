import { useState } from 'react';

export function useHistorialPagosBoleto() {
  const [boletoId, setBoletoId] = useState('');
  const [pagos, setPagos] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [loading, setLoading] = useState(false);

  const consultarPagos = async () => {
    setLoading(true);
    // TODO: Llamar API para consultar pagos de un boleto
    setLoading(false);
  };

  return { boletoId, setBoletoId, pagos, saldo, consultarPagos, loading };
}
