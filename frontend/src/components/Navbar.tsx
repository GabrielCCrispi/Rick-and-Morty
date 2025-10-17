import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navStyle: React.CSSProperties = {
    background: '#333',
    padding: '1rem',
    position: 'relative',
  };

  const navContentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  const linkContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    alignItems: 'center',
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
    color: isActive ? '#61dafb' : 'white',
    textDecoration: 'none',
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    whiteSpace: 'nowrap',
  });

  return (
    <nav style={navStyle}>
      <style>{`
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', justifyContent: 'space-between' }}>
          <div className="nav-links" style={linkContainerStyle}>
            <NavLink to="/" style={linkStyle}>Home</NavLink>
            <NavLink to="/personagens" style={linkStyle}>Personagens</NavLink>
            {isAuthenticated && (
              <NavLink to="/meus-personagens" style={linkStyle}>Meus Favoritos</NavLink>
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

        <div className="nav-links" style={linkContainerStyle}>
          {isAuthenticated ? (
            <button onClick={logout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
              Sair
            </button>
          ) : (
            <>
              <NavLink to="/login" style={linkStyle}>Login</NavLink>
              <NavLink to="/cadastro" style={linkStyle}>Cadastro</NavLink>
            </>
          )}
        </div>
      </div>

      <div className="mobile-menu" style={mobileMenuStyle}>
        <NavLink to="/" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
        <NavLink to="/personagens" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Personagens</NavLink>
        {isAuthenticated && (
          <NavLink to="/meus-personagens" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Meus Favoritos</NavLink>
        )}
        {isAuthenticated ? (
          <button onClick={() => { logout(); setIsMenuOpen(false); }} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', textAlign: 'left' }}>
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