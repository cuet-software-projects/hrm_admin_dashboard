/* eslint-disable react/no-unescaped-entities */
import { Button, Modal } from 'antd';

import useWelcomeTourStore from '../../../../store/welcomeTourStore/welcomeTourStore';

const WelcomeTourModal = () => {
  const { showWelcomeTourModal, setShowWelcomeTourModal, setRun } = useWelcomeTourStore();
  const handleSkipTour = () => {
    setShowWelcomeTourModal(false);
  };
  const handleStartTour = () => {
    setShowWelcomeTourModal(false);
    setRun(true);
  };

  return (
    <Modal
      open={showWelcomeTourModal}
      centered
      title={
        <h3 className="stylishHeaderText text-center text-xl">
          Welcome to the Diligite Portal!
        </h3>
      }
      width={500}
      className="my-10"
      footer={false}
      closable={false}
    >
      <div className="w-full text-left">
        <div className="mt-3 pl-5">
          <p>Get ready to explore our platform.</p>
          <ul className="list-disc pl-10">
            <li>
              <p>To start the tour, click 'Start Tour' below.</p>
            </li>
            <li>
              <p>To skip the tour and dive in, choose 'Skip Tour'. </p>
            </li>
          </ul>
          <p className="font-bold">Let's begin!</p>
        </div>

        <div className="flex justify-center mt-4">
          {/* <button className="mr-4 px-4 py-2 btn rounded-md"></button> */}
          <Button className="bg-primary font-bold" size="large" onClick={handleStartTour}>
            Start Tour
          </Button>
          <Button className="ml-3 font-semibold" onClick={handleSkipTour} size="large">
            Skip Tour
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WelcomeTourModal;
