import { Dropdown, DropdownProps, MenuProps } from 'antd';
import React from 'react';

interface DropDownForTableProps {
  items: MenuProps['items'];
  placement?: DropdownProps['placement'];
}

const DropDownForTable: React.FC<DropDownForTableProps> = ({
  items,
  placement = 'bottomLeft',
}) => {
  return (
    <Dropdown
      className="min-w-fit"
      menu={{ items }}
      trigger={['click']}
      placement={placement}
      autoAdjustOverflow
      arrow
    >
      <button className="font-bold">...</button>
    </Dropdown>
  );
};

export default DropDownForTable;
