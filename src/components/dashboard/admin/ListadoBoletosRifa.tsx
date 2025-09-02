import React from 'react';
import { Card } from '../../ui/card';
import { Table } from '../../ui/table';

const ListadoBoletosRifa: React.FC = () => {
  // ...lógica y estado con hook
  return (
    <Card>
      <h2>Listado General de Boletos de la Rifa</h2>
      <Table>{/* boletos, pagos, estado */}</Table>
    </Card>
  );
};
export default ListadoBoletosRifa;
