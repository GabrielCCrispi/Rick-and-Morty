import React from 'react';
import {
  sectionStyle,
  sectionTitleStyle,
  userStatContainerStyle,
  userStatCardStyle,
  userStatIconStyle,
  userStatNumberStyle,
  userStatLabelStyle
} from '../../styles/home.styles';

interface UserStatsProps {
  favCount: number;
}

const UserStats: React.FC<UserStatsProps> = ({ favCount }) => {
  return (
    <section style={sectionStyle} className="section">
      <h2 style={sectionTitleStyle}>⭐ Meus Dados</h2>
      <div style={userStatContainerStyle}>
        <div style={userStatCardStyle}>
          <div style={userStatIconStyle}>💾</div>
          <div>
            <h3 style={userStatNumberStyle}>{favCount}</h3>
            <p style={userStatLabelStyle}>Personagens Salvos</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserStats;
