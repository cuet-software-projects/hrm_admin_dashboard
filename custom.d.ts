declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module 'react-datepicker';
declare module 'react-time-picker';
declare module 'react-slick';
declare module 'react-outside-click-handler';
