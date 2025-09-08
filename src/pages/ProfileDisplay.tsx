
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/Store';
import { fetchProfile, deleteProfileAsync, setProfile } from '../redux/ProfileSlice';
import { useNavigate } from 'react-router-dom';

const ProfileDisplay: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const profileState = useSelector((s: RootState) => s.profile);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem('profile');
    if (local) {
      try {
        const p = JSON.parse(local);
        dispatch(setProfile(p));
        return;
      } catch (e) {}
    }
    dispatch(fetchProfile());
  }, [dispatch]);

  const onDelete = async () => {
    try {
      await dispatch(deleteProfileAsync()).unwrap();
      setConfirmOpen(false);
      navigate('/profile-form');
    } catch (err) {
      console.error(err);
      setConfirmOpen(false);
    }
  };

  if (profileState.status === 'loading') return <Typography>Loading...</Typography>;

  if (!profileState.profile) {
    return (
      <Card>
        <CardContent>
          <Typography>No profile found.</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/profile-form')}>
            Create Profile
          </Button>
        </CardContent>
      </Card>
    );
  }

  const p = profileState.profile;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Profile</Typography>
        <Typography><strong>Name:</strong> {p.name}</Typography>
        <Typography><strong>Email:</strong> {p.email}</Typography>
        <Typography><strong>Age:</strong> {p.age ?? '—'}</Typography>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" onClick={() => navigate('/profile-form')}>Edit</Button>
          <Button variant="outlined" color="error" onClick={() => setConfirmOpen(true)}>Delete</Button>
        </Box>
      </CardContent>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete your profile?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={onDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProfileDisplay;
