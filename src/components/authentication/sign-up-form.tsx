'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AuthenticationForm } from '@/components/authentication/authentication-form';
import './authentication.css';

import { signup } from '@/app/signup/actions';
import { useToast } from '@/components/ui/use-toast';

export function SignupForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignup() {
    signup({ email, password }).then((data) => {
      if (data?.error) {
        toast({ description: 'Something went wrong. Please try again', variant: 'destructive' });
      }
    });
  }

  return (
    <div className="form-bg-blue">
      <form className="form-card">
        <Image src={'/logo.png'} alt={'Fundación Batta'} width={56} height={56} />
        <div className="form-title">Crear cuenta</div>
        <AuthenticationForm
          email={email}
          onEmailChange={setEmail}
          password={password}
          onPasswordChange={setPassword}
        />
        <Button formAction={handleSignup} type={'submit'} className="form-btn-primary">
          Registrarse
        </Button>
        <div className="form-link-row">
          ¿Ya tienes cuenta?{' '}
          <a href={'/login'} className="form-link">
            Ingresar
          </a>
        </div>
      </form>
    </div>
  );
}
