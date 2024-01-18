// import './style.css';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Card, Carousel } from 'antd';
import React from 'react';

import { IPayrollOverviewForEmployee } from '../../../../types/payroll.type';
import LifetimeIncomeCard from './LifetimeIncomeCard';

const LifetimeIncomeInfo: React.FC<Partial<IPayrollOverviewForEmployee>> = ({
  lifeTimeIncome,
  lifeTimeBonus,
}) => {
  return (
    <div className="lifetime-income-info">
      <div className="hidden md:flex md:flex-col md:space-y-5 md:w-full">
        <LifetimeIncomeCard label={'Lifetime Income'} value={lifeTimeIncome ?? 0} />
        <LifetimeIncomeCard label={'Lifetime Bonus'} value={lifeTimeBonus ?? 0} />
      </div>
      <div className="md:hidden w-full">
        <Carousel
          arrows
          prevArrow={<LeftOutlined rev={''} />}
          nextArrow={<RightOutlined rev={''} />}
          dots={false}
          autoplay={false}
        >
          <div>
            <Card>
              <LifetimeIncomeCard label={'Lifetime Income'} value={lifeTimeIncome ?? 0} />
            </Card>
          </div>
          <div>
            <Card>
              <LifetimeIncomeCard label={'Lifetime Bonus'} value={lifeTimeBonus ?? 0} />
            </Card>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default LifetimeIncomeInfo;
