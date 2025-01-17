import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { showToastNotify } from '../../redux-saga-middleware_admin/reducers/adminAlertReducer';
import { adminLogin } from '../../redux-saga-middleware_admin/reducers/adminAuthReducer';
import "./login.css";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Gad Game '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {
  const dispatch = useDispatch()
  const { isLogin } = useSelector(state => state.adminAuthReducer)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(!data.get("username")) {
      dispatch(showToastNotify({ type: "warning", message: "Please enter username" }))
      return
    }

    if(!data.get("password")) {
      dispatch(showToastNotify({ type: "warning", message: "Please enter password" }))
      return
    }

    if(!isLogin) {
      dispatch(adminLogin({
        username: data.get('username'),
        password: data.get('password'),
      }))
    }
  };

  const tokenAdmin = localStorage.getItem("token_admin")

  return (
    <ThemeProvider theme={defaultTheme}>
      {tokenAdmin ? <Navigate to={"/"}/> : ""}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            {!isLogin ? (
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
            ) : (
              <CircularProgress/>
            )}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete='username'
                autoFocus
                className='login'
                sx={{
                  ".MuiInputBase-input:-webkit-autofill": {
                    WebkitTextFillColor: "#000 !important"
                  },
                  ".MuiInputBase-input:hover": {
                    WebkitTextFillColor: "#000 !important"
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className='login'
                sx={{
                  ".MuiInputBase-input:-webkit-autofill": {
                    WebkitTextFillColor: "#000 !important"
                  },
                  ".MuiInputBase-input:hover": {
                    WebkitTextFillColor: "#000 !important"
                  }
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}