import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';

import Button from '../../../Resuables/Button/Button';

const WarningToCreateClient = () => {
  const navigate = useNavigate();

  // Navigate to create client role
  const gotoRoleCreationPage = () => {
    navigate('/others/role');
  };
  return (
    <Result
      status="warning"
      title="Client Role needs to be created first."
      subTitle="To create client role, click the button below. It will take you to role creation page."
      extra={
        <div className="flex justify-center">
          <Button onClick={gotoRoleCreationPage} key="role">
            Create Client Role
          </Button>
        </div>
      }
    />
  );
};

export default WarningToCreateClient;
