import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type Props = {
  user?: User | null;
};

export default function Header({ user }: Props) {
  return (
    <nav style={{ background: '#1E3A8A' }}>
      <div className="mx-auto max-w-7xl relative px-[32px] py-[18px] flex items-center justify-between" style={{ color: '#fff' }}>
        <div className="flex flex-1 items-center justify-start">
          <Link className="flex items-center" href={'/'}>
            <Image className="logo-topbar" src="/logo.svg" width={140} height={56} alt="Fundación Batta Logo" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <div className="flex space-x-6 items-center">
            <Link href="/" style={{ color: '#fff', fontWeight: 500, fontSize: '1rem', textDecoration: 'none' }}>Inicio</Link>
            <Link href="/nosotros" style={{ color: '#fff', fontWeight: 500, fontSize: '1rem', textDecoration: 'none' }}>Nosotros</Link>
            <Link href="/rifa-solidaria" style={{ color: '#fff', fontWeight: 500, fontSize: '1rem', textDecoration: 'none' }}>Rifa Solidaria</Link>
            <Button asChild={true} variant={'secondary'}>
              <Link
                href={'/login'}
                className="sign-in-btn"
              >
                Ingresar / Administradores
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
