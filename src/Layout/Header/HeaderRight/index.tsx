// import { Link } from 'react-router-dom';

import SwitchRoleButton from '../SwitchRoleButton';
import Noticebar from './Noticebar';
import Profilebar from './Profilebar';

export default function HeaderRight() {
  return (
    <div className="flex items-center space-x-4">
      <SwitchRoleButton />
      <Noticebar />
      {/* <Link to="/notification-list">
        <Notificationbar />
      </Link> */}
      <Profilebar />
    </div>
  );
}
