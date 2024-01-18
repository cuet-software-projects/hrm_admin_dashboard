import React from 'react';

import { userRoles } from '../../../constants/GlobalConstants';
import useAuthStore from '../../../store/authStore';
import WarningToSwitchRole from '../../Resuables/WarningToSwitchRole';
import SalaryInfoCard from './SalaryBreakdownCards/SalaryInfoCard';
import SalaryStructureCard from './SalaryBreakdownCards/SalaryStructureCard';

const SalaryInfo: React.FC = () => {
  const { role } = useAuthStore();
  if (role === userRoles.user) {
    return (
      <div className="bg-white-1 px-4 lg:px-8 py-8 rounded-lg shadow mb-5 overflow-auto">
        <div className="flex flex-col md:flex-row flex-wrap justify-start space-y-10 md:space-y-0 md:space-x-5 lg:space-x-10">
          <SalaryInfoCard />
          <SalaryStructureCard />
        </div>
      </div>
    );
  }
  if (role === userRoles.admin || role === userRoles.manager) {
    return (
      <div className="bg-white-1 rounded-lg shadow">
        <WarningToSwitchRole
          subTitle={
            <>
              Change your role to user to see you salary info
              <br /> Please swich your role.
            </>
          }
        />
      </div>
    );
  }

  return <></>;
};

export default SalaryInfo;
