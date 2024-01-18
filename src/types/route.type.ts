export type IRoutes = {
  path: string;
  element?: JSX.Element;
  navTitle?: string;
  showNabBlock?: boolean;
  accessibleBy?: string[];
  hasDropdown?: boolean;
  icon?: string;
  showNavItem?: boolean;
  children?: IRoutes[];
};
