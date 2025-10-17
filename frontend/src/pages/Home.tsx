import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { rickAndMortyApi, localApi } from '../services/api';
import type { Character } from '../types';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState({ characters: 0, locations: 0, episodes: 0 });
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [userFavCount, setUserFavCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [charRes, locRes, epiRes] = await Promise.all([
          rickAndMortyApi.get('/character'),
          rickAndMortyApi.get('/location'),
          rickAndMortyApi.get('/episode'),
        ]);
        setStats({
          characters: charRes.data.info.count,
          locations: locRes.data.info.count,
          episodes: epiRes.data.info.count,
        });

        
        if (isAuthenticated) {
          const favRes = await localApi.get('/my-characters');
          setUserFavCount(favRes.data.length);
          
          setFavorites(favRes.data.slice(-3).reverse());
        }
      } catch (error) {
        console.error("Erro ao buscar dados para a home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        fontSize: '1.5rem',
        color: '#6b7280'
      }}>
        Carregando dashboard...
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div style={headerStyle}>
        <div style={headerIconStyle}>🌀</div>
        <h1 style={titleStyle}>Dashboard Rick and Morty</h1>
        <p style={subtitleStyle}>Explore o multiverso de Rick and Morty</p>
      </div>

      {/* Estatísticas da API */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>📊 Estatísticas da API</h2>
        <div style={statsGridStyle}>
          <div style={{ ...statCardStyle, background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)', boxShadow: '0 8px 32px rgba(8, 145, 178, 0.25)' }}>
            <div style={statIconStyle}>👥</div>
            <h3 style={statNumberStyle}>{stats.characters}</h3>
            <p style={statLabelStyle}>PERSONAGENS</p>
          </div>
          <div style={{ ...statCardStyle, background: 'linear-gradient(135deg, #c026d3 0%, #9333ea 100%)', boxShadow: '0 8px 32px rgba(192, 38, 211, 0.25)' }}>
            <div style={statIconStyle}>🌍</div>
            <h3 style={statNumberStyle}>{stats.locations}</h3>
            <p style={statLabelStyle}>LOCALIZAÇÕES</p>
          </div>
          <div style={{ ...statCardStyle, background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)', boxShadow: '0 8px 32px rgba(132, 204, 22, 0.25)' }}>
            <div style={statIconStyle}>📺</div>
            <h3 style={statNumberStyle}>{stats.episodes}</h3>
            <p style={statLabelStyle}>EPISÓDIOS</p>
          </div>
        </div>
      </section>

      {/* Dados do Usuário */}
      {isAuthenticated && (
        <>
          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>⭐ Meus Dados</h2>
            <div style={userStatContainerStyle}>
              <div style={userStatCardStyle}>
                <div style={userStatIconStyle}>💾</div>
                <div>
                  <h3 style={userStatNumberStyle}>{userFavCount}</h3>
                  <p style={userStatLabelStyle}>Personagens Salvos</p>
                </div>
              </div>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🔖 Últimos Favoritos</h2>
            {favorites.length > 0 ? (
              <div style={favoritesGridStyle}>
                {favorites.map(char => (
                  <Link to={`/personagens/${char.originalCharacterId}`} key={char.id} style={favoriteCardStyle} className="favorite-card">
                    <div style={favoriteImageContainerStyle}>
                      <img src={char.image} alt={char.name} style={favoriteImageStyle}/>
                    </div>
                    <div style={favoriteInfoStyle}>
                      <p style={favoriteNameStyle}>{char.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={emptyStateStyle}>
                <p style={emptyTextStyle}>😢 Você ainda não salvou nenhum personagem.</p>
                <Link to="/personagens" style={exploreButtonStyle}>
                  Explorar Personagens
                </Link>
              </div>
            )}
          </section>
        </>
      )}

      <style>{`
        .favorite-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 212, 255, 0.4);
          border-color: rgba(0, 212, 255, 0.6);
        }
      `}</style>
    </div>
  );
};

// Container principal
const containerStyle: React.CSSProperties = {
  padding: '2rem',
  maxWidth: '1400px',
  margin: '0 auto',
  minHeight: '100vh',
  background: '#0a0e27',
  position: 'relative',
  backgroundImage: `
    radial-gradient(2px 2px at 10% 20%, white, transparent),
    radial-gradient(1px 1px at 15% 15%, white, transparent),
    radial-gradient(2px 2px at 25% 40%, white, transparent),
    radial-gradient(1px 1px at 30% 60%, white, transparent),
    radial-gradient(2px 2px at 45% 25%, white, transparent),
    radial-gradient(1px 1px at 50% 50%, white, transparent),
    radial-gradient(2px 2px at 55% 75%, white, transparent),
    radial-gradient(1px 1px at 60% 30%, white, transparent),
    radial-gradient(2px 2px at 70% 55%, white, transparent),
    radial-gradient(1px 1px at 75% 80%, white, transparent),
    radial-gradient(2px 2px at 80% 10%, white, transparent),
    radial-gradient(1px 1px at 85% 45%, white, transparent),
    radial-gradient(2px 2px at 90% 70%, white, transparent),
    radial-gradient(1px 1px at 95% 35%, white, transparent),
    radial-gradient(1px 1px at 20% 90%, white, transparent),
    radial-gradient(1px 1px at 40% 85%, white, transparent),
    radial-gradient(1px 1px at 65% 95%, white, transparent)
  `,
  backgroundSize: '100% 100%',
  backgroundPosition: '0% 0%',
};

// Header
const headerStyle: React.CSSProperties = {
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

const headerIconStyle: React.CSSProperties = {
  fontSize: '4rem',
  marginBottom: '1rem',
  filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))',
};

const titleStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '3.5rem',
  fontWeight: '900',
  color: 'white',
  textShadow: '0 0 30px rgba(255, 255, 255, 0.5), 2px 2px 4px rgba(0, 0, 0, 0.3)',
  letterSpacing: '1px',
};

const subtitleStyle: React.CSSProperties = {
  margin: '1rem 0 0 0',
  fontSize: '1.3rem',
  color: 'rgba(255, 255, 255, 0.95)',
  fontWeight: '500',
};

// Seções
const sectionStyle: React.CSSProperties = {
  marginBottom: '2.5rem',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '1.75rem',
  fontWeight: '700',
  color: '#FFF',
  marginBottom: '1.5rem',
  paddingBottom: '0.5rem',
  borderBottom: '3px solid #00d4ff',
  display: 'inline-block',
};

// Cards de Estatísticas
const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
};

const statCardStyle: React.CSSProperties = {
  padding: '3rem 2rem',
  borderRadius: '20px',
  textAlign: 'center',
  color: '#000000',
  transition: 'all 0.3s ease',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
};

const statIconStyle: React.CSSProperties = {
  fontSize: '4rem',
  marginBottom: '1.5rem',
  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
};

const statNumberStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '4rem',
  fontWeight: '900',
  color: '#000000',
  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.3)',
};

