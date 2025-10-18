import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { rickAndMortyApi } from '../services/api';
import type { Character, ApiInfo } from '../types';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<ApiInfo | null>(null);
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await rickAndMortyApi.get(`/character`, {
          params: {
            page: page,
            name: nameFilter,
          },
        });
        setCharacters(response.data.results);
        setInfo(response.data.info);
      } catch (error) {
        console.error("Personagem não encontrado ou erro na API:", error);
        setCharacters([]);
        setInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, nameFilter]);

  return (
    <div style={{ padding: '2rem' }}>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(0, 212, 255, 0);
          }
        }

        .search-input {
          animation: fadeIn 0.6s ease-out;
        }

        .search-input:focus {
          animation: pulse 2s infinite;
        }

        .character-card {
          animation: fadeIn 0.5s ease-out;
        }

        .character-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);
          border-color: #00d4ff;
          background: rgba(0, 212, 255, 0.05) !important;
        }

        .character-card:hover img {
          transform: scale(1.1) rotate(2deg);
        }

        .loading-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#FFF', marginBottom: '2rem', textShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}>Personagens</h1>

      {/* Filtro com efeitos */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
          <input
            type="text"
            placeholder="Pesquisar personagens..."
            className="search-input"
            onChange={(e) => {
                setPage(1);
                setNameFilter(e.target.value)
            }}
            style={{
              padding: '1rem 1.5rem 1rem 3.5rem',
              width: '100%',
              borderRadius: '16px',
              border: '3px solid rgba(0, 212, 255, 0.3)',
              fontSize: '1.1rem',
              outline: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0, 212, 255, 0.2)',
              fontWeight: '500',
              color: '#212529'
        
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#00d4ff';
              e.target.style.boxShadow = '0 8px 30px rgba(0, 212, 255, 0.4)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0, 212, 255, 0.3)';
              e.target.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          />
          <div style={{
            position: 'absolute',
            left: '1.2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1.5rem',
            pointerEvents: 'none',
          }}>
            🔍
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(0, 212, 255, 0.2)',
            borderTop: '4px solid #00d4ff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}></div>
          <p style={{ color: '#FFF', fontSize: '1.2rem', fontWeight: '600' }}>Carregando personagens...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <>
          {/* Lista de Personagens */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', padding: '1rem' }}>
            {characters.length > 0 ? characters.map(char => (
              <Link to={`/personagens/${char.id}`} key={char.id} className="character-card" style={characterCardStyle}>
                <div style={imageContainerStyle}>
                  <img src={char.image} alt={char.name} style={imageStyle}/>
                  <div style={getStatusBadgeStyle(char.status)}>
                    <span style={statusDotStyle(char.status)}></span>
                    {char.status}
                  </div>
                </div>
                <div style={cardContentStyle}>
                  <h3 style={nameStyle}>{char.name}</h3>
                </div>
              </Link>
            )) : <p>Nenhum personagem encontrado.</p>}
          </div>

          {/* Paginação */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '3rem' }}>
            <button
              onClick={() => setPage(page - 1)}
              disabled={!info?.prev}
              className="pagination-btn"
              style={{
                padding: '1rem 2rem',
                borderRadius: '12px',
                border: '3px solid rgba(0, 212, 255, 0.4)',
                background: info?.prev ? 'linear-gradient(135deg, #00d4ff 0%, #0096c7 100%)' : 'rgba(156, 163, 175, 0.3)',
                color: info?.prev ? '#000' : '#6b7280',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: info?.prev ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: info?.prev ? '0 4px 15px rgba(0, 212, 255, 0.3)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (info?.prev) {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (info?.prev) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.3)';
                }
              }}
            >
              ← Anterior
            </button>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              color: '#FFF',
              padding: '0.8rem 1.5rem',
              background: 'rgba(0, 212, 255, 0.15)',
              borderRadius: '12px',
              border: '2px solid rgba(0, 212, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0, 212, 255, 0.2)',
            }}>
              Página {page} de {info?.pages || 1}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={!info?.next}
              className="pagination-btn"
              style={{
                padding: '1rem 2rem',
                borderRadius: '12px',
                border: '3px solid rgba(0, 212, 255, 0.4)',
                background: info?.next ? 'linear-gradient(135deg, #00d4ff 0%, #0096c7 100%)' : 'rgba(156, 163, 175, 0.3)',
                color: info?.next ? '#000' : '#6b7280',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: info?.next ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: info?.next ? '0 4px 15px rgba(0, 212, 255, 0.3)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (info?.next) {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (info?.next) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.3)';
                }
              }}
            >
              Próxima →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const characterCardStyle: React.CSSProperties = {
  border: '3px solid rgba(0, 212, 255, 0.2)',
  borderRadius: '20px',
  width: '260px',
  textDecoration: 'none',
  color: 'inherit',
  overflow: 'hidden',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  flexDirection: 'column',
};

const imageContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '240px',
  overflow: 'hidden',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.3s ease',
};

const getStatusBadgeStyle = (status: string): React.CSSProperties => {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backdropFilter: 'blur(10px)',
    textTransform: 'capitalize',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  };

  if (status === 'Alive') {
    return { ...baseStyle, background: 'rgba(34, 197, 94, 0.95)', color: '#000000' };
  } else if (status === 'Dead') {
    return { ...baseStyle, background: 'rgba(239, 68, 68, 0.95)', color: '#000000' };
  } else {
    return { ...baseStyle, background: 'rgba(156, 163, 175, 0.95)', color: '#000000' };
  }
};

const statusDotStyle = (status: string): React.CSSProperties => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#000000',
  display: 'inline-block',
});

const cardContentStyle: React.CSSProperties = {
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const nameStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '1.1rem',
  fontWeight: '700',
  color: '#97F14A',
  textAlign: 'center',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
};

export default CharactersPage;