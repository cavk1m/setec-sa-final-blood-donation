import React from 'react';

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className={`cursor-pointer ${props.className ?? ""}`.trim()}>
    {children}
  </button>
);