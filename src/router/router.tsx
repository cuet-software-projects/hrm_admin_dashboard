import { ComponentType, lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import Loading from '../component/Resuables/Loader';
import { userRoles } from '../constants/GlobalConstants';
import { IRoutes } from '../types/route.type';

/* eslint-disable react/display-name */
const Loader =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) =>
    (
      <Suspense fallback={<Loading size="large" />}>
        <Component {...props} />
      </Suspense>
    );

// Authorized routes
const Notfound = Loader(lazy(() => import('../Pages/NotFound')));
const SidebarTemplate = Loader(lazy(() => import('../Layout/SidebarTemplate')));
const DashboardPage = Loader(lazy(() => import('../Pages/Dashboard')));
const DepartmentPage = Loader(lazy(() => import('../Pages/Department')));
const AttendancePage = Loader(lazy(() => import('../Pages/Attendance')));
const ProfileSection = Loader(lazy(() => import('../component/ProfileSection')));
const LeavePage = Loader(lazy(() => import('../Pages/Leave')));
const LeaveDetailsPage = Loader(lazy(() => import('../Pages/Leave/LeaveDetailsPage')));
const NotificationList = Loader(lazy(() => import('../component/NotificationList')));
// const InitialBreakPage = Loader(
//   lazy(() => import('../component/Pages/Attendance/InitialBreakPage')),
// );
// const EndBreakPage = Loader(
//   lazy(() => import('../component/Pages/Attendance/Break/EndBreakPage')),
// );
// const StartBreakPage = Loader(
//   lazy(() => import('../component/Pages/Attendance/StartBreakPage')),
// );
// const BreakListPage = Loader(
//   lazy(() => import('../component/Pages/Attendance/Break/BreakListPage')),
// );
const NotificationDetailsPage = Loader(lazy(() => import('../Pages/Notification')));
const ResetPasswordPage = Loader(lazy(() => import('../Pages/ResetPassword')));
const BranchPage = Loader(lazy(() => import('../Pages/Branch')));
const DesignationPage = Loader(lazy(() => import('../Pages/Designation')));
const UserPage = Loader(lazy(() => import('../Pages/User')));
const TeammateProfilePage = Loader(lazy(() => import('../Pages/TeammateProfilePage')));
const TeamPage = Loader(lazy(() => import('../Pages/Team')));
const EmployeePage = Loader(lazy(() => import('../Pages/Employee')));
const CurrentEmployeePage = Loader(lazy(() => import('../Pages/CurrentEmployees')));
const DesignationHistoryPage = Loader(
  lazy(() => import('../Pages/Designation/DesignationHistory')),
);
const RolePage = Loader(lazy(() => import('../Pages/Role')));
const UserRoleListPage = Loader(lazy(() => import('../Pages/UserRoleList')));
const PayrollPage = Loader(lazy(() => import('../Pages/Payroll/Salary')));
const PayrollInfoPage = Loader(lazy(() => import('../Pages/Payroll')));
const BonusPage = Loader(lazy(() => import('../Pages/Payroll/Bonus/BonusPage')));
const SalaryInfoPage = Loader(lazy(() => import('../Pages/Payroll/SalaryInfo')));
const InvoicePage = Loader(lazy(() => import('../Pages/InvoicePage')));
const InvoiceDetailsPage = Loader(lazy(() => import('../Pages/InvoiceDetailsPage')));
const FeedbackPage = Loader(lazy(() => import('../Pages/FeedbackPage')));
const SalaryCertificatePage = Loader(lazy(() => import('../Pages/SalaryCertificate')));
const NoticePage = Loader(lazy(() => import('../Pages/Notice')));
const NoticeDetailsPage = Loader(lazy(() => import('../Pages/Notice/NoticeDetails')));

// Unauthorized routes
const LoginPage = Loader(lazy(() => import('../Pages/Login')));
const ForgotPasswordPage = Loader(lazy(() => import('../Pages/ForgotPasswordPage')));
const ResetPasswordForgotPage = Loader(
  lazy(() => import('../Pages/ForgotPasswordPage/ResetPasswordWhenForgot')),
);

