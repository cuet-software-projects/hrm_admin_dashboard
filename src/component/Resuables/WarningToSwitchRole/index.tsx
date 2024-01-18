import { Result } from 'antd';

import SwitchRoleButton from '../../../Layout/Header/SwitchRoleButton';
import useAuthStore from '../../../store/authStore';

interface props {
  subTitle: JSX.Element;
}

const WarningToSwitchRole: React.FC<props> = ({ subTitle }) => {
  const { role } = useAuthStore();

  return (
    <div className="flex flex-col items-start w-fit mx-auto">
      <Result
        status="info"
        title={`Your current role is ${role}.`}
        subTitle={subTitle}
        extra={
          <div className="flex justify-center">
            <SwitchRoleButton />
          </div>
        }
      />
    </div>
  );
};

export default WarningToSwitchRole;
