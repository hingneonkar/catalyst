import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import SubmissionForm from './components/SubmissionForm';
import SubmissionList from './components/SubmissionList';

import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path="/" element={<SubmissionForm />} />
          <Route path="/admin" element={<SubmissionList />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

function NavigationBar() {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          📚 Learning Portal
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            borderBottom: location.pathname === '/' ? '2px solid white' : 'none',
            borderRadius: 0
          }}
        >
          Submit Synopsis
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/admin"
          sx={{
            borderBottom: location.pathname === '/admin' ? '2px solid white' : 'none',
            borderRadius: 0
          }}
        >
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default App;
