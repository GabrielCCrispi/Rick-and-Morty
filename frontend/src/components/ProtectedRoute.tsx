import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

/**
 * Middleware para proteção de rotas
 *
 * Funcionalidades:
 * - Verifica autenticação do usuário
 * - Loading state durante verificação
 * - Salva URL de destino para redirecionar após login
 * - Permite configuração de rota de redirecionamento
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/login'
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Simula verificação assíncrona (pode ser substituída por validação de token no backend)
    const checkAuth = async () => {
      // Aqui você pode adicionar lógica adicional como:
      // - Validar token no backend
      // - Verificar permissões específicas
      // - Refresh token se necessário

      setIsChecking(false);
    };

    checkAuth();
  }, []);

  // Loading state enquanto verifica autenticação
  if (isLoading || isChecking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '1.5rem',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          border: '6px solid rgba(0, 212, 255, 0.2)',
          borderTop: '6px solid #00d4ff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}></div>
        <p style={{
          color: '#FFF',
          fontSize: '1.3rem',
          fontWeight: '600',
          textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
        }}>
          Verificando autenticação...
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Se precisa de autenticação mas não está autenticado
  if (requireAuth && !isAuthenticated) {
    // Salva a URL atual para redirecionar após o login
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location.pathname, returnUrl: location.pathname }}
        replace
      />
    );
  }

  // Se não precisa de autenticação mas está autenticado (ex: página de login)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Renderiza o conteúdo protegido
  return <>{children}</>;
};

/**
 * Hook personalizado para facilitar proteção de rotas com condições específicas
 */
export const useProtectedRoute = (condition: boolean, redirectTo: string = '/') => {
  const location = useLocation();

  if (!condition) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  return null;
};
