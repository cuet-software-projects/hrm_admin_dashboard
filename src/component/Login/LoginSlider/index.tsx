import React, { useState } from 'react';

import LoginSliderIndicator from './LoginSliderIndicator';
import Window1ForLoginSlider from './Window1ForLoginSlider';
import Window2ForLoginSlider from './Window2ForLoginSlider';

const LoginSlider: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const handleIndicatorClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      {activeSlide === 0 ? <Window1ForLoginSlider /> : <Window2ForLoginSlider />}
      <div className="flex justify-center mt-10">
        <LoginSliderIndicator
          active={activeSlide === 0}
          width={activeSlide === 0 ? '70px' : '12px'}
          onClick={() => handleIndicatorClick(0)}
        />
        <LoginSliderIndicator
          active={activeSlide === 1}
          width={activeSlide === 1 ? '70px' : '12px'}
          onClick={() => handleIndicatorClick(1)}
        />
      </div>
    </div>
  );
};

export default LoginSlider;
