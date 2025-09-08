
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/Store';

const NavBar: React.FC = () => {
  const profile = useSelector((s: RootState) => s.profile.profile);
  const name = profile?.name || '';
  const [first, last] = name.split(' ', 2);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profile App
          </Typography>
          {profile ? (
            <Typography>
              {first || ''} {last || ''}
            </Typography>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
