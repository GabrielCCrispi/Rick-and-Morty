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

  const getStatusColor = (status: string) => {
    if (status === 'Alive') return '#22c55e';
    if (status === 'Dead') return '#ef4444';
    return '#9ca3af';
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '750px', margin: '0 auto' }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        border: '2px solid #e5e7eb',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0',
        }}>
          {/* Imagem do Personagem */}
          <div style={{
            flex: '1 1 300px',
            position: 'relative',
          }}>
            <img
              src={character.image}
              alt={character.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                minHeight: '350px',
              }}
            />
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '8px 16px',
              borderRadius: '20px',
              background: getStatusColor(character.status),
              color: '#000000',
              fontWeight: '700',
              fontSize: '0.9rem',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#000000',
              }}></span>
              {character.status}
            </div>
          </div>

          {/* Informações do Personagem */}
          <div style={{
            flex: '1 1 300px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}>
            <h1 style={{
              margin: '0',
              fontSize: '1.75rem',
              fontWeight: '800',
              color: '#1f2937',
              borderBottom: '3px solid #3b82f6',
              paddingBottom: '0.5rem',
            }}>
              {character.name}
            </h1>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}>
              <div style={infoBoxStyle}>
                <span style={labelStyle}>Espécie</span>
                <span style={valueStyle}>{character.species}</span>
              </div>

              <div style={infoBoxStyle}>
                <span style={labelStyle}>Gênero</span>
                <span style={valueStyle}>{character.gender}</span>
              </div>

              <div style={infoBoxStyle}>
                <span style={labelStyle}>Origem</span>
                <span style={valueStyle}>{character.origin.name}</span>
              </div>

              <div style={infoBoxStyle}>
                <span style={labelStyle}>Localização Atual</span>
                <span style={valueStyle}>{character.location.name}</span>
              </div>
            </div>

            <button
              onClick={handleSaveCharacter}
              disabled={isSaved}
              style={{
                marginTop: 'auto',
                padding: '0.85rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '700',
                borderRadius: '10px',
                border: 'none',
                background: isSaved ? '#22c55e' : '#3b82f6',
                color: 'white',
                cursor: isSaved ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
                opacity: isSaved ? 0.8 : 1,
              }}
            >
              {isSaved ? '✓ Personagem Salvo' : 'Salvar Personagem'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const infoBoxStyle: React.CSSProperties = {
  background: '#f9fafb',
  padding: '0.85rem',
  borderRadius: '8px',
  border: '2px solid #e5e7eb',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: '600',
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const valueStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: '700',
  color: '#1f2937',
};

export default CharacterDetailPage;