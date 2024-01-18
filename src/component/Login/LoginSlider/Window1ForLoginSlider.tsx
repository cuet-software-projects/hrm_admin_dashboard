import React from 'react';

import Image1ForSlider from '../../../assets/images/login_welcome1.png';
import Image from '../../Resuables/Image';
import Text from '../../Resuables/Text';

const Window1ForLoginSlider: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src={Image1ForSlider} alt="slider1" preview={false} />
      <Text
        title="Welcome To Diligite"
        className="text-white-1 mt-8 text-center"
        size="3xl"
        fontWeight="bold"
      />
      <Text
        title="Explore our intuitive HR management tools."
        className="text-secondary-2 mt-8 font-poppins text-base leading-6 text-center"
        size="sm"
        fontWeight="normal"
      />
    </div>
  );
};

export default Window1ForLoginSlider;
