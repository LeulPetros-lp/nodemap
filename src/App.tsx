import { CssVarsProvider, Sheet } from '@mui/joy';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';

import { CssBaseline } from '@mui/joy';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Auth from './pages/Auth';
import CreatePath from './pages/CreatePath';
import ProtectedRoute from './components/ProtectedRoute';
import LearningPath from './pages/LearningPath';
import MindMap from './pages/MindMap';
import InteractiveMindMap from './pages/InteractiveMindMap';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CssVarsProvider defaultMode="dark">
          <CssBaseline />
          <Sheet
            sx={{
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '300',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflowX: 'hidden',
            }}
          >
            <PageTransition />
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/signup" element={<Auth />} />
                <Route 
                  path="/create" 
                  element={
                    <ProtectedRoute>
                      <CreatePath />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/learning-path" 
                  element={
                    <ProtectedRoute>
                      <LearningPath />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/mindmap" 
                  element={
                    <ProtectedRoute>
                      <InteractiveMindMap />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </Sheet>
        </CssVarsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
