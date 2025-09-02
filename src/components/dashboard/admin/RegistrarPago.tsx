import React from 'react';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

const RegistrarPago: React.FC = () => {
  // ...lógica y estado con hook
  return (
    <Card>
      <h2>Registrar Pago Manual</h2>
      <form>{/* inputs para boleto, monto, método, referencia, botón registrar */}</form>
    </Card>
  );
};
export default RegistrarPago;
