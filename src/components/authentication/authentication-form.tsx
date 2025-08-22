import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FiMail, FiLock } from 'react-icons/fi';

import './authentication.css';

interface Props {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
}

export function AuthenticationForm({ email, onEmailChange, onPasswordChange, password }: Props) {
  return (
    <>
      <div className="form-group">
        <Label className="form-label" htmlFor="email">
          Email address
        </Label>
        <div className="input-icon-wrapper">
          <FiMail className="input-icon" />
          <Input
            className="form-input"
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <Label className="form-label" htmlFor="password">
          Password
        </Label>
        <div className="input-icon-wrapper">
          <FiLock className="input-icon" />
          <Input
            className="form-input"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