const authorizedRoutes: IRoutes[] = [
  {
    path: '',
    element: <Navigate to="/dashboard" />,
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user, userRoles.client],
  },
  {
    navTitle: 'Dashboard',
    path: 'dashboard',
    element: <SidebarTemplate />,
    showNabBlock: true,
    icon: 'ic_dashboard',
    hasDropdown: false,
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user, userRoles.client],
    children: [
      {
        path: '',
        element: <DashboardPage />,
        accessibleBy: [
          userRoles.admin,
          userRoles.manager,
          userRoles.user,
          userRoles.client,
        ],
      },
    ],
  },
  {
    navTitle: 'Attendance',
    path: 'attendance',
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
    element: <SidebarTemplate />,
    showNabBlock: true,
    icon: 'ic_attendance',
    hasDropdown: false,
    children: [
      {
        path: '',
        showNavItem: false,
        showNabBlock: false,
        accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
        element: <AttendancePage />,
      },
    ],
  },
  {
    navTitle: 'Leave',
    path: 'leave',
    element: <SidebarTemplate />,
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
    showNabBlock: true,
    icon: 'ic_leave',
    hasDropdown: false,
    children: [
      {
        path: '',
        element: <LeavePage />,
        accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
      },
      {
        path: 'details',
        showNavItem: false,
        showNabBlock: false,
        accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
        element: <LeaveDetailsPage />,
      },
    ],
  },
  {
    navTitle: 'Payroll',
    path: 'payroll',
    element: <SidebarTemplate />,
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
    showNabBlock: true,
    icon: 'ic_payroll_info',
    hasDropdown: true,
    children: [
      {
        path: '',
        element: <PayrollInfoPage />,
        accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
      },
      {
        navTitle: 'Salary',
        path: 'salary',
        element: <PayrollPage />,
        icon: 'ic_payroll',
        accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
      },
      {
        navTitle: 'Bonus',
        path: 'bonus',
        element: <BonusPage />,
        icon: 'ic_bonus',
        accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
      },
      {
        navTitle: 'Salary Info',
        path: 'salary-info',
        element: <SalaryInfoPage />,
        icon: 'ic_salary_info',
        accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
      },
    ],
  },
  {
    navTitle: 'Invoice',
    path: 'invoice',
    element: <SidebarTemplate />,
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user, userRoles.client],
    showNabBlock: true,
    icon: 'ic_invoice',
    children: [
      {
        path: '',
        element: <InvoicePage />,
        accessibleBy: [
          userRoles.admin,
          userRoles.manager,
          userRoles.user,
          userRoles.client,
        ],
      },
      {
        path: 'invoice-details',
        element: <InvoiceDetailsPage />,
        accessibleBy: [userRoles.admin, userRoles.manager],
      },
    ],
  },
  {
    navTitle: 'User Profile',
    path: 'user-profile',
    element: <SidebarTemplate />,
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user, userRoles.client],
    showNabBlock: false,
    icon: 'ic_payroll',
    hasDropdown: false,
    children: [
      {
        path: '',
        showNavItem: true,
        navTitle: 'User Profile',
        accessibleBy: [
          userRoles.admin,
          userRoles.manager,
          userRoles.user,
          userRoles.client,
        ],
        element: <ProfileSection />,
      },
    ],
  },
  {
    navTitle: 'Reset Password',
    path: 'reset-password',
    element: <SidebarTemplate />,
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user, userRoles.client],
    children: [
      {
        path: '',
        element: <ResetPasswordPage />,
        accessibleBy: [
          userRoles.admin,
          userRoles.manager,
          userRoles.user,
          userRoles.client,
        ],
      },
    ],
  },
  {
    navTitle: 'Notification List',
    path: 'notification-list',
    element: <SidebarTemplate />,
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user, userRoles.client],
    showNabBlock: false,
    icon: 'ic_payroll',
    hasDropdown: false,
    children: [
      {
        path: 'account-info',
        showNavItem: true,
        navTitle: 'Create Account',
        accessibleBy: [
          userRoles.admin,
          userRoles.manager,
          userRoles.user,
          userRoles.client,
        ],
        element: <NotificationList />,
      },
      {
        path: 'office-info',
        showNavItem: true,
        navTitle: 'Notification Details',
        accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
        element: <NotificationDetailsPage />,
      },
    ],
  },
  {
    navTitle: 'Feedback',
    path: 'feedback',
    element: <SidebarTemplate />,
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
    showNabBlock: true,
    icon: 'ic_feedback',
    hasDropdown: false,
    children: [
      {
        path: '',
        accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
        element: <FeedbackPage />,
      },
    ],
  },
  {
    navTitle: 'Notice',
    path: 'notice',
    element: <SidebarTemplate />,
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
    showNabBlock: false,
    children: [
      {
        navTitle: '',
        path: '',
        element: <NoticePage />,
        accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
      },
      {
        navTitle: '',
        path: 'notice-details',
        element: <NoticeDetailsPage />,
        accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
      },
    ],
  },
  {
    navTitle: 'Others',
    path: 'others',
    element: <SidebarTemplate />,
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user],
    showNabBlock: true,
    icon: 'ic_create_user',
    hasDropdown: true,
    children: [
      {
        path: 'user',
        navTitle: 'Users',
        icon: 'ic_user_add',
        accessibleBy: [userRoles.admin, userRoles.manager],
        children: [
          {
            path: '',
            icon: 'ic_user_add',
            showNavItem: true,
            navTitle: 'Users',
            accessibleBy: [userRoles.admin, userRoles.manager],
            element: <UserPage />,
          },
          {
            path: 'employee',
            accessibleBy: [userRoles.admin, userRoles.manager],
            element: <EmployeePage />,
          },
          {
            path: 'employee/designation-history',
            accessibleBy: [userRoles.admin, userRoles.manager],
            element: <DesignationHistoryPage />,
          },
          {
            path: 'user-roles',
            accessibleBy: [userRoles.admin, userRoles.manager],
            element: <UserRoleListPage />,
          },
        ],
      },
      {
        path: 'teammates',
        icon: 'ic_teammate',
        showNavItem: true,
        navTitle: 'Teammates',
        element: <TeammateProfilePage />,
        accessibleBy: [userRoles.user],
      },
      {
        navTitle: 'Current Employees',
        path: 'current-employees',
        element: <CurrentEmployeePage />,
        showNabBlock: true,
        icon: 'ic_employees',
        hasDropdown: true,
        accessibleBy: [userRoles.admin, userRoles.manager],
      },
      {
        path: 'branch',
        icon: 'ic_branch',
        showNavItem: true,
        navTitle: 'Branch',
        accessibleBy: [userRoles.admin, userRoles.manager],
        element: <BranchPage />,
      },
      {
        path: 'role',
        icon: 'ic_role',
        showNavItem: true,
        navTitle: 'Role',
        accessibleBy: [userRoles.admin, userRoles.manager],
        element: <RolePage />,
      },
      {
        path: 'department',
        icon: 'ic_department',
        showNavItem: true,
        navTitle: 'Department',
        accessibleBy: [userRoles.admin, userRoles.manager],
        element: <DepartmentPage></DepartmentPage>,
      },
      {
        path: 'designation',
        icon: 'ic_designation',
        showNavItem: true,
        navTitle: 'Designation',
        accessibleBy: [userRoles.admin, userRoles.manager],
        element: <DesignationPage />,
      },
      {
        path: 'teams',
        icon: 'ic_teams',
        showNavItem: true,
        navTitle: 'Teams',
        accessibleBy: [userRoles.admin, userRoles.manager],
        element: <TeamPage />,
      },
      {
        path: 'salary-certificate',
        icon: 'ic_certificate',
        showNavItem: true,
        navTitle: 'Salary Certificates',
        accessibleBy: [userRoles.admin, userRoles.manager],
        element: <SalaryCertificatePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Notfound />,
    accessibleBy: [userRoles.admin, userRoles.manager, userRoles.user, userRoles.client],
  },
];

const unauthorizedRoutes: IRoutes[] = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: 'reset-password',
    element: <ResetPasswordForgotPage />,
  },
  {
    path: '*',
    element: <LoginPage />,
  },
];

export { authorizedRoutes, unauthorizedRoutes };
