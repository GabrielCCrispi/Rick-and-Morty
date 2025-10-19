import React from 'react';
import {
  sectionStyle,
  sectionTitleStyle,
  statsGridStyle,
  statCardStyle,
  statIconStyle,
  statNumberStyle,
  statLabelStyle
} from '../../styles/home.styles';

interface Stats {
  characters: number;
  locations: number;
  episodes: number;
}

interface StatsGridProps {
  stats: Stats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <section style={sectionStyle} className="section">
      <h2 style={sectionTitleStyle}>📊 Estatísticas da API</h2>
      <div style={statsGridStyle}>
        <div
          className="stat-card"
          style={{
            ...statCardStyle,
            background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
            boxShadow: '0 8px 32px rgba(8, 145, 178, 0.25)',
            animationDelay: '0.1s'
          }}
        >
          <div style={statIconStyle}>👥</div>
          <h3 style={statNumberStyle}>{stats.characters}</h3>
          <p style={statLabelStyle}>PERSONAGENS</p>
        </div>

        <div
          className="stat-card"
          style={{
            ...statCardStyle,
            background: 'linear-gradient(135deg, #c026d3 0%, #9333ea 100%)',
            boxShadow: '0 8px 32px rgba(192, 38, 211, 0.25)',
            animationDelay: '0.2s'
          }}
        >
          <div style={statIconStyle}>🌍</div>
          <h3 style={statNumberStyle}>{stats.locations}</h3>
          <p style={statLabelStyle}>LOCALIZAÇÕES</p>
        </div>

        <div
          className="stat-card"
          style={{
            ...statCardStyle,
            background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
            boxShadow: '0 8px 32px rgba(132, 204, 22, 0.25)',
            animationDelay: '0.3s'
          }}
        >
          <div style={statIconStyle}>📺</div>
          <h3 style={statNumberStyle}>{stats.episodes}</h3>
          <p style={statLabelStyle}>EPISÓDIOS</p>
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;
