import React from 'react';

interface props {
  label: string;
  value: number;
}

const LifetimeIncomeCard: React.FC<props> = ({ label, value }) => {
  return (
    <div className="w-full bg-black-1 bg-opacity-5 p-4 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">{label}</h2>
      <span className="text-4xl font-bold text-green-1">BDT {value}</span>
    </div>
  );
};

export default LifetimeIncomeCard;
