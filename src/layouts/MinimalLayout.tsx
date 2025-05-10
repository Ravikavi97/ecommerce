import React from 'react';
import { useApp } from '../contexts/AppContext';

export const MinimalLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { state } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
    </div>
  );
};