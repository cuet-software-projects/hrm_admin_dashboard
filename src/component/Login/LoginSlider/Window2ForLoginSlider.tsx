import React from 'react';

import Image2ForSlider from '../../../assets/images/login_welcome2.png';
import Image from '../../Resuables/Image';
import Text from '../../Resuables/Text';

const Window2ForLoginSlider: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src={Image2ForSlider} alt="slider1" preview={false} />
      <Text className="text-white-1 mt-8 text-center" size="3xl" fontWeight="bold">
        Elevate Workplace Efficiency <br />
        with Our HRM Solution
      </Text>
      <Text
        className="text-secondary-2 mt-8 font-poppins text-base leading-6 text-center"
        size="sm"
        fontWeight="normal"
      >
        Simplify your HR processes with our comprehensive software.
        <br /> Effortlessly streamline HR tasks and enhance productivity.
      </Text>
    </div>
  );
};

export default Window2ForLoginSlider;
