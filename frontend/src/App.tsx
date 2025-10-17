import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import MyCharacters from './pages/MyCharacter';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

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
          <Route path="/" element={<Home/>} />
          <Route path="/personagens" element={<Characters/>} />
          <Route path="/personagens/:id" element={<CharacterDetail/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/cadastro" element={<Register/>} />
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