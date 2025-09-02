import React from 'react';
import { Card } from '../../ui/card';
import { Table } from '../../ui/table';

const ReporteIngresosRifa: React.FC = () => {
  // ...lógica y estado con hook
  return (
    <Card>
      <h2>Reporte de Ingresos de la Rifa</h2>
      <Table>{/* resumen de ingresos */}</Table>
    </Card>
  );
};
export default ReporteIngresosRifa;
