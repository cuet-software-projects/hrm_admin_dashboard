import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps } from 'antd';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useSidebarStore from '../../store/sidebarStore/sidebarStore';
import SidebarTitle from './Title';

const { Sider } = Layout;

interface props {
  menuItems: MenuProps['items'];
}

const SidebarLg: React.FC<props> = ({ menuItems }) => {
  const {
    setDropdownSmClicked,
    showSmallNav,
    setShowSmallNav,
    collapsed,
    setCollapsed,
    selectedKeys,
    setSelectedKeys,
    openKeys,
    setOpenKeys,
    handleMenuItemSelect,
    handleOpenSubMenu,
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
    <Sider
      hidden={showSmallNav}
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      width={256}
      collapsedWidth={144}
      onBreakpoint={(broken) => {
        setShowSmallNav(broken);
        setDropdownSmClicked(false);
        setCollapsed(false);
      }}
    >
      <Layout className="overflow-y-auto h-screen bg-black-1">
        <Link to={'/dashboard'}>
          <div className="flex justify-center items-center font-semibold text-xl py-10">
            {!collapsed ? (
              <SidebarTitle companyName={'Diligite'} productName={'HRM'} />
            ) : (
              <SidebarTitle companyName={'D'} productName={'HRM'} />
            )}
          </div>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={handleMenuItemSelect}
          openKeys={openKeys}
          onOpenChange={handleOpenSubMenu}
          items={menuItems}
          className={`${
            collapsed ? 'w-20' : 'w-44'
          } mx-auto flex flex-col bg-black-1 mb-10`}
        />
      </Layout>
      <Button
        className="absolute -right-[20px] top-1/2 z-12 bg-gradient-to-r from-brand-grad-1 to-brand-grad-2 rounded-full p-2 text-secondary-2 flex justify-center items-center"
        type="text"
        icon={
          collapsed ? <RightOutlined rev={undefined} /> : <LeftOutlined rev={undefined} />
        }
        onClick={() => setCollapsed(!collapsed)}
        style={{
          width: 40,
          height: 40,
        }}
      />
    </Sider>
  );
};

export default SidebarLg;
