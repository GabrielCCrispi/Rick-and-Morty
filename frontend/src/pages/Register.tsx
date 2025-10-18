import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { localApi } from '../services/api';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const response = await localApi.post('/auth/register', {
        name,
        email,
        password,
      });

      // Fazer login automático após o cadastro
      const { id, name: userName, email: userEmail } = response.data;
      localStorage.setItem('userId', id.toString());
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail', userEmail);

      toast.success('Cadastro realizado com sucesso! Bem-vindo(a)!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Ocorreu um erro. Verifique se o e-mail já não está em uso.');
      }
      console.error('Falha no cadastro:', err);
    }
  };

  return (
    <div style={pageContainerStyle}>
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      <div style={formContainerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>✨ Cadastro</h1>
          <p style={subtitleStyle}>Crie sua conta e comece a explorar</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          {error && (
            <div style={errorBoxStyle}>
              <span style={errorTextStyle}>⚠️ {error}</span>
            </div>
          )}

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Nome</label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <small style={hintStyle}>Mínimo de 6 caracteres</small>
          </div>

          <button type="submit" style={buttonStyle}>
            Criar Conta
          </button>
        </form>

        <div style={footerStyle}>
          <p style={footerTextStyle}>
            Já tem uma conta?{' '}
            <Link to="/login" style={linkStyle}>
              Faça o login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const pageContainerStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
};

const formContainerStyle: React.CSSProperties = {
  maxWidth: '480px',
  width: '100%',
  background: '#1f2937',
  borderRadius: '20px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
  border: '2px solid #374151',
  overflow: 'hidden',
};

const headerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
  padding: '2rem',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  margin: '0',
  fontSize: '2.5rem',
  fontWeight: '800',
  color: 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
};

const subtitleStyle: React.CSSProperties = {
  margin: '0.5rem 0 0 0',
  fontSize: '1rem',
  color: 'rgba(255, 255, 255, 0.9)',
};

const formStyle: React.CSSProperties = {
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  fontWeight: '600',
  color: '#97F14A',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const inputStyle: React.CSSProperties = {
  padding: '0.875rem 1rem',
  fontSize: '1rem',
  borderRadius: '10px',
  border: '2px solid #374151',
  background: '#111827',
  color: 'white',
  outline: 'none',
  transition: 'all 0.3s ease',
};

const hintStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: '#6b7280',
  fontStyle: 'italic',
};

const buttonStyle: React.CSSProperties = {
  padding: '1rem',
  fontSize: '1.1rem',
  fontWeight: '700',
  cursor: 'pointer',
  background: 'linear-gradient(135deg, #97F14A 0%, #84cc16 100%)',
  color: '#1f2937',
  border: '2px solid #97F14A',
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 8px rgba(151, 241, 74, 0.3)',
  marginTop: '0.5rem',
};

const errorBoxStyle: React.CSSProperties = {
  background: '#fecaca',
  border: '2px solid #ef4444',
  borderRadius: '10px',
  padding: '1rem',
};

const errorTextStyle: React.CSSProperties = {
  color: '#7f1d1d',
  fontSize: '0.95rem',
  fontWeight: '600',
};

const footerStyle: React.CSSProperties = {
  padding: '1.5rem 2rem',
  background: '#111827',
  textAlign: 'center',
  borderTop: '1px solid #374151',
};

const footerTextStyle: React.CSSProperties = {
  margin: '0',
  color: '#9ca3af',
  fontSize: '0.95rem',
};

const linkStyle: React.CSSProperties = {
  color: '#97F14A',
  textDecoration: 'none',
  fontWeight: '700',
  transition: 'all 0.3s ease',
};

export default RegisterPage;
