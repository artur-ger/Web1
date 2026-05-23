import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { adminApi } from './adminApi';

const TOKEN_KEY = 'admin_access_token';

interface AuthState {
  token: string | null;
  user: { login: string; full_name: string } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem(TOKEN_KEY),
  user: null,
  status: 'idle',
  error: null,
};

export const loginAdmin = createAsyncThunk(
  'auth/login',
  async ({ login, password }: { login: string; password: string }) => {
    return adminApi.login(login, password);
  },
);

export const fetchAdminMe = createAsyncThunk('auth/me', async (_, { getState }) => {
  const token = (getState() as { auth: AuthState }).auth.token;
  if (!token) throw new Error('Нет токена');
  return adminApi.getMe(token);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        localStorage.setItem(TOKEN_KEY, action.payload.access_token);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка входа';
      })
      .addCase(fetchAdminMe.fulfilled, (state, action) => {
        state.user = {
          login: action.payload.login,
          full_name: action.payload.full_name,
        };
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
