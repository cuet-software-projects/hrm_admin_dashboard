import { userRoles } from '../../constants/GlobalConstants';
import useAuthStore from '../../store/authStore';
import AdminFeedback from './AdminFeedback';
import UserFeedback from './UserFeedback';

const Feedback = () => {
  const { role } = useAuthStore();
  return (
    <div className="bg-white-1 px-4 lg:px-8 py-8 rounded-lg shadow mb-5">
      {/* for user */}
      {role === userRoles.user && <UserFeedback />}

      {/* For adming */}
      {(role === userRoles.admin || role === userRoles.manager) && <AdminFeedback />}
    </div>
  );
};

export default Feedback;
