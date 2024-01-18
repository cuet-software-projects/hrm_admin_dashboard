import React from 'react';

import { userRoles } from '../../constants/GlobalConstants';
import useAuthStore from '../../store/authStore';
import AdminDashboardPage from './AdminDashboard';
import UserDashboardPage from './UserDashboard';

const DashboardPage: React.FC = () => {
  const { role } = useAuthStore();
  if (role === userRoles.admin || role === userRoles.manager) {
    return <AdminDashboardPage />;
  }
  return <UserDashboardPage />;
};

export default DashboardPage;
