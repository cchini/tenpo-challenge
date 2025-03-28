import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { identity } from '@tenpo/services';
import { account$ } from '@tenpo/states';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    identity.login({ user: 'user@tenpo.cl', password: 'user1234' });
  };

  useEffect(() => {
    const accountSubscription = account$.subscribe(({ permissions }) => {
      if (permissions?.length > 0) navigate('/home/list');
    });
    return () => {
      accountSubscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <div>Login</div>
      <button onClick={handleLogin}>Handle Login</button>
    </div>
  );
}
