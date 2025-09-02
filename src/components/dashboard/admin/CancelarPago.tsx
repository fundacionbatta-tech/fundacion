import React from 'react';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

const CancelarPago: React.FC = () => {
  // ...lógica y estado con hook
  return (
    <Card>
      <h2>Cancelar o Eliminar Pago</h2>
      <form>{/* input referencia/id, botón cancelar/eliminar */}</form>
    </Card>
  );
};
export default CancelarPago;
