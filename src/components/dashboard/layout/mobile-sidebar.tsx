import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sidebar } from '@/components/dashboard/layout/sidebar';
import { SidebarAccordion } from '@/components/dashboard/layout/sidebar-accordion';
import { SidebarUserInfo } from '@/components/dashboard/layout/sidebar-user-info';

import { SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden dashboard-header-btn">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col dashboard-sidebar-bg w-full max-w-full"
        style={{ background: '#1E3A8A', minHeight: '100vh', boxShadow: '0 4px 24px 0 rgba(30,58,138,0.12)' }}
      >
        {/* Header y título para accesibilidad */}
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <div style={{ flex: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 120px)', paddingBottom: 16 }}>
          <SidebarAccordion />
        </div>
        <SidebarUserInfo />
      </SheetContent>
    </Sheet>
  );
}
