import { MinusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import useNoticeStore from '../../../../../store/noticeStore';

const NoticeMinimizedModeButton = () => {
  const { handleSelectSizingMode: handleOpenNoticeAtSpecificMode } = useNoticeStore();

  const handleOpen = () => {
    handleOpenNoticeAtSpecificMode('minimized');
  };

  return <Button onClick={handleOpen} type="text" icon={<MinusOutlined rev={''} />} />;
};

export default NoticeMinimizedModeButton;
