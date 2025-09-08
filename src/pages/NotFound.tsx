
import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const nav = useNavigate();
  return (
    <Box>
      <Typography variant="h4">404 — Page Not Found</Typography>
      <Button sx={{ mt: 2 }} variant="contained" onClick={() => nav('/')}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
