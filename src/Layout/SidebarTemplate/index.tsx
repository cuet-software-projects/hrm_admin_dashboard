import './SidebarTemplate.css';

import { Layout, MenuProps, theme } from 'antd';
import React, { useMemo } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

import Icon from '../../component/Resuables/Icon/Icon';
import { Utils } from '../../helpers/utility';
import { authorizedRoutes } from '../../router/router';
import useAuthStore from '../../store/authStore';
import useSidebarStore from '../../store/sidebarStore/sidebarStore';
import { IRoutes } from '../../types/route.type';
import BreadCrumbs from '../Breadcrumbs';
import Header from '../Header';
import HeaderSm from '../Header/HeaderSm';
import SidebarLg from './SidebarLg';
import SidebarSm from './SidebarSm';

const { Header: AntdHeader, Content } = Layout;

const SidebarTemplate: React.FC = () => {
  // Getting the state variables from zustand store
  const { isDropdownSmClicked, showSmallNav, collapsed } = useSidebarStore();

  // Getting the current role of user
  const { role } = useAuthStore();

  // This is for theme settings
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Getting the route items to show
  const routeItems: IRoutes[] = useMemo<IRoutes[]>(() => {
    return Utils.filterRoutes(authorizedRoutes, role);
  }, [role]);

  // Final menu items of the sidebar
  const menuItems: MenuProps['items'] = useMemo<MenuProps['items']>(() => {
    return routeItems
      .filter((routeItem) => routeItem.navTitle && routeItem.showNabBlock)
      .map((routeItem) => {
        let hasChild = false;
        if (
          routeItem.children &&
          routeItem.children?.filter((childItem) => childItem.navTitle).length > 0
        ) {
          hasChild = true;
        }
        return {
          key: routeItem.path,
          title: routeItem.navTitle,
          label: (
            <Link to={`/${routeItem.path}`} className="flex items-center space-x-2">
              <Icon name={`${routeItem.icon}`} color="white" size={32} />
              {!collapsed && <span>{routeItem.navTitle}</span>}
            </Link>
          ),
          children: hasChild
            ? routeItem.children
                ?.filter((childItem) => childItem.navTitle)
                .map((childItem) => {
                  return {
                    key: `${childItem.path}`,
                    icon: <Icon name={`${childItem.icon}`} color="white" size={32} />,
                    label: (
                      <Link to={`/${routeItem.path}/${childItem.path}`}>
                        <span>{childItem.navTitle}</span>
                      </Link>
                    ),
                  };
                })
            : null,
        };
      });
  }, [role, collapsed]);

  return (
    <Layout className="w-screen h-screen overflow-hidden">
      {/* Large screen sider */}
      <SidebarLg menuItems={menuItems} />
      {/* Small screen sider */}
      {isDropdownSmClicked && <SidebarSm menuItems={menuItems} />}

      {/* Header */}
      <Layout>
        <AntdHeader
          className={`flex items-center ${
            showSmallNav ? 'px-0' : 'px-2'
          } border-b-2 border-black-1 border-opacity-5`}
          style={{ background: colorBgContainer }}
        >
          {showSmallNav && <HeaderSm />}
          {!showSmallNav && <Header />}
        </AntdHeader>

        {/* Main Content */}
        <Content className="bg-[#FFF9F5] overflow-y-auto pb-10 px-2 lg:px-8">
          <BreadCrumbs />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarTemplate;
