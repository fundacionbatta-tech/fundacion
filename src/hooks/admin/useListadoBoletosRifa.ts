import { useState } from 'react';

export function useListadoBoletosRifa() {
  const [rifaId, setRifaId] = useState('');
  const [boletos, setBoletos] = useState([]);
  const [loading, setLoading] = useState(false);

  const consultarBoletos = async () => {
    setLoading(true);
    // TODO: Llamar API para consultar boletos de la rifa
    setLoading(false);
  };

  return { rifaId, setRifaId, boletos, consultarBoletos, loading };
}
