import React from 'react';

import { salaryStructure } from '../../../../constants/GlobalConstants';

const SalaryStructureCard: React.FC = () => {
  const salaryStructureObj = [
    { Basic: `${salaryStructure.basic}%` },
    { 'House Rent': `${salaryStructure.houserRent}%` },
    { Medical: `${salaryStructure.medical}%` },
    { Convenience: `${salaryStructure.convenience} %` },
  ];
  return (
    <div className="min-w-[300px] bg-white shadow-md p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4 stylishHeaderText">Salary Structure</h2>
      <div className="space-y-4">
        <div className="space-y-4">
          {salaryStructureObj.map((item, index) => (
            <div
              className={`flex justify-between items-center ${
                index !== salaryStructureObj.length - 1
                  ? 'border-b-2 border-b-black-1 border-opacity-20'
                  : ''
              } pb-2`}
              key={index}
            >
              <span className="text-black-1">{Object.keys(item)[0]}</span>
              <span className="text-brand-grad-1 text-opacity-80 font-bold">
                {Object.values(item)[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalaryStructureCard;
