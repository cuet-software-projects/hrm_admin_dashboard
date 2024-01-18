import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import useNoticeStore from '../../../../../store/noticeStore';

const NoticeMaximizedModeButton = () => {
  const { sizingMode: openMode, handleSelectSizingMode: handleOpenNoticeAtSpecificMode } =
    useNoticeStore();

  const handleOpen = () => {
    if (openMode === 'maximized') {
      handleOpenNoticeAtSpecificMode('default');
      return;
    }
    if (openMode === 'default') {
      handleOpenNoticeAtSpecificMode('maximized');
      return;
    }
  };

  if (openMode === 'maximized') {
    return (
      <Button
        onClick={handleOpen}
        type="text"
        icon={<FullscreenExitOutlined rev={''} />}
      />
    );
  }
  if (openMode === 'default') {
    return (
      <Button onClick={handleOpen} type="text" icon={<FullscreenOutlined rev={''} />} />
    );
  }
  return <></>;
};

export default NoticeMaximizedModeButton;
