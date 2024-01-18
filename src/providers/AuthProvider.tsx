import { Flex, Result } from 'antd';
import React, { ReactNode, useEffect } from 'react';

import Button from '../component/Resuables/Button/Button';
import Loading from '../component/Resuables/Loader';
import { userRoles } from '../constants/GlobalConstants';
import { useGetLoggedInUserDetails } from '../customHooks/users/useGetLoggedInUserDetails';
import useAuthStore from '../store/authStore';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { role, setRole, setUserProfileData, logout } = useAuthStore();
  const { data, isLoading, error } = useGetLoggedInUserDetails();

  useEffect(() => {
    if (data) {
      setUserProfileData(data);
    }
    if (role.length === 0) {
      if (data && data.roles) {
        if (data.roles.length > 0) {
          setRole(data.roles[0]?.name);
          localStorage.setItem('role', JSON.stringify(data.roles[0]?.name));
        } else {
          setRole(userRoles.user);
          localStorage.setItem('role', JSON.stringify(userRoles.user));
        }
      }
    }
    if (data && data.roles && (role === userRoles.admin || role === userRoles.manager)) {
      if (data.roles.map((item) => item.name).includes(role)) {
        return;
      } else {
        logout();
      }
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Flex className="h-screen" align="center" justify="center">
        <Result
          status="500"
          title="An Error Occurred"
          subTitle="Try to reload. If it does not work, contact administration."
          extra={
            <Flex justify="center">
              <Button className="text-center" key="logout" onClick={logout}>
                Logout
              </Button>
            </Flex>
          }
        />
      </Flex>
    );
  }
  return <>{children}</>;
};

export default AuthProvider;
