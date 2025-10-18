import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navStyle: React.CSSProperties = {
    background: 'rgba(10, 14, 39, 0.85)',
    padding: '1rem 2rem',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0, 212, 255, 0.15)',
    backdropFilter: 'blur(15px)',
    borderBottom: '2px solid rgba(0, 212, 255, 0.2)',
  };

  const navContentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    maxWidth: '1400px',
    margin: '0 auto',
  };

  const linkContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    background: 'rgba(0, 212, 255, 0.08)',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    border: '2px solid rgba(0, 212, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 12px rgba(0, 212, 255, 0.1)',
  };

  const mobileMenuStyle: React.CSSProperties = {
    display: isMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    padding: '1rem 0',
  };

  const hamburgerStyle: React.CSSProperties = {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
  };

  const linkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
    color: isActive ? '#00d4ff' : '#97F14A',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: isActive ? '700' : '600',
    whiteSpace: 'nowrap',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    background: isActive ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: isActive ? '2px solid #00d4ff' : '2px solid transparent',
    boxShadow: isActive ? '0 4px 12px rgba(0, 212, 255, 0.4)' : 'none',
  });

  const buttonStyle: React.CSSProperties = {
    color: '#000',
    background: 'linear-gradient(135deg, #ffd93d 0%, #ffb800 100%)',
    border: '2px solid #ffb800',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '700',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 12px rgba(255, 184, 0, 0.3)',
  };

  return (
    <nav style={navStyle}>
      <style>{`
        a:hover {
          background: rgba(0, 212, 255, 0.25) !important;
          color: #00d4ff !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 16px rgba(0, 212, 255, 0.4) !important;
        }
        button:hover {
          background: linear-gradient(135deg, #ffb800 0%, #ff9500 100%) !important;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 20px rgba(255, 184, 0, 0.5) !important;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          .hamburger {
            display: block !important;
          }
          .mobile-menu {
            display: ${isMenuOpen ? 'flex' : 'none'} !important;
          }
        }
      `}</style>

      <div style={navContentStyle}>
        <div className="nav-links" style={linkContainerStyle}>
          <NavLink to="/" style={linkStyle}>Home</NavLink>
          <NavLink to="/personagens" style={linkStyle}>Personagens</NavLink>
          {isAuthenticated && (
            <NavLink to="/meus-personagens" style={linkStyle}>Meus Favoritos</NavLink>
          )}
        </div>

        <div className="nav-links" style={linkContainerStyle}>
          {isAuthenticated ? (
            <button onClick={logout} style={buttonStyle}>
              Sair
            </button>
          ) : (
            <>
              <NavLink to="/login" style={linkStyle}>Login</NavLink>
              <NavLink to="/cadastro" style={linkStyle}>Cadastro</NavLink>
            </>
          )}
        </div>

        <button
          className="hamburger"
          style={hamburgerStyle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      <div className="mobile-menu" style={mobileMenuStyle}>
        <NavLink to="/" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
        <NavLink to="/personagens" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Personagens</NavLink>
        {isAuthenticated && (
          <NavLink to="/meus-personagens" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Meus Favoritos</NavLink>
        )}
        {isAuthenticated ? (
          <button onClick={() => { logout(); setIsMenuOpen(false); }} style={{ ...buttonStyle, width: '100%' }}>
            Sair
          </button>
        ) : (
          <>
            <NavLink to="/login" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Login</NavLink>
            <NavLink to="/cadastro" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Cadastro</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};