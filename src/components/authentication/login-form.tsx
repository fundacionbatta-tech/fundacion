'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { login, loginAnonymously } from '@/app/login/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticationForm } from '@/components/authentication/authentication-form';
import './authentication.css';

import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

export function LoginForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const data = await login({ email, password });
    if (data?.error) {
      toast({ description: 'Invalid email or password', variant: 'destructive' });
    } else {
      router.push('/dashboard');
    }
  }

  async function handleAnonymousLogin() {
    const data = await loginAnonymously();
    if (data?.error) {
      toast({ description: 'Something went wrong. Please try again', variant: 'destructive' });
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div className="form-bg-blue">
      <form className="form-card" onSubmit={handleLogin}>
        <Image src={'/logo.png'} alt={'Fundación Batta'} width={56} height={56} />
        <div className="form-title">Iniciar sesión</div>
        <AuthenticationForm
          email={email}
          onEmailChange={setEmail}
          password={password}
          onPasswordChange={setPassword}
        />
        <Button type={'submit'} className="form-btn-primary">
          Ingresar
        </Button>
        <div className="form-link-row">
          ¿No tienes cuenta?{' '}
          <a href={'/signup'} className="form-link">
            Regístrate
          </a>
        </div>
      </form>
    </div>
  );
}
