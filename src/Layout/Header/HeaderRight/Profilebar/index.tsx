import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';

import { getS3BaseUrl } from '../../../../helpers/configs/envConfig';
import useAuthStore from '../../../../store/authStore';
import useSidebarStore from '../../../../store/sidebarStore/sidebarStore';

export default function Profilebar() {
  const { userProfileData, logout } = useAuthStore();
  const { isDropdownSmClicked, setDropdownSmClicked } = useSidebarStore();

  const handlCloseSidebarSm = () => {
    setDropdownSmClicked(false);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      onClick: handlCloseSidebarSm,
      label: (
        <Link to={'/user-profile'} className="text-center w-full">
          <Button
            type="primary"
            block
            className="uppercase text-black-1 font-bold border-black-1 border-opacity-10"
          >
            Go to profile
          </Button>
        </Link>
      ),
    },
    {
      key: '2',
      onClick: handlCloseSidebarSm,
      label: (
        <Link to={'/reset-password'} className="text-center">
          <Button
            type="primary"
            block
            className="uppercase text-black-1 font-bold border-black-1 border-opacity-10"
          >
            Reset Password
          </Button>
        </Link>
      ),
    },
    {
      key: '3',
      onClick: logout,
      label: (
        <Button
          type="default"
          block
          className="flex justify-center items-center bg-brand-grad-1 font-bold text-white-1"
        >
          Logout
        </Button>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['hover']} placement="bottomLeft" arrow>
      <button>
        <div className="flex items-center">
          <div className="flex items-center">
            {userProfileData && userProfileData.profile_picture && (
              <Avatar
                src={`${getS3BaseUrl()}${userProfileData.profile_picture}`}
                size="large"
              />
            )}
            {userProfileData && !userProfileData.profile_picture && (
              <Avatar
                className="bg-primary"
                style={{ verticalAlign: 'middle', fontSize: '20px' }}
                size="large"
              >
                {userProfileData.first_name[0]}
              </Avatar>
            )}
          </div>
          {isDropdownSmClicked && (
            <p className="text-white-1 ml-5">{userProfileData?.first_name}</p>
          )}
        </div>
      </button>
    </Dropdown>
  );
}
