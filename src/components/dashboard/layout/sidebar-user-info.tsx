'use client';

import { Separator } from '@/components/ui/separator';
import { LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { MouseEvent } from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';

export function SidebarUserInfo() {
  const supabase = createClient();
  const { user } = useUserInfo(supabase);

  async function handleLogout(e: MouseEvent) {
    e.preventDefault();
    await supabase.auth.signOut();
    location.reload();
  }

  return (
    <div className={'flex flex-col items-start pb-8 px-2 text-sm font-medium lg:px-4 dashboard-sidebar-bg'}>
  <Separator className={'dashboard-separator mt-6'} />
      <div className={'flex w-full flex-row mt-6 items-center justify-between'}>
        <div className={'flex flex-col items-start justify-center overflow-hidden text-ellipsis'}>
          <div className={'text-sm leading-5 font-semibold w-full overflow-hidden text-ellipsis dashboard-sidebar-user-text'}>
            {user?.user_metadata?.full_name}
          </div>
          <div className={'text-sm leading-5 w-full overflow-hidden text-ellipsis dashboard-sidebar-user-desc'}>
            {user?.email}
          </div>
        </div>
        <div>
          <LogOut onClick={handleLogout} className={'h-6 w-6 dashboard-sidebar-user-desc cursor-pointer'} />
        </div>
      </div>
    </div>
  );
}
