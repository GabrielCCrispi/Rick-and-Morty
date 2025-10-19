import React from 'react';
import {
  headerStyle,
  headerIconStyle,
  titleStyle,
  subtitleStyle
} from '../../styles/home.styles';

const DashboardHeader: React.FC = () => {
  return (
    <div style={headerStyle}>
      <div style={headerIconStyle} className="header-icon">🌀</div>
      <h1 style={titleStyle}>Dashboard Rick and Morty</h1>
      <p style={subtitleStyle}>Explore o multiverso de Rick and Morty</p>
    </div>
  );
};

export default DashboardHeader;
