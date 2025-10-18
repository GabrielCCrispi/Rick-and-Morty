import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import MyCharacters from './pages/MyCharacter';

function AppRoutes() {
  const containerStyle: React.CSSProperties = {
    padding: 'clamp(1rem, 3vw, 2rem)',
    maxWidth: '1400px',
    margin: '0 auto',
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home/>} />
          <Route path="/personagens" element={<Characters/>} />
          <Route path="/personagens/:id" element={<CharacterDetail/>} />

          {/* Rotas de autenticação (redireciona para home se já autenticado) */}
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <Login/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cadastro"
            element={
              <ProtectedRoute requireAuth={false}>
                <Register/>
              </ProtectedRoute>
            }
          />

          {/* Rotas protegidas (requer autenticação) */}
          <Route
            path="/meus-personagens"
            element={
              <ProtectedRoute>
                <MyCharacters/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
    </Router>
  );
}

export default App;