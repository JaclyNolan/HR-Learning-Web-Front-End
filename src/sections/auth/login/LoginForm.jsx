import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import BACKEND_URL from '../../../url';
import axiosClient from '../../../axios-client';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setToken } = useAuth();
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const handleButtonLogin = (userType) => {
    setError(null);

    let payload = {};

    // Set predetermined information based on user type
    if (userType === 'Admin') {
      payload = { email: 'anhbg330011@gmail.com', password: 'password' };
    } else if (userType === 'Trainer') {
      payload = { email: 'kunde.augustus@example.net', password: 'password' };
    } else if (userType === 'Trainee') {
      payload = { email: 'selena.zieme@example.net', password: 'password' };
    }

    // Set input values for display purposes
    document.getElementsByName('email')[0].value = payload.email;
    document.getElementsByName('password')[0].value = payload.password;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFetching(true);
    try {
      const data = new FormData(event.currentTarget);
      const payload = {
        email: data.get('email'),
        password: data.get('password'),
      }

      /**
       * @return "user": {
          "name": "Horace Goodwin",
          "email": "anhbg330011@gmail.com"
          },
          "role": "admin",
          "token": "9|1tCCTCDXcRqRSoOISIqnk0jDP5nYCs0L23m1jGho"
      */
      const response = await axiosClient.post(BACKEND_URL.LOGIN_ENDPOINT, payload);
      const { user, token } = response.data;
      setUser(user);
      setToken(token);
    } catch (error) {
      setError("Login failed. Please check your credenttials");
    } finally {
      setFetching(false);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" required autoFocus />

        <TextField
          name="password"
          label="Password"
          required
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel
          value="remember_me"
          control={<Checkbox />}
          label="Remember me"
          labelPlacement="end"
        />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</div>
      )}

      <Stack direction="row" spacing={2} style={{ justifyContent: 'center', marginBottom: '1rem' }}>
        <Button variant="contained" onClick={() => handleButtonLogin('Admin')}>
          Admin
        </Button>
        <Button variant="contained" onClick={() => handleButtonLogin('Trainer')}>
          Trainer
        </Button>
        <Button variant="contained" onClick={() => handleButtonLogin('Trainee')}>
          Trainee
        </Button>
      </Stack>

      <LoadingButton loading={isFetching} fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
    </form>
  );
}
