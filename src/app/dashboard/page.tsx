'use client'

import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';

import { CuotasTable } from '@/components/cuotas/CuotasTable';

export default function LandingPage() {
  return (
    <main className="dashboard-bg min-h-screen flex flex-col gap-6 p-4 lg:p-12">
      <DashboardPageHeader pageTitle="Dashboard" subtitle="Panel de administración de cuotas y aptos" />
      <section className="dashboard-main-content">
        <CuotasTable />
      </section>
    </main>
  );
}
