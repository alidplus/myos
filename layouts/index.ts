import React, { FC } from 'react';

export const ComposeLayouts: FC<{ layouts: any[] }> = ({ layouts, children }) => {
  if (!layouts?.length) return children;
  
  return layouts.reduce((acc: any, Layout: any) => React.createElement(Layout, null, acc), children);
};