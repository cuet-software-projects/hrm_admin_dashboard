import { useRoutes } from 'react-router';

import { Utils } from '../helpers/utility';
import useAuthStore from '../store/authStore';
import { authorizedRoutes, unauthorizedRoutes } from './router';

export default function AppRouter() {
  const { role, isLoggedIn } = useAuthStore();
  const content = isLoggedIn
    ? useRoutes(Utils.filterRoutes(authorizedRoutes, role))
    : useRoutes(unauthorizedRoutes);

  return <>{content}</>;
}
