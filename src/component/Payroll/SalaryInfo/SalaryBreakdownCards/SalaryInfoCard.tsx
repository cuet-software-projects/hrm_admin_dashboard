import React from 'react';

import { utils } from '../../../../helpers/utility';
import useAuthStore from '../../../../store/authStore';

const SalaryInfoCard: React.FC = () => {
  const { userProfileData } = useAuthStore();
  const salaryInfo = utils.getSalaryBreakdown(
    userProfileData?.current_employment_info?.current_salary ?? 0,
  );
  return (
    <div className="min-w-[350px] bg-white shadow-md p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4 stylishHeaderText">Salary Information</h2>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(salaryInfo).map(([label, amount], index) => (
          <div
            className={`flex justify-between ${
              index !== Object.entries(salaryInfo).length - 1
                ? 'border-b-2 border-b-black-1 border-opacity-20'
                : ''
            } pb-2`}
            key={index}
          >
            <span className={'text-[#2D3748]'}>{label}</span>
            <span className="text-[#38A169] font-bold">{amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryInfoCard;
