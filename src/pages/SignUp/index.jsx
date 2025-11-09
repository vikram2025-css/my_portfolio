import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../components/InputField';
import {
  Paper,
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Stack,
  Button as MuiButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Email, Lock } from '@mui/icons-material';
import backgroundImage from "../../assets/images/SignUpBackground.png"; // Adjust path to your image


const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
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
    fontSize: { xs: '0.9rem', sm: '1rem' },
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

const SignUp = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const generateToken = (email) => {
    return btoa(`${email}-${Date.now()}`);
  };

  const handleSignUp = (data) => {
    const token = generateToken(data.email);
    localStorage.setItem("authToken", token);
    console.log("Signup successful:", data);
    console.log("Generated Token:", token);
    navigate("/login");
  };

  // Add this import at the top of your file for background image
  // import backgroundImage from './assets/signup-bg.jpg'; // Adjust path to your image

  // Signup Form Component
  const SignupForm = () => (
    <form onSubmit={handleSubmit(handleSignUp)} noValidate>
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
            Sign Up
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
            Create your account to get started
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
          type="email"
          register={register}
          error={errors.email?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{
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
                  onClick={() => setShowPassword((prev) => !prev)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={inputFieldSx}
        />

        {/* Confirm Password Field */}
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          register={register}
          error={errors.confirmPassword?.message}
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
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                  size="small"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={inputFieldSx}
        />

        {/* Submit Button */}
        <MuiButton
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{
            mt: { xs: 1, sm: 1.5 },
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
          {isSubmitting ? 'Creating Account…' : 'Sign Up'}
        </MuiButton>

        {/* Sign in link */}
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
          Already have an account?{' '}
          <Link to="/login">
            Sign in here
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
          minHeight: '100vh',
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
          <Typography variant="h4" sx={{ color: '#333', fontWeight: 700, mb: 2 }}>
            Join Us Today
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
            Create your account to get started
          </Typography>

          <SignupForm />
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
          <Box sx={{
            textAlign: 'center',
            // position: 'relative', 
            // zIndex: 2 
          }}>
            <Typography
              variant="h2"
              sx={{

                fontWeight: 700,

                mb: 3,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Join Us Today
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#faf8f8ff',
                fontWeight: 300,
                lineHeight: 1.6,
                // For background image, change to:
                // color: 'rgba(255,255,255,0.95)',
                // textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              Create your account and start your amazing journey with us
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Signup Form (40% width) */}
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
            <SignupForm />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;
