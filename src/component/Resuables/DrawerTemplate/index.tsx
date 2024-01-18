import { Drawer } from 'antd';
import React from 'react';

import useDrawerStore from '../../../store/drawerStore';
import GlobalCrossButton from '../GlobalCrossButton';
import Text from '../Text';

type Props = {
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
};

export default function DrawerTemplate({ onClose, children, title }: Props) {
  const { drawerOpen } = useDrawerStore();
  return (
    <Drawer
      placement="right"
      maskClosable={false}
      open={drawerOpen}
      width={500}
      onClose={onClose}
      closeIcon={null}
      title={
        <div className="flex items-center justify-between">
          <Text className="text-brand-grad-1 font-bold">{title}</Text>
          <GlobalCrossButton id="template-close-btn" onClick={onClose} />
        </div>
      }
      classNames={{
        header: 'bg-brand-grad-1 bg-opacity-30 border-b-5',
      }}
    >
      {children}
    </Drawer>
  );
}
