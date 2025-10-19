import React from 'react';
import { Link } from 'react-router-dom';
import type { Character } from '../../types';
import {
  sectionStyle,
  sectionTitleStyle,
  favoritesGridStyle,
  favoriteCardStyle,
  favoriteImageContainerStyle,
  favoriteImageStyle,
  favoriteInfoStyle,
  favoriteNameStyle,
  emptyStateStyle,
  emptyTextStyle,
  exploreButtonStyle
} from '../../styles/home.styles';

interface FavoritesListProps {
  favorites: Character[];
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites }) => {
  return (
    <section style={sectionStyle} className="section">
      <h2 style={sectionTitleStyle}>🔖 Últimos Favoritos</h2>
      {favorites.length > 0 ? (
        <div style={favoritesGridStyle}>
          {favorites.map(char => (
            <Link
              to={`/personagens/${char.originalCharacterId}`}
              key={char.id}
              style={favoriteCardStyle}
              className="favorite-card"
            >
              <div style={favoriteImageContainerStyle}>
                <img src={char.image} alt={char.name} style={favoriteImageStyle} />
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
  );
};

export default FavoritesList;
