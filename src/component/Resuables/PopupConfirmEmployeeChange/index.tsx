import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Checkbox, Popconfirm, Typography } from 'antd';

import { usePayrollStore } from '../../../store/payrollStore/payrollStore';

interface props {
  info?: string;
}

const PopupConfirmEmployeeChange: React.FC<props> = ({ info }) => {
  const { isConfirmEmployeeChange, setIsConfirmEmployeeChange } = usePayrollStore();
  return (
    <Popconfirm
      placement="left"
      title="Change the Employee"
      onConfirm={() => setIsConfirmEmployeeChange(true)}
      onCancel={() => setIsConfirmEmployeeChange(false)}
      okButtonProps={{ className: 'bg-blue' }}
      description={
        <Typography.Paragraph className="w-[250px]">
          Are you sure to change this employee? <br />
          {info}
        </Typography.Paragraph>
      }
      icon={<ExclamationCircleOutlined rev={''} style={{ color: 'red' }} />}
    >
      <Checkbox checked={isConfirmEmployeeChange} />
    </Popconfirm>
  );
};

export default PopupConfirmEmployeeChange;
