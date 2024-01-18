import UserDashboard from '../../../component/Dashboard/UserDashboard';
import WelcomeTourModal from '../../../component/VisualizationComponents/Modals/WelcomeTourModal';
import useWelcomeTourStore from '../../../store/welcomeTourStore/welcomeTourStore';
import PinnedNotice from './PinnedNotice';

const UserDashboardPage = () => {
  const { showWelcomeTourModal } = useWelcomeTourStore();

  return (
    <div>
      <PinnedNotice />
      <UserDashboard />
      {localStorage && !localStorage.getItem('welcome-tour-store') && (
        <WelcomeTourModal />
      )}
      {localStorage &&
        localStorage.getItem('welcome-tour-store') &&
        showWelcomeTourModal && <WelcomeTourModal />}
    </div>
  );
};

export default UserDashboardPage;
