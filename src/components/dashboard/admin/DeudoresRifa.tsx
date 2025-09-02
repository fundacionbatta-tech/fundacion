import React from 'react';
import { Card } from '../../ui/card';
import { Table } from '../../ui/table';

const DeudoresRifa: React.FC = () => {
  // ...lógica y estado con hook
  return (
    <Card>
      <h2>Deudores de la Rifa</h2>
      <Table>{/* lista de deudores */}</Table>
    </Card>
  );
};
export default DeudoresRifa;
