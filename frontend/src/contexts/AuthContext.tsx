import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { localApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email, password) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await localApi.post('/auth/login', { email, password });
      const { id, name, email: userEmail } = response.data;
      localStorage.setItem('userId', id.toString());
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', userEmail);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Falha no login:', error);

      throw new Error('Email ou senha inválidos.');
    }
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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