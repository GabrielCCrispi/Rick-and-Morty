import React from 'react';
import { loadingStyle } from '../../styles/home.styles';

const LoadingSpinner: React.FC = () => {
  return (
    <div style={loadingStyle}>
      Carregando dashboard...
    </div>
  );
};

export default LoadingSpinner;
