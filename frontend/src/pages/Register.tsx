import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { localApi } from '../services/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      await localApi.post('/auth/register', {
        name,
        email,
        password,
      });
      alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
      navigate('/login'); 
    } catch (err) {
      
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Ocorreu um erro. Verifique se o e-mail já não está em uso.');
      }
      console.error('Falha no cadastro:', err);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input 
          type="text" 
          placeholder="Nome" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={inputStyle}
        />
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
        <button type="submit" style={buttonStyle}>Cadastrar</button>
      </form>
      <p>Já tem uma conta? <Link to="/login">Faça o login</Link></p>
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

export default RegisterPage;