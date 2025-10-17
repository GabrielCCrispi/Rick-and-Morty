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
        .character-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          border-color: #3b82f6;
        }
        .character-card:hover img {
          transform: scale(1.05);
        }
      `}</style>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', color: '##FFF', marginBottom: '2rem' }}>Personagens</h1>

      {/* Filtro */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="🔍 Filtrar por nome..."
          onChange={(e) => {
              setPage(1);
              setNameFilter(e.target.value)
          }}
          style={{
            padding: '0.75rem 1.25rem',
            width: '100%',
            maxWidth: '500px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease',
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
      </div>
      
      {loading ? (
        <p>Carregando personagens...</p>
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
            <button
              onClick={() => setPage(page - 1)}
              disabled={!info?.prev}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '2px solid #3b82f6',
                background: info?.prev ? '#3b82f6' : '#e5e7eb',
                color: info?.prev ? 'white' : '#9ca3af',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: info?.prev ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
              }}
            >
              ← Anterior
            </button>
            <span style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#1f2937',
              padding: '0 1rem'
            }}>
              Página {page} de {info?.pages || 1}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={!info?.next}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '2px solid #3b82f6',
                background: info?.next ? '#3b82f6' : '#e5e7eb',
                color: info?.next ? 'white' : '#9ca3af',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: info?.next ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
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
  border: '2px solid #e5e7eb',
  borderRadius: '16px',
  width: '240px',
  textDecoration: 'none',
  color: 'inherit',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  background: '#ffffff',
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
  color: '#1f2937',
  textAlign: 'center',
};

export default CharactersPage;