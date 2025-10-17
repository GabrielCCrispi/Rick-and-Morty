import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navStyle: React.CSSProperties = {
    background: '#333',
    padding: '1rem 2rem',
    position: 'relative',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
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
    color: '#97F14A',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: isActive ? '700' : '600',
    whiteSpace: 'nowrap',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    background: isActive ? 'rgba(151, 241, 74, 0.15)' : 'transparent',
    transition: 'all 0.3s ease',
    border: isActive ? '2px solid #97F14A' : '2px solid transparent',
  });

  const buttonStyle: React.CSSProperties = {
    color: '#1f2937',
    background: '#ffd93d',
    border: '2px solid #ffb800',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '700',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
  };

  return (
    <nav style={navStyle}>
      <style>{`
        a:hover {
          background: rgba(151, 241, 74, 0.2) !important;
          color: #97F14A !important;
          transform: translateY(-2px);
        }
        button:hover {
          background: #ffb800 !important;
          transform: translateY(-2px);
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