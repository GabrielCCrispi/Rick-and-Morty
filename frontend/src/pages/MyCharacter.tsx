import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { localApi } from '../services/api';
import type { Character } from '../types';

const MyCharactersPage = () => {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await localApi.get('/my-characters');
        setFavorites(response.data);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleDelete = async (characterId: number) => {
    if (window.confirm("Tem certeza que deseja remover este personagem dos favoritos?")) {
      try {
        await localApi.delete(`/my-characters/${characterId}`);
        setFavorites(prevFavorites => prevFavorites.filter(char => char.id !== characterId));
        alert("Personagem removido!");
      } catch (error) {
        console.error("Erro ao remover personagem:", error);
        alert("Não foi possível remover o personagem.");
      }
    }
  };


  if (loading) {
    return <p>Carregando seus personagens favoritos...</p>;
  }

  return (
    <div>
      <h1>Meus Personagens Favoritos</h1>
      {favorites.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {favorites.map(char => (
            <div key={char.id} style={characterCardStyle}>
              <Link to={`/personagens/${char.originalCharacterId}`}>
                <img src={char.image} alt={char.name} style={{ width: '100%', display: 'block' }}/>
                <h3 style={{color: 'black', textDecoration: 'none', margin: '0.5rem'}}>{char.name}</h3>
              </Link>
              <button
                onClick={() => handleDelete(char.id)}
                style={removeButtonStyle}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Você ainda não salvou nenhum personagem. <Link to="/personagens">Explore agora!</Link></p>
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
  position: 'relative',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
};

const removeButtonStyle: React.CSSProperties = {
  margin: '1rem',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  backgroundColor: '#ff4d4d',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
};

export default MyCharactersPage;