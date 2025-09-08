
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProfileForm from './pages/ProfileForm';
import ProfileDisplay from './pages/ProfileDisplay';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import Container from '@mui/material/Container';

const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" replace />} />
          <Route path="/profile-form" element={<ProfileForm />} />
          <Route path="/profile" element={<ProfileDisplay />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
