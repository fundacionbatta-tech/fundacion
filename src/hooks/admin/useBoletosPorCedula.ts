import { useState } from 'react';

export function useBoletosPorCedula() {
  const [cedula, setCedula] = useState('');
  const [boletos, setBoletos] = useState([]);
  const [loading, setLoading] = useState(false);

  const consultarBoletos = async () => {
    setLoading(true);
    // TODO: Llamar API para consultar boletos por cédula
    setLoading(false);
  };

  return { cedula, setCedula, boletos, consultarBoletos, loading };
}
