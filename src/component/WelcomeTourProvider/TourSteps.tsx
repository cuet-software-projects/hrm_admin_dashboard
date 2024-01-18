import { Step } from 'react-joyride';

const isSmallScreen = window.innerWidth >= 768 ? false : true;

// Element Selector IDs
export const userDashboardSelectors = {
  performanceStatus: '#performance_status',
  attendanceMarkingUser: '#attendance_marking_user',
  payrollSummaryEmployee: '#payroll_summary_employee',
  hamburgerMenu: '#hamburger-menu',
};

export const attendancePageSelectors = {
  attendanceNavBtn: '#Attendance',
  addAttendance: '#add-attendance',
  attendanceCreateForm: '#attendance-create-form',
};

export const leavePageSelectors = {
  leaveNavBtn: '#Leave',
  addLeave: '#add-leave',
  leaveCreateForm: '#leave-create-form',
  leaveRequestWarning: '#leave-request-warning',
};

export const drawerTemplateSelectors = {
  drawerTemplate: '#drawer-template',
  templateCloseBtn: '#template-close-btn',
};

// Style for the tour components
const spotlightStyles = {
  border: '2px solid orange',
};

// Steps related to dashboard tour
const userDashboardSteps: Step[] = [
  {
    content: (
      <h2 className="text-xl text-center">
        This is where your performance will be reflected.
      </h2>
    ),
    locale: { skip: <strong>SKIP</strong> },
    placement: isSmallScreen ? 'top' : 'right',
    target: userDashboardSelectors.performanceStatus,
    disableBeacon: true,
  },
  {
    content: (
      <h2 className="text-xl text-center">
        This is where your attendance marking will be reflected.
      </h2>
    ),
    locale: { skip: <strong>SKIP</strong> },
    placement: isSmallScreen ? 'top' : 'left',
    target: userDashboardSelectors.attendanceMarkingUser,
  },
  {
    content: (
      <h2 className="text-xl text-center">Your Payroll Summary can be seen here.</h2>
    ),
    locale: { skip: <strong>SKIP</strong> },
    placement: isSmallScreen ? 'bottom' : 'right',
    target: userDashboardSelectors.payrollSummaryEmployee,
  },
];

if (isSmallScreen) {
  userDashboardSteps.push({
    content: <h2 className="text-xl text-center">Click here to open menu</h2>,
    locale: { skip: <strong>SKIP</strong> },
    placement: 'bottom',
    target: userDashboardSelectors.hamburgerMenu,
  });
}

// Steps related to attendance page tour
const attendancePageSteps: Step[] = [
  {
    content: (
      <h2 className="text-xl text-center">
        Click on it <br />
        to go to the attendance page
      </h2>
    ),
    locale: { skip: <strong>SKIP</strong> },
    target: attendancePageSelectors.attendanceNavBtn,
    hideFooter: true,
    placement: isSmallScreen ? 'bottom' : 'right',
    styles: {
      spotlight: spotlightStyles,
    },
  },
  {
    content: (
      <h2 className="text-xl text-center">
        Click on it <br />
        to enter your attendance
      </h2>
    ),
    locale: { skip: <strong>SKIP</strong> },
    target: attendancePageSelectors.addAttendance,
    placement: 'bottom',
    disableBeacon: true,
    styles: {
      spotlight: spotlightStyles,
    },
  },
  {
    content: (
      <h2 className="text-xl text-center">
        You need to fill up this form <br />
        for giving attendance
      </h2>
    ),
    locale: { skip: <strong>SKIP</strong> },
    target: isSmallScreen
      ? attendancePageSelectors.attendanceCreateForm
      : drawerTemplateSelectors.drawerTemplate,
    placement: isSmallScreen ? 'top' : 'left',
    disableBeacon: true,
    styles: {
      spotlight: spotlightStyles,
    },
  },
  {
    content: (
      <h2 className="text-xl text-center">
        When attendance entry is done <br />
        close it from here
      </h2>
    ),
    locale: { skip: <strong>SKIP</strong> },
    target: drawerTemplateSelectors.templateCloseBtn,
    placement: 'bottom',
    disableBeacon: true,
    styles: {
      spotlight: spotlightStyles,
    },
  },
];

// Steps related to attendance page tour
const leavPageSteps: Step[] = [
  {
    content: (
      <h2 className="text-xl text-center">
        Click on it <br />
        to go to the Leave page
      </h2>
    ),
    locale: { skip: <strong>SKIP</strong> },
    target: leavePageSelectors.leaveNavBtn,
    hideFooter: true,
    placement: isSmallScreen ? 'bottom' : 'right',
    styles: {
      spotlight: spotlightStyles,
    },
  },
  {
    content: (
      <h2 className="text-xl text-center">
        Click on it <br />
        to demand for a leave
      </h2>
    ),
    locale: { skip: <strong>SKIP</strong> },
    target: leavePageSelectors.addLeave,
    placement: 'bottom-start',
    disableBeacon: true,
    styles: {
      spotlight: spotlightStyles,
    },
  },
  {
    content: (
      <h2 className="text-xl text-center">
        You need to fill up this form <br />
        for demanding your leave
      </h2>
    ),
    locale: { skip: <strong>SKIP</strong> },
    target: isSmallScreen
      ? leavePageSelectors.leaveCreateForm
      : drawerTemplateSelectors.drawerTemplate,
    placement: isSmallScreen ? 'top' : 'left',
    disableBeacon: true,
    styles: {
      spotlight: spotlightStyles,
    },
  },
  {
    content: (
      <h2 className="text-xl text-center">
        But wait!!! You need to be careful <br />
        before applying for a leave. Read this carefully.
      </h2>
    ),
    locale: { skip: <strong>SKIP</strong> },
    target: leavePageSelectors.leaveRequestWarning,
    disableScrolling: !isSmallScreen,
    placement: isSmallScreen ? 'bottom' : 'left',
    disableBeacon: true,
    styles: {
      spotlight: spotlightStyles,
    },
  },
  {
    content: (
      <h2 className="text-xl text-center">
        When applying for leave is done <br />
        close it from here
      </h2>
    ),
    locale: { skip: <strong>SKIP</strong> },
    target: drawerTemplateSelectors.templateCloseBtn,
    placement: 'bottom',
    disableBeacon: true,
    styles: {
      spotlight: spotlightStyles,
    },
  },
];

// Combined steps
export const welcomeTourSteps: Step[] = [
  ...userDashboardSteps,
  ...attendancePageSteps,
  ...leavPageSteps,
];
