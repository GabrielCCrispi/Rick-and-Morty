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
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Dashboard Rick and Morty</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>Estatísticas da API</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={statCardStyle}>
            <h3>{stats.characters}</h3>
            <p>Personagens</p>
          </div>
          <div style={statCardStyle}>
            <h3>{stats.locations}</h3>
            <p>Localizações</p>
          </div>
          <div style={statCardStyle}>
            <h3>{stats.episodes}</h3>
            <p>Episódios</p>
          </div>
        </div>
      </section>

      {isAuthenticated && (
        <section>
          <h2>Meus Dados</h2>
           <div style={statCardStyle}>
            <h3>{userFavCount}</h3>
            <p>Total de Personagens Salvos</p>
          </div>
          
          <h3 style={{marginTop: '2rem'}}>Últimos 3 Favoritos</h3>
          {favorites.length > 0 ? (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {favorites.map(char => (
                <Link to={`/personagens/${char.originalCharacterId}`} key={char.id} style={characterCardStyle}>
                    <img src={char.image} alt={char.name} style={{ width: '100%'}}/>
                    <p style={{ margin: '0.5rem', fontWeight: 'bold' }}>{char.name}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p>Você ainda não salvou nenhum personagem.</p>
          )}
        </section>
      )}
    </div>
  );
};

const statCardStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '1rem',
  minWidth: '150px',
  textAlign: 'center',
};

const characterCardStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  width: '200px',
  overflow: 'hidden',
  textDecoration: 'none',
  color: 'inherit'
};

export default Home;