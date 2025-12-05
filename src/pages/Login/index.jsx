import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../components/Common/InputField';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Button as MuiButton } from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import useAuthStore from '../../store/useAuthStore';
import backgroundImage from "../../assets/images/LoginBackground.png"; // Adjust path to your image

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Min 6 characters')
    .max(10, 'Max 10 characters')
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/[0-9]/, "At least one number")
    .matches(/[@$!%\*?&]/, "At least one special character")
    .matches(/^(?!.*\\s).*$/, "No spaces allowed"),
});

const inputFieldSx = {
  '& .MuiInputLabel-root': {
    color: '#64748b',
    fontWeight: 600,
    fontSize: '0.95rem',
    '&.Mui-focused': {
      color: '#667eea',
    },
    '&.Mui-error': {
      color: '#e53e3e',
    },
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    backgroundColor: 'rgba(248,250,252,0.8)',
    transition: 'all 0.3s ease',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(148,163,184,0.3)',
      borderWidth: 1.5,
    },
    '&:hover': {
      backgroundColor: '#fff',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#667eea',
      },
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
      transform: 'translateY(-1px)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#667eea',
        borderWidth: 2,
        boxShadow: '0 0 0 4px rgba(102,126,234,0.1)',
      },
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e53e3e',
    },
  },
  '& input:-webkit-autofill': {
    boxShadow: '0 0 0 100px rgba(248,250,252,0.8) inset',
    WebkitTextFillColor: '#1e293b',
    transition: 'background-color 5000s ease-in-out 0s',
  },
};

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleLogin = (data) => {
    const success = login(data.email, data.password);

    if (success) {
      console.log("Login successful for:", data.email);
      navigate("/dashboard");
    } else {
      alert("No account found. Please sign up first.");
    }
  };

  const handleGuestLogin = () => {
    const token = btoa(`guest-${Date.now()}`);
    const userData = { email: "Guest", name: "Guest User", role: "guest" };

    // Save in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(userData));

    // Update Zustand store
    useAuthStore.setState({ isAuthenticated: true, user: userData });

    // Navigate to dashboard
    navigate("/");
  };


  // Login Form Component
  const LoginForm = () => (

    <form onSubmit={handleSubmit(handleLogin)} noValidate>
      <Stack spacing={{ xs: 2, sm: 2.25 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 1, sm: 1 } }}>
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 600,
              color: '#333',
              textAlign: 'center',
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' }
            }}
          >
            Sign In
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: '#666',
              textAlign: 'center',
              fontSize: { xs: '0.85rem', sm: '1rem' }
            }}
          >
            Enter your credentials to access your account
          </Typography>
        </Box>

        {serverError && (
          <Box
            role="alert"
            aria-live="assertive"
            sx={{
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              color: '#7f1d1d',
              border: '1px solid #f87171',
              px: { xs: 1.5, sm: 2 },
              py: { xs: 1.25, sm: 1.5 },
              borderRadius: { xs: 2, sm: 3 },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              fontWeight: 500,
              boxShadow: '0 4px 12px rgba(248,113,113,0.2)',
            }}
          >
            {serverError}
          </Box>
        )}

        {/* Email Field */}
        <InputField
          label="Email"
          name="email"
          type="text"
          register={register}
          error={errors.email?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{
                  color: '#94a3b8',
                  fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }} />
              </InputAdornment>
            ),
          }}
          sx={inputFieldSx}
        />

        {/* Password Field */}
        <InputField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          register={register}
          error={errors.password?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{
                  color: '#94a3b8',
                  fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword((s) => !s)}
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={inputFieldSx}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Typography
            variant='body2'
            sx={{
              color: '#7f8087ff',
              fontWeight: 500,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              '& a': {
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' }
              }
            }}
          >
            <Link>  Forgot  Password ?</Link>
          </Typography>
        </Box>

        <MuiButton
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mb: 3,
            py: { xs: 1.25, sm: 1.5 },
            fontWeight: 700,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            letterSpacing: 0.3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 12px 24px rgba(102,126,234,0.4), 0 4px 8px rgba(0,0,0,0.1)',
            textTransform: 'none',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 16px 32px rgba(102,126,234,0.5), 0 8px 16px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
            },
            '&:active': {
              transform: 'translateY(-1px)',
              boxShadow: '0 8px 16px rgba(102,126,234,0.4)',
            },
            '&:disabled': {
              background: 'linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transform: 'none',
            },
          }}
        >
          Sign In
        </MuiButton>

        <MuiButton
          variant='outlined'
          onClick={handleGuestLogin}
          sx={{
            width: '50%',
            alignSelf: 'center',
            borderColor: '#8445f9ff',
            color: '#929094ff',
            boxShadow: '0 4px 8px rgba(102,126,234,0.2)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 16px rgba(102,126,234,0.3)',
              borderColor: '#667eea',
              backgroundColor: '#eaf3f6df'
            },
            '&:active': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 8px rgba(102,126,234,0.2)',
            },
          }}
        >
          Guest Login
        </MuiButton>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            mt: { xs: 1.5, sm: 2 },
            color: '#64748b',
            fontWeight: 500,
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            '& a': {
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: 600,
              position: 'relative',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#4f46e5',
                textDecoration: 'underline',
              },
            }
          }}
        >
          Don't have an account?{' '}
          <Link to="/SignUp">
            Sign up here
          </Link>
        </Typography>
      </Stack>
    </form>
  );

  if (isMobile) {
    // Mobile layout - stack vertically
    return (
      <Box
        sx={{
          Height: '100vh',
          mt: 11,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          p: 2,
        }}
      >
        <Paper
          elevation={24}
          sx={{
            width: '100%',
            maxWidth: 400,
            p: 4,
            borderRadius: 0,
            background: 'white',
            textAlign: 'center',
          }}
        >


          <LoginForm />
        </Paper>
      </Box>
    );
  }

  // Desktop layout - side by side
  return (
    <Box
      sx={{
        Height: '100vh',
        mt: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        p: 2,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: 1200,
          height: 550,
          borderRadius: 0,
          background: 'white',
        }}
      >
        {/* Left Side - Welcome Section (60% width) */}
        <Box
          sx={{
            flex: '60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',

          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                color: 'white', // Changed to white for better visibility
                fontWeight: 700,
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // Better text shadow
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)', // White text
                fontWeight: 300,
                lineHeight: 1.6,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)', // Text shadow for readability
              }}
            >
              Sign in to continue your amazing journey with us
            </Typography>
          </Box>
        </Box>
        {/* Right Side - Login Form (40% width) */}
        <Box
          sx={{
            flex: '40%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            borderLeft: '1px solid #f0f0f0',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 350 }}>
            <LoginForm />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
