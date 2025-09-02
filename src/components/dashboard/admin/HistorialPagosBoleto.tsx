import React from 'react';
import { Card } from '../../ui/card';
import { Table } from '../../ui/table';

const HistorialPagosBoleto: React.FC = () => {
  // ...lógica y estado con hook
  return (
    <Card>
      <h2>Historial de Pagos del Boleto</h2>
      <Table>{/* pagos y saldo */}</Table>
    </Card>
  );
};
export default HistorialPagosBoleto;
