import { useState } from 'react';

export function useDeudoresRifa() {
  const [rifaId, setRifaId] = useState('');
  const [deudores, setDeudores] = useState([]);
  const [loading, setLoading] = useState(false);

  const consultarDeudores = async () => {
    setLoading(true);
    // TODO: Llamar API para consultar deudores de la rifa
    setLoading(false);
  };

  return { rifaId, setRifaId, deudores, consultarDeudores, loading };
}
