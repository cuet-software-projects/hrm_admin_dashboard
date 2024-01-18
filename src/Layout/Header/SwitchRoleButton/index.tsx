import { Dropdown } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { useMemo } from 'react';

import Icon from '../../../component/Resuables/Icon/Icon';
import useAuthStore from '../../../store/authStore';

const SwitchRoleButton = () => {
  const { role, setRole, userProfileData } = useAuthStore();

  const handleOptionClick = (value: string) => {
    setRole(value);
    localStorage.setItem('role', JSON.stringify(value));
  };

  const userRoles = useMemo(() => {
    return userProfileData?.roles ?? [];
  }, [userProfileData?.roles]);

  const hasAnyRole = useMemo(() => {
    return userProfileData?.roles && userProfileData?.roles?.length > 1;
  }, [userProfileData?.roles]);

  if (!hasAnyRole) {
    return null;
  }

  const items: MenuProps['items'] = userRoles.map((userRoleItem) => ({
    key: userRoleItem.name,
    label: userRoleItem.name,
  }));

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultValue: role,
        onClick: (item) => handleOptionClick(item.key),
      }}
      className="h-[50px]"
    >
      <button className="w-fit flex items-center justify-between p-3 order-none outline-none text-white-1 cursor-pointer bg-gradient-to-br from-brand-grad-1 to-brand-grad-2 rounded-lg">
        <span className="mr-3 capitalize">{role}</span>
        <span className="text-xs text-white-1">
          <span className="text-xs text-white-1">
            <Icon name="ic_change" color="white" size={15} />
          </span>
        </span>
      </button>
    </Dropdown>
  );
};

export default SwitchRoleButton;
