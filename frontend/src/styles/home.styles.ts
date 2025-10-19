import type { CSSProperties } from 'react';

// Container principal
export const containerStyle: CSSProperties = {
  padding: '2rem',
  maxWidth: '1400px',
  margin: '0 auto',
  minHeight: '100vh',
  position: 'relative',
};

// Header
export const headerStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: '3rem',
  padding: '3rem 2rem',
  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
  borderRadius: '24px',
  boxShadow: '0 20px 60px rgba(14, 165, 233, 0.25), 0 0 40px rgba(14, 165, 233, 0.15)',
  border: '2px solid rgba(14, 165, 233, 0.4)',
  position: 'relative',
  overflow: 'hidden',
};

export const headerIconStyle: CSSProperties = {
  fontSize: '4rem',
  marginBottom: '1rem',
  filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))',
};

export const titleStyle: CSSProperties = {
  margin: '0',
  fontSize: '3.5rem',
  fontWeight: '900',
  color: 'white',
  textShadow: '0 0 30px rgba(255, 255, 255, 0.5), 2px 2px 4px rgba(0, 0, 0, 0.3)',
  letterSpacing: '1px',
};

export const subtitleStyle: CSSProperties = {
  margin: '1rem 0 0 0',
  fontSize: '1.3rem',
  color: 'rgba(255, 255, 255, 0.95)',
  fontWeight: '500',
};

// Seções
export const sectionStyle: CSSProperties = {
  marginBottom: '2.5rem',
};

export const sectionTitleStyle: CSSProperties = {
  fontSize: '1.75rem',
  fontWeight: '700',
  color: '#FFF',
  marginBottom: '1.5rem',
  paddingBottom: '0.5rem',
  borderBottom: '3px solid #00d4ff',
  display: 'inline-block',
};

// Cards de Estatísticas
export const statsGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
};

export const statCardStyle: CSSProperties = {
  padding: '3rem 2rem',
  borderRadius: '20px',
  textAlign: 'center',
  color: '#000000',
  transition: 'all 0.3s ease',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
};

export const statIconStyle: CSSProperties = {
  fontSize: '4rem',
  marginBottom: '1.5rem',
  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
};

export const statNumberStyle: CSSProperties = {
  margin: '0',
  fontSize: '4rem',
  fontWeight: '900',
  color: '#000000',
  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.3)',
};

export const statLabelStyle: CSSProperties = {
  margin: '1rem 0 0 0',
  fontSize: '0.95rem',
  fontWeight: '700',
  color: '#000000',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  opacity: 0.8,
};

// Card de dados do usuário
export const userStatContainerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};

export const userStatCardStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  padding: '2.5rem 3rem',
  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)',
  color: '#000000',
  border: 'none',
};

export const userStatIconStyle: CSSProperties = {
  fontSize: '4rem',
};

export const userStatNumberStyle: CSSProperties = {
  margin: '0',
  fontSize: '2.5rem',
  fontWeight: '800',
};

export const userStatLabelStyle: CSSProperties = {
  margin: '0.5rem 0 0 0',
  fontSize: '1rem',
  fontWeight: '600',
  opacity: 0.9,
};

// Favoritos
export const favoritesGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '1.5rem',
};

export const favoriteCardStyle: CSSProperties = {
  background: 'rgba(31, 41, 55, 0.8)',
  borderRadius: '16px',
  overflow: 'hidden',
  textDecoration: 'none',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
  transition: 'all 0.3s ease',
  border: '2px solid rgba(0, 212, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  flexDirection: 'column',
  width: '220px',
  height: '280px',
};

export const favoriteImageContainerStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '220px',
  overflow: 'hidden',
};

export const favoriteImageStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export const favoriteInfoStyle: CSSProperties = {
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60px',
  flex: '0 0 60px',
};

export const favoriteNameStyle: CSSProperties = {
  margin: '0',
  fontSize: '1.1rem',
  fontWeight: '700',
  color: '#00d4ff',
  textAlign: 'center',
  lineHeight: '1.4',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// Estado vazio
export const emptyStateStyle: CSSProperties = {
  textAlign: 'center',
  padding: '3rem',
  background: 'rgba(31, 41, 55, 0.5)',
  borderRadius: '20px',
  border: '2px dashed rgba(0, 212, 255, 0.3)',
  backdropFilter: 'blur(10px)',
};

export const emptyTextStyle: CSSProperties = {
  fontSize: '1.2rem',
  color: '#9ca3af',
  marginBottom: '1.5rem',
};

export const exploreButtonStyle: CSSProperties = {
  display: 'inline-block',
  padding: '0.875rem 2rem',
  background: 'linear-gradient(135deg, #00d4ff 0%, #0096c7 100%)',
  color: '#000000',
  textDecoration: 'none',
  borderRadius: '12px',
  fontWeight: '700',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 16px rgba(0, 212, 255, 0.4)',
  border: 'none',
};

export const loadingStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  fontSize: '1.5rem',
  color: '#6b7280'
};
