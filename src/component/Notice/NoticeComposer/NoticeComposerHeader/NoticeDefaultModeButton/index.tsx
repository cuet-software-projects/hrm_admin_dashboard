import { UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import useNoticeStore from '../../../../../store/noticeStore';

const NoticeDefaultModeButton = () => {
  const { handleSelectSizingMode: handleOpenNoticeAtSpecificMode } = useNoticeStore();

  const handleOpen = () => {
    handleOpenNoticeAtSpecificMode('default');
  };

  return <Button onClick={handleOpen} type="text" icon={<UpOutlined rev={''} />} />;
};

export default NoticeDefaultModeButton;
