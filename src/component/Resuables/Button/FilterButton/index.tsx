import { Button, Checkbox, Dropdown, MenuProps } from 'antd';

import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import Icon from '../../Icon/Icon';

export default function FilterButton() {
  // Data from stores
  const { stickyColumn, toggleStickyColumn } = useTableConfigStore();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Checkbox
          checked={stickyColumn === 'left'}
          onChange={() => toggleStickyColumn('left')}
        >
          Left Column Fixed
        </Checkbox>
      ),
    },
    {
      key: '2',
      label: (
        <Checkbox
          checked={stickyColumn === 'right'}
          onChange={() => toggleStickyColumn('right')}
        >
          Right Column Fixed
        </Checkbox>
      ),
    },
    {
      key: '3',
      label: (
        <Checkbox
          checked={stickyColumn === undefined}
          onChange={() => toggleStickyColumn(undefined)}
        >
          Dont fixed
        </Checkbox>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomLeft" trigger={['click']}>
      <Button size="middle" shape="default" className="w-[40px] h-[40px] p-2">
        <Icon name="ic_tablemenu" />
      </Button>
    </Dropdown>
  );
}
