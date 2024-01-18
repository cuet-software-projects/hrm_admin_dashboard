import React from 'react';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  title?: string;
  size?: string;
  color?: string;
  fontWeight?: string;
}

export default function Text({
  title,
  size,
  color,
  fontWeight,
  className,
  style,
  children,
}: TextProps) {
  return (
    <p
      className={`text-${size} text-${color} font-${fontWeight} ${className} `}
      style={style}
    >
      {title ? title : children}
    </p>
  );
}
