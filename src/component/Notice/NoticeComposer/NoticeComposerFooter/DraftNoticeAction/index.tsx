import { Button } from 'antd';
import { useFormikContext } from 'formik';

import { NoticeSchemaType } from '../../../../../schema/NoticeSchema';
import { NOTICE_STATUS_TYPE } from '../../../../../types';

interface props {
  onSubmit: (status: NOTICE_STATUS_TYPE) => void;
}

const DraftNoticeAction: React.FC<props> = ({ onSubmit }) => {
  const { isSubmitting } = useFormikContext<NoticeSchemaType>();

  return (
    <Button
      onClick={() => onSubmit('DRAFT')}
      loading={isSubmitting}
      type="default"
      size="large"
      className=" text-black-1"
    >
      Save As Draft
    </Button>
  );
};

export default DraftNoticeAction;
