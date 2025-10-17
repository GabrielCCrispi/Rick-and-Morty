import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={inputStyle}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Entrar</button>
      </form>
      <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
    </div>
  );
};

const formContainerStyle: React.CSSProperties = {
  maxWidth: '400px',
  margin: '2rem auto',
  padding: 'clamp(1rem, 4vw, 2rem)',
  border: '1px solid #ccc',
  borderRadius: '8px',
  width: '100%',
};
const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};
const inputStyle: React.CSSProperties = {
  padding: '0.8rem',
  fontSize: '1rem'
};
const buttonStyle: React.CSSProperties = {
  padding: '0.8rem',
  fontSize: '1rem',
  cursor: 'pointer',
  backgroundColor: '#61dafb',
  border: 'none',
  borderRadius: '4px'
};

export default LoginPage;