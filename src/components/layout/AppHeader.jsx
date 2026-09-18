import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

export const AppHeader = () => {
  const { t } = useLanguage();
  const { cycleTheme, theme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getThemeIcon = () => {
    if (theme === 'dark') return 'dark_mode';
    if (theme === 'light') return 'light_mode';
    return 'brightness_auto';
  };

  return (
    <header className="main-header" role="banner">
      <div className="main-header__inner">
        {/* Brand */}
        <Link to={ROUTES.WELCOME} className="brand" aria-label="SEHAT KENDRA Home">
          <div className="brand__emblem">
            <img src="/logo.png" alt="SEHAT KENDRA Logo" width="40" height="40" style={{ objectFit: 'contain' }} />
          </div>
          <div className="brand__text hide-mobile">
            <div className="brand__name">
              <span className="brand__name-en">SEHAT KENDRA</span>
              <span className="brand__name-hi">सेहत केंद्र</span>
            </div>
            <span className="brand__tagline">{t('common.tagline')}</span>
          </div>
        </Link>

        {/* Navigation & Actions */}
        <div className="header-actions">
          {location.pathname.startsWith('/doctor') ? (
            <>
              <div className="header-workstation-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}>
                <span className="icon icon-xs" style={{ fontSize: '16px' }} aria-hidden="true">stethoscope</span>
                <span className="hide-mobile">Doctor / Clinician Workstation</span>
                <span className="hide-desktop">Clinician</span>
              </div>

              <button
                type="button"
                className="theme-toggle-btn"
                onClick={cycleTheme}
                aria-label={`Cycle theme, currently ${theme}`}
                title={`Cycle theme, currently ${theme}`}
              >
                <span className="icon icon-md" aria-hidden="true">{getThemeIcon()}</span>
              </button>

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  logout();
                  navigate(ROUTES.ROLE_SELECTION);
                }}
                title="Exit Doctor Portal"
              >
                <span className="icon icon-sm" aria-hidden="true">logout</span>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              {isAuthenticated && (
                <Link
                  to={ROUTES.PATIENT_HOME}
                  className={`btn btn-ghost btn-sm ${location.pathname === ROUTES.PATIENT_HOME ? 'btn-surface' : ''}`}
                >
                  <span className="icon icon-sm" aria-hidden="true">dashboard</span>
                  <span>Patient Home</span>
                </Link>
              )}

              <button
                type="button"
                className="theme-toggle-btn"
                onClick={cycleTheme}
                aria-label={`Cycle theme, currently ${theme}`}
                title={`Cycle theme, currently ${theme}`}
              >
                <span className="icon icon-md" aria-hidden="true">{getThemeIcon()}</span>
              </button>

              {!isAuthenticated ? (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(ROUTES.PATIENT_AUTH)}
                >
                  <span className="icon icon-sm" aria-hidden="true">login</span>
                  <span>Citizen Sign-in</span>
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="hide-mobile" style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-on-surface)' }}>
                    {user.name}
                  </span>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      logout();
                      navigate(ROUTES.WELCOME);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
