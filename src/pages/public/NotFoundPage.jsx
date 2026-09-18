import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const NotFoundPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: 'var(--space-2xl) var(--gutter-mobile)', textAlign: 'center' }}>
      <div style={{ width: '5rem', height: '5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-surface-container-high)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-lg)' }}>
        <span className="icon" style={{ fontSize: '2.5rem', color: 'var(--color-on-surface-variant)' }} aria-hidden="true">search_off</span>
      </div>
      <h1 className="t-headline-lg" style={{ color: 'var(--color-on-surface)', margin: '0 0 var(--space-xs)' }}>Page Not Found</h1>
      <p className="t-body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '420px', margin: '0 0 var(--space-xl)' }}>
        The requested digital health resource does not exist. Please check your URL or return to the main portal.
      </p>
      <Link to={ROUTES.WELCOME} className="btn btn-primary">
        <span className="icon icon-md" aria-hidden="true">home</span>
        <span>Back to Home</span>
      </Link>
    </div>
  );
};
