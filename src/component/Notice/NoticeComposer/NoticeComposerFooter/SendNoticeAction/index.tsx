import { Button, Popconfirm } from 'antd';
import { useFormikContext } from 'formik';

import { NoticeSchemaType } from '../../../../../schema/NoticeSchema';
import { NOTICE_STATUS_TYPE } from '../../../../../types';

interface props {
  onSubmit: (status: NOTICE_STATUS_TYPE) => void;
}

const SendNoticeAction: React.FC<props> = ({ onSubmit }) => {
  const { isSubmitting } = useFormikContext<NoticeSchemaType>();

  const confirm = () => {
    onSubmit('SENT');
  };

  return (
    <Popconfirm
      title="Send the Notice"
      description="Are you sure to send this notice?"
      onConfirm={confirm}
      okText="Confirm"
      cancelText="No"
      okButtonProps={{ type: 'primary', className: 'bg-[#0b57d0] bg-opacity-80' }}
    >
      <Button
        loading={isSubmitting}
        shape="round"
        size="large"
        className="bg-[#0b57d0] text-white-1"
      >
        Send
      </Button>
    </Popconfirm>
  );
};

export default SendNoticeAction;