const statLabelStyle: React.CSSProperties = {
  margin: '1rem 0 0 0',
  fontSize: '0.95rem',
  fontWeight: '700',
  color: '#000000',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  opacity: 0.8,
};

// Card de dados do usuário
const userStatContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};

const userStatCardStyle: React.CSSProperties = {
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

const userStatIconStyle: React.CSSProperties = {
  fontSize: '4rem',
};

const userStatNumberStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '2.5rem',
  fontWeight: '800',
};

const userStatLabelStyle: React.CSSProperties = {
  margin: '0.5rem 0 0 0',
  fontSize: '1rem',
  fontWeight: '600',
  opacity: 0.9,
};

// Favoritos
const favoritesGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '1.5rem',
};

const favoriteCardStyle: React.CSSProperties = {
  background: 'rgba(31, 41, 55, 0.8)',
  borderRadius: '16px',
  overflow: 'hidden',
  textDecoration: 'none',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
  transition: 'all 0.3s ease',
  border: '2px solid rgba(0, 212, 255, 0.3)',
  backdropFilter: 'blur(10px)',
};

const favoriteImageContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '220px',
  overflow: 'hidden',
};

const favoriteImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const favoriteInfoStyle: React.CSSProperties = {
  padding: '1rem',
  background: 'rgba(17, 24, 39, 0.8)',
};

const favoriteNameStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '1.1rem',
  fontWeight: '700',
  color: '#00d4ff',
  textAlign: 'center',
};

// Estado vazio
const emptyStateStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '3rem',
  background: 'rgba(31, 41, 55, 0.5)',
  borderRadius: '20px',
  border: '2px dashed rgba(0, 212, 255, 0.3)',
  backdropFilter: 'blur(10px)',
};

const emptyTextStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  color: '#9ca3af',
  marginBottom: '1.5rem',
};

const exploreButtonStyle: React.CSSProperties = {
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

export default Home;