import './Breadcrumbs.css';

import { RightOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from '../../component/Resuables/Button/Button';
import Text from '../../component/Resuables/Text';
import { userRoles } from '../../constants/GlobalConstants';
import useAuthStore from '../../store/authStore';
import useDrawerStore from '../../store/drawerStore';

const BreadCrumbs: React.FC = () => {
  const { role } = useAuthStore();
  const { handleDrawerOpen } = useDrawerStore();
  const { pathname } = useLocation();
  const pathNames = pathname.split('/').filter((x) => x);
  const showButton = [
    'attendance',
    'user',
    'branch',
    'role',
    'department',
    'designation',
    'social',
    'documents',
    'teams',
    'employee',
    'leave',
    role === userRoles.admin || role === userRoles.manager ? 'salary' : '',
    role === userRoles.admin || role === userRoles.manager ? 'bonus' : '',
  ].includes(pathNames[pathNames.length - 1]);

  return (
    <div className="breadcrumbs border border-grey-1 border-opacity-10 py-2 px-4 lg:p-4 bg-white-1 rounded-xl flex items-center justify-between my-5 lg:my-10">
      <Breadcrumb
        separator={
          <span>
            <RightOutlined rev={''} />
          </span>
        }
        items={pathNames.map((path, index) => {
          return index === pathNames.length - 1
            ? {
                title: <span>{path}</span>,
              }
            : {
                title: (
                  <Link to={index > 0 ? `/${pathNames[index - 1]}/${path}` : `/${path}`}>
                    {path}
                  </Link>
                ),
              };
        })}
      />
      {showButton && (
        <Button
          className="flex items-center capitalize"
          onClick={() => handleDrawerOpen('create')}
          id={`add-${pathNames[pathNames.length - 1]}`}
        >
          <Text size="xs" className="lg:text-sm">
            + add {pathNames[pathNames.length - 1]}
          </Text>
        </Button>
      )}
    </div>
  );
};

export default BreadCrumbs;
