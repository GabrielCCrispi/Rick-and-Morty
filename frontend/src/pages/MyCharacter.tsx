import React, { useEffect, useState } from 'react';
import { localApi } from '../services/api';
import type { Character } from '../types';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';
import { Link } from 'react-router-dom';

const MyCharactersPage = () => {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await localApi.get('/my-characters');
        setFavorites(response.data);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        toast.error("Erro ao carregar favoritos");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleDelete = async (characterId: number) => {
    try {
      await localApi.delete(`/my-characters/${characterId}`);
      setFavorites(prevFavorites => prevFavorites.filter(char => char.id !== characterId));
      setDeleteConfirm(null);
      toast.success("Personagem removido dos favoritos!");
    } catch (error) {
      console.error("Erro ao remover personagem:", error);
      toast.error("Não foi possível remover o personagem");
    }
  };


  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column', gap: '1rem' }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(0, 212, 255, 0.2)',
          borderTop: '4px solid #00d4ff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}></div>
        <p style={{ color: '#FFF', fontSize: '1.2rem', fontWeight: '600' }}>Carregando seus favoritos...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />

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

        .character-card {
          animation: fadeIn 0.5s ease-out;
        }

        .character-card:hover {
          transform: translateY(-12px) scale(1.02) !important;
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3) !important;
          border-color: #00d4ff !important;
          background: rgba(0, 212, 255, 0.05) !important;
        }

        .character-card:hover img {
          transform: scale(1.1) rotate(2deg) !important;
        }

        .delete-icon {
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
        }

        .character-card:hover .delete-icon {
          opacity: 1;
          pointer-events: auto;
        }

        .delete-icon:hover {
          transform: scale(1.15);
        }

        /* Muda a cor do texto de confirmação quando hover no card */
        .character-card:hover .confirm-text {
          color: #ffffff !important;
          transition: color 0.3s ease;
        }
      `}</style>

      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#FFF', marginBottom: '2rem', textShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}>
        ⭐ Meus Personagens Favoritos
      </h1>

      {favorites.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', padding: '1rem' }}>
          {favorites.map(char => (
            deleteConfirm === char.id ? (
              <div key={char.id} className="character-card" style={{ ...characterCardStyle, cursor: 'default', position: 'relative' }}>
                <div style={confirmContainerStyle}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗑️</div>
                  <p className="confirm-text" style={confirmTextStyle}>Remover este personagem?</p>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', width: '100%', padding: '0 1rem' }}>
                    <button
                      onClick={() => handleDelete(char.id)}
                      style={{ ...confirmButtonStyle, background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                      }}
                    >
                      Sim
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      style={{ ...confirmButtonStyle, background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(107, 114, 128, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                      }}
                    >
                      Não
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={char.id}
                className="character-card"
                style={characterCardStyle}
                onClick={() => setSelectedCharacter(char)}
              >
                <div style={imageContainerStyle}>
                  <img src={char.image} alt={char.name} style={imageStyle}/>
                  <div style={getStatusBadgeStyle(char.status)}>
                    <span style={statusDotStyle(char.status)}></span>
                    {char.status}
                  </div>
                  <button
                    className="delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(char.id);
                    }}
                    style={deleteIconStyle}
                  >
                    🗑️
                  </button>
                </div>
                <div style={cardContentStyle}>
                  <h3 style={nameStyle}>{char.name}</h3>
                </div>
              </div>
            )
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

      {/* Modal de Detalhes do Personagem */}
      {selectedCharacter && (
        <div
          style={modalOverlayStyle}
          onClick={() => setSelectedCharacter(null)}
        >
          <div
            style={modalContentStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCharacter(null)}
              style={closeButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
              }}
            >
              ✕
            </button>

            <div style={modalBodyStyle}>
              <div style={modalImageContainerStyle}>
                <img
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  style={modalImageStyle}
                />
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: getStatusColor(selectedCharacter.status),
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
                  {selectedCharacter.status}
                </div>
              </div>

              <div style={modalInfoContainerStyle}>
                <h2 style={modalTitleStyle}>{selectedCharacter.name}</h2>

                <div style={modalInfoGridStyle}>
                  <div style={modalInfoBoxStyle}>
                    <span style={modalLabelStyle}>Espécie</span>
                    <span style={modalValueStyle}>{selectedCharacter.species}</span>
                  </div>

                  <div style={modalInfoBoxStyle}>
                    <span style={modalLabelStyle}>Gênero</span>
                    <span style={modalValueStyle}>{selectedCharacter.gender}</span>
                  </div>

                  <div style={modalInfoBoxStyle}>
                    <span style={modalLabelStyle}>Origem</span>
                    <span style={modalValueStyle}>
                      {typeof selectedCharacter.origin === 'string'
                        ? selectedCharacter.origin
                        : selectedCharacter.origin.name}
                    </span>
                  </div>

                  <div style={modalInfoBoxStyle}>
                    <span style={modalLabelStyle}>Localização Atual</span>
                    <span style={modalValueStyle}>
                      {typeof selectedCharacter.location === 'string'
                        ? selectedCharacter.location
                        : selectedCharacter.location.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusColor = (status: string) => {
  if (status === 'Alive') return '#22c55e';
  if (status === 'Dead') return '#ef4444';
  return '#9ca3af';
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
  cursor: 'pointer',
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

const deleteIconStyle: React.CSSProperties = {
  position: 'absolute',
  top: '12px',
  left: '12px',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: 'none',
  background: 'rgba(239, 68, 68, 0.95)',
  color: 'white',
  fontSize: '1.2rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
  zIndex: 10,
};

const confirmContainerStyle: React.CSSProperties = {
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '240px',
};

const confirmTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.1rem',
  fontWeight: '700',
  color: '#1f2937',
  textAlign: 'center',
};

const confirmButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  fontWeight: '700',
  borderRadius: '10px',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  minWidth: '80px',
};

const emptyStateStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '3rem',
  background: 'rgba(31, 41, 55, 0.5)',
  borderRadius: '20px',
  border: '2px dashed rgba(0, 212, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  maxWidth: '600px',
  margin: '0 auto',
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

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.85)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '2rem',
  animation: 'fadeIn 0.3s ease-out',
};

const modalContentStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '20px',
  maxWidth: '900px',
  width: '100%',
  maxHeight: '90vh',
  overflow: 'auto',
  boxShadow: '0 20px 60px rgba(0, 212, 255, 0.3)',
  border: '3px solid rgba(0, 212, 255, 0.3)',
  position: 'relative',
  animation: 'fadeIn 0.3s ease-out',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: 'none',
  background: 'rgba(239, 68, 68, 0.95)',
  color: 'white',
  fontSize: '1.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
  fontWeight: '700',
};

const modalBodyStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
};

const modalImageContainerStyle: React.CSSProperties = {
  flex: '1 1 350px',
  position: 'relative',
  minHeight: '400px',
};

const modalImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  minHeight: '400px',
  borderRadius: '17px 0 0 17px',
};

const modalInfoContainerStyle: React.CSSProperties = {
  flex: '1 1 350px',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const modalTitleStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '2rem',
  fontWeight: '800',
  color: '#1f2937',
  borderBottom: '3px solid #3b82f6',
  paddingBottom: '0.75rem',
};

const modalInfoGridStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const modalInfoBoxStyle: React.CSSProperties = {
  background: '#f9fafb',
  padding: '1rem',
  borderRadius: '10px',
  border: '2px solid #e5e7eb',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const modalLabelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: '600',
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const modalValueStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  fontWeight: '700',
  color: '#1f2937',
};

export default MyCharactersPage;