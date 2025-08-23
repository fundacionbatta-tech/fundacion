import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import '../../../styles/dashboard.css';
import { Sidebar } from '@/components/dashboard/layout/sidebar';
import { SidebarUserInfo } from '@/components/dashboard/layout/sidebar-user-info';

import { MobileSidebar } from '@/components/dashboard/layout/mobile-sidebar';

interface Props {
  children: ReactNode;
}

export function DashboardLayout({ children }: Props) {
  return (
  <div className="min-h-screen w-full relative overflow-hidden dashboard-bg grid md:grid-cols-[15%_85%]">
      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <MobileSidebar />
      </div>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col gap-2 dashboard-sidebar-bg border-r h-full min-h-screen">
        <div className="flex flex-col items-center pt-8 pl-6 pb-10 relative">
          <Link href="/" className="flex items-center gap-2 font-semibold dashboard-logo-text">
            <Image src={'/assets/icons/logo/aeroedit-logo-icon.svg'} alt={'AeroEdit'} width={41} height={41} />
          </Link>
        </div>
        <div className="flex flex-col grow">
          <Sidebar />
          <SidebarUserInfo />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-col dashboard-main-content transition-all duration-300 z-10" style={{ minHeight: '100vh' }}>
        <div className="block md:hidden h-4" />
        {children}
      </div>
    </div>
  );
}
