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
    <div>
      <h1>Personagens</h1>
      
      {/* Filtro */}
      <input
        type="text"
        placeholder="Filtrar por nome..."
        onChange={(e) => {

            setPage(1);
            setNameFilter(e.target.value)
        }}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}
      />
      
      {loading ? (
        <p>Carregando personagens...</p>
      ) : (
        <>
          {/* Lista de Personagens */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {characters.length > 0 ? characters.map(char => (
              <Link to={`/personagens/${char.id}`} key={char.id} style={characterCardStyle}>
                <img src={char.image} alt={char.name} style={{ width: '100%', display: 'block' }}/>
                <h3 style={{ margin: '0.5rem' }}>{char.name}</h3>
              </Link>
            )) : <p>Nenhum personagem encontrado.</p>}
          </div>

          {/* Paginação */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button onClick={() => setPage(page - 1)} disabled={!info?.prev}>
              Anterior
            </button>
            <span>Página {page} de {info?.pages || 1}</span>
            <button onClick={() => setPage(page + 1)} disabled={!info?.next}>
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const characterCardStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  width: 'clamp(150px, 45vw, 220px)',
  textAlign: 'center',
  textDecoration: 'none',
  color: 'black',
  overflow: 'hidden',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s',
};

export default CharactersPage;