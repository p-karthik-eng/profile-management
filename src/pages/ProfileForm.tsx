
import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Card, CardContent, Typography, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/Store';
import { saveProfileAsync, setProfile } from '../redux/ProfileSlice';
import { useNavigate } from 'react-router-dom';



const isEmail = (v: string) =>
  /^(?=.*\d)[a-zA-Z0-_%+-]+@gmail\.com$/.test(v);


const ProfileForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const stored = useSelector((s: RootState) => s.profile.profile);

  const [name, setName] = useState(stored?.name || '');
  const [email, setEmail] = useState(stored?.email || '');
  const [age, setAge] = useState<string>(stored?.age ? String(stored.age) : '');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null); // field-level error

  const isEditMode = !!stored;
  const heading = isEditMode ? "Edit Profile" : "Create Profile";

  useEffect(() => {
    if (stored) {
      setName(stored.name);
      setEmail(stored.email);
      setAge(stored.age ? String(stored.age) : '');
    }
  }, [stored]);

 const validate = () => {
  if (!name || name.trim().length < 3) return 'Name is required (min 3 chars)';
  if (!email || !isEmail(email)) {
    setEmailError("Email must be a valid Gmail address (e.g. user1@gmail.com) and contain at least one digit.");
    return "Invalid email";
  }
  setEmailError(null);
  if (age && isNaN(Number(age))) return 'Age must be a number';
  return null;
};
// ...existing code...
const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const v = validate();
  if (v) {
    setError(v);
    return;
  }
  setError(null);
  const profile = { name: name.trim(), email: email.trim(), age: age ? Number(age) : undefined };
  try {
    const result = await dispatch(saveProfileAsync(profile as any)).unwrap();
    dispatch(setProfile(result));
    if (isEditMode) {
      setSuccess("Profile updated successfully 🎉");
    } else {
      setSuccess("Profile created successfully 🎉");
    }
    // Wait 1 second before navigating so user sees the success message
    setTimeout(() => {
      navigate('/profile');
    }, 1000);
  } catch (err: any) {
    setError(err?.message || 'Failed to save');
  }
};


  return (
    <Card>
      <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {heading}
          </Typography>

           

        <Box component="form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
       <TextField
  label="Email"
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  required
  error={!!emailError}
  helperText={emailError || "Enter a Gmail address with at least one digit (e.g. user1@gmail.com)"}
/>

          <TextField
            label="Age"
            value={age}
            onChange={e => setAge(e.target.value)}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained">
              {isEditMode ? "Update" : "Create"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setName('');
                setEmail('');
                setAge('');
                setEmailError(null);
                dispatch(setProfile(null));
                localStorage.removeItem('profile');
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>

        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>

        <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess(null)}>
          <Alert severity="success" onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
