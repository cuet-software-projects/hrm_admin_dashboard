import { Flex, Result } from 'antd';

import useAuthStore from '../../../store/authStore';
import Button from '../Button/Button';

const NotAnEmployee = () => {
  const { logout } = useAuthStore();

  return (
    <Flex className="" align="center" justify="center">
      <Result
        status="500"
        title="An Error Occurred"
        subTitle="You are not an employee and for this you can not use this module. Please contact
          admin."
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
};

export default NotAnEmployee;
