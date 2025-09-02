'use client';

import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';

import { CuotasTable } from '@/components/cuotas/CuotasTable';
import BoletosPorCedula from '@/components/dashboard/admin/BoletosPorCedula';
import RegistrarPago from '@/components/dashboard/admin/RegistrarPago';
import HistorialPagosBoleto from '@/components/dashboard/admin/HistorialPagosBoleto';
import ListadoBoletosRifa from '@/components/dashboard/admin/ListadoBoletosRifa';
import DeudoresRifa from '@/components/dashboard/admin/DeudoresRifa';
import CancelarPago from '@/components/dashboard/admin/CancelarPago';
import ReporteIngresosRifa from '@/components/dashboard/admin/ReporteIngresosRifa';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function LandingPage() {
  return (
    <main className="dashboard-bg min-h-screen flex flex-col gap-4 p-2 sm:p-4 lg:p-12">
      <DashboardPageHeader pageTitle="Dashboard" subtitle="Panel de administración de cuotas y aptos" />
      <section className="dashboard-main-content w-full max-w-6xl mx-auto">
        <Tabs defaultValue="cuotas" className="w-full">
          <div className="w-full mt-4">
            <TabsContent value="cuotas" className="w-full">
              <CuotasTable />
            </TabsContent>
            <TabsContent value="boletos-cedula" className="w-full">
              <BoletosPorCedula />
            </TabsContent>
            <TabsContent value="registrar-pago" className="w-full">
              <RegistrarPago />
            </TabsContent>
            <TabsContent value="historial-pagos" className="w-full">
              <HistorialPagosBoleto />
            </TabsContent>
            <TabsContent value="boletos-rifa" className="w-full">
              <ListadoBoletosRifa />
            </TabsContent>
            <TabsContent value="deudores" className="w-full">
              <DeudoresRifa />
            </TabsContent>
            <TabsContent value="cancelar-pago" className="w-full">
              <CancelarPago />
            </TabsContent>
            <TabsContent value="reporte-ingresos" className="w-full">
              <ReporteIngresosRifa />
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </main>
  );
}
