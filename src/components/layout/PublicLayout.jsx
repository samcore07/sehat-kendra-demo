import React from 'react';
import { Outlet } from 'react-router-dom';
import { GovRibbon } from './GovRibbon';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';

export const PublicLayout = () => {
  return (
    <div className="app-shell layout-public">
      <div className="app-header">
        <GovRibbon />
        <AppHeader />
      </div>

      <div className="app-content">
        <main id="main-content" tabIndex="-1">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </div>
  );
};
