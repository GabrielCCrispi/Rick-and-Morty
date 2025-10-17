import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rickAndMortyApi, localApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import type { Character } from '../types';

const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<Character | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await rickAndMortyApi.get(`/character/${id}`);
        setCharacter(response.data);

        
        if (isAuthenticated) {
          const savedResponse = await localApi.get('/my-characters');
          const isAlreadySaved = savedResponse.data.some(
            (char) => char.originalCharacterId === response.data.id
          );
          setIsSaved(isAlreadySaved);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do personagem:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, isAuthenticated]);

  const handleSaveCharacter = async () => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para salvar um personagem!');
      navigate('/login');
      return;
    }
    if (!character) return;

    try {
      const payload = {
        originalCharacterId: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        gender: character.gender,
        origin: character.origin.name,
        location: character.location.name,
        image: character.image,
      };
      await localApi.post('/my-characters', payload);
      setIsSaved(true);
      alert(`${character.name} salvo com sucesso!`);
    } catch (error) {
      console.error("Erro ao salvar personagem:", error);
      alert('Ocorreu um erro ao salvar.');
    }
  };

  if (loading) {
    return <p>Carregando detalhes...</p>;
  }

  if (!character) {
    return <p>Personagem não encontrado.</p>;
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  };

  const imageStyle: React.CSSProperties = {
    borderRadius: '8px',
    maxWidth: '100%',
    width: 'clamp(250px, 50vw, 300px)',
    height: 'auto',
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: '1rem',
    padding: '0.8rem 1.5rem',
    cursor: isSaved ? 'default' : 'pointer',
    opacity: isSaved ? 0.7 : 1,
  };

  return (
    <div style={containerStyle}>
      <img src={character.image} alt={character.name} style={imageStyle}/>
      <div style={{ flex: '1 1 300px' }}>
        <h1>{character.name}</h1>
        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Espécie:</strong> {character.species}</p>
        <p><strong>Gênero:</strong> {character.gender}</p>
        <p><strong>Origem:</strong> {character.origin.name}</p>
        <p><strong>Localização Atual:</strong> {character.location.name}</p>

        <button
          onClick={handleSaveCharacter}
          disabled={isSaved}
          style={buttonStyle}
        >
          {isSaved ? 'Personagem Salvo ✔️' : 'Salvar Personagem'}
        </button>
      </div>
    </div>
  );
};

export default CharacterDetailPage;