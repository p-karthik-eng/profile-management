
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Profile, api } from '../api';

export interface ProfileState {
  profile: Profile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}

const initialState: ProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};


export const fetchProfile = createAsyncThunk('profile/fetch', async () => {
  const p = await api.getProfile();
  return p;
});

export const saveProfileAsync = createAsyncThunk(
  'profile/save',
  async (profile: Profile) => {
    const res = await api.saveProfile(profile);
    return res;
  }
);

export const deleteProfileAsync = createAsyncThunk('profile/delete', async () => {
  await api.deleteProfile();
  return null;
});


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile | null>) {
      state.profile = action.payload;
     
      if (action.payload) {
        localStorage.setItem('profile', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('profile');
      }
    },
  },
  extraReducers(builder) {
    builder
      
      .addCase(fetchProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload as any;
        if (action.payload) {
          localStorage.setItem('profile', JSON.stringify(action.payload));
        }
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch';
      })

      
      .addCase(saveProfileAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(saveProfileAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload as any;
        if (action.payload) {
          localStorage.setItem('profile', JSON.stringify(action.payload));
        }
      })
      .addCase(saveProfileAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to save';
      })

      .addCase(deleteProfileAsync.fulfilled, state => {
        state.profile = null;
        localStorage.removeItem('profile');
      });
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
