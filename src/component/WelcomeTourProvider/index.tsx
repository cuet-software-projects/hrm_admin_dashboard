import { useCallback } from 'react';
import Joyride, { ACTIONS, CallBackProps, EVENTS } from 'react-joyride';
import { useNavigate } from 'react-router';

import useDrawerStore from '../../store/drawerStore';
import useSidebarStore from '../../store/sidebarStore/sidebarStore';
import useWelcomeTourStore from '../../store/welcomeTourStore/welcomeTourStore';
import {
  attendancePageSelectors,
  drawerTemplateSelectors,
  leavePageSelectors,
  userDashboardSelectors,
  welcomeTourSteps,
} from './TourSteps';

const WelcomeTourProvider = () => {
  const { handleDrawerOpen, handleDrawerClose } = useDrawerStore();
  const { setDropdownSmClicked } = useSidebarStore();
  const { run, setRun, setShowWelcomeTourModal, stepDisplay, setStepDisplay } =
    useWelcomeTourStore();
  const navigate = useNavigate();

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { index, action, type, step } = data;
    const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
    if (type === EVENTS.STEP_AFTER) {
      setStepDisplay(nextStepIndex);
      if (step.target === userDashboardSelectors.hamburgerMenu) {
        setDropdownSmClicked(true);
      }
      if (step.target === attendancePageSelectors.attendanceNavBtn) {
        navigate('/attendance');
      }
      if (step.target === leavePageSelectors.leaveNavBtn) {
        navigate('/leave');
      }
      if (
        [attendancePageSelectors.addAttendance, leavePageSelectors.addLeave].includes(
          step.target as string,
        )
      ) {
        handleDrawerOpen('create');
      }
      if (step.target === drawerTemplateSelectors.templateCloseBtn) {
        handleDrawerClose();
      }
    }
    if (type === 'tour:end') {
      navigate('/dashboard');
      window.location.reload();
      setShowWelcomeTourModal(false);
      setRun(false);
    }
  }, []);

  return (
    <Joyride
      continuous={true}
      callback={handleJoyrideCallback}
      run={run}
      stepIndex={stepDisplay}
      steps={welcomeTourSteps}
      hideCloseButton
      scrollToFirstStep
      showSkipButton
      showProgress
    />
  );
};

export default WelcomeTourProvider;
