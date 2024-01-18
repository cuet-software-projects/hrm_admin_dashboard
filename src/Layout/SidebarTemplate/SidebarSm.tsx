import { Layout, Menu, MenuProps } from 'antd';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Text from '../../component/Resuables/Text';
import { facebookLink, linkedinLink } from '../../constants/GlobalConstants';
import useSidebarStore from '../../store/sidebarStore/sidebarStore';
import Profilebar from '../Header/HeaderRight/Profilebar';
import SwitchRoleButton from '../Header/SwitchRoleButton';
import CompanySocialMediaIcons from './CompanySocialMediaIcons';

interface props {
  menuItems: MenuProps['items'];
}

const SidebarSm: React.FC<props> = ({ menuItems }) => {
  const {
    setDropdownSmClicked,
    selectedKeys,
    setSelectedKeys,
    openKeys,
    setOpenKeys,
    handleOpenSubMenu,
    handleMenuItemSelect,
  } = useSidebarStore();

  // Getting current path
  const { pathname } = useLocation();
  const currentPathList = pathname.split('/');
  const currentPath = currentPathList[currentPathList.length - 1];

  useEffect(() => {
    setSelectedKeys([currentPath]);
    setOpenKeys([currentPathList[1]]);
  }, [pathname]);

  return (
    <Layout className="absolute inset-0 mt-16 z-50 h-fit">
      <div className="bg-black-1 w-screen flex flex-col items-center min-h-screen space-y-10 py-10">
        <SwitchRoleButton />
        <Menu
          theme="dark"
          mode="inline"
          onClick={() => setDropdownSmClicked(false)}
          selectedKeys={selectedKeys}
          onSelect={handleMenuItemSelect}
          openKeys={openKeys}
          onOpenChange={handleOpenSubMenu}
          items={menuItems}
          rootClassName="bg-black-1 h-fit"
          className="text-sm"
          style={{ width: '200px', fontSize: '14px', padding: '10px' }}
        />
        <div className="border-brand-grad-1 border-2 border-dashed p-2 w-44 rounded-lg flex justify-center">
          <Profilebar />
        </div>
        <div className="w-[50%] flex flex-col items-center space-y-5">
          <div className="text-xl">
            <Text title={'Contact Us'} fontWeight={'semibold'} color={'white-1'} />
            <div className="border-2 border-dashed border-grey-1" />
          </div>
          <div className="flex items-center justify-start space-x-4">
            <Link to={facebookLink} target="_blank" rel="noopener noreferrer">
              <CompanySocialMediaIcons title="ic_facebookSm" />
            </Link>
            <Link to={linkedinLink} target="_blank" rel="noopener noreferrer">
              <CompanySocialMediaIcons title="ic_linkedInSm" />
            </Link>
            <CompanySocialMediaIcons title="ic_twitterSm" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SidebarSm;
