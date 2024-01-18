import { userRoles } from '../../constants/GlobalConstants';
import useAuthStore from '../../store/authStore';
import PayrollInfoForAdmin from './PayrollSummary/PayrollInfoForAdmin';
import PayrollInfoForUser from './PayrollSummary/PayrollInfoForUser';

const Payroll = () => {
  const { role } = useAuthStore();
  return (
    <div className="bg-white-1 px-4 lg:px-8 py-8 rounded-lg shadow mb-5">
      {(role === userRoles.admin || role === userRoles.manager) && (
        <PayrollInfoForAdmin />
      )}
      {role === userRoles.user && <PayrollInfoForUser />}
    </div>
  );
};

export default Payroll;
