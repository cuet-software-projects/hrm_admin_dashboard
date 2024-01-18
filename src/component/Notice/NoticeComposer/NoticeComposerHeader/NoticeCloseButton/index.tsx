import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import useNoticeStore from '../../../../../store/noticeStore';

const NoticeCloseButton = () => {
  const { handleNoticeClose } = useNoticeStore();

  return (
    <Button onClick={handleNoticeClose} type="text" icon={<CloseOutlined rev={''} />} />
  );
};

export default NoticeCloseButton;
