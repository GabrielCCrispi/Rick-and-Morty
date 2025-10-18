import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { localApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { id: string; name: string; email: string } | null;
  login: (email, password) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se há dados de autenticação salvos
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');

        if (token) {
          // Valida o token com o backend
          const response = await localApi.get('/auth/verify');
          const { id, name, email } = response.data;

          setUser({ id: id.toString(), name, email });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Se houver erro, limpa os dados
        localStorage.removeItem('access_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await localApi.post('/auth/login', { email, password });
      const { id, name, email: userEmail, access_token } = response.data;

      // Salva token JWT e dados do usuário
      localStorage.setItem('access_token', access_token);
      const userData = { id: id.toString(), name, email: userEmail };
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', userData.email);

      setUser(userData);
      setIsAuthenticated(true);

      // Redireciona para a página de origem ou home
      navigate('/');
    } catch (error) {
      console.error('Falha no login:', error);
      throw new Error('Email ou senha inválidos.');
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};