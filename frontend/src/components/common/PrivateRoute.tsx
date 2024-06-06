import { User } from '@/lib/store';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRoute({ children, user }: {
    children: ReactNode, user: User
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return children;
}

export default PrivateRoute;