import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FirebaseRegister = ({ ...rest }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const formData = {
        username: values.username,
        email: values.email,
        password: values.password 
      };
  
      const response = await axios.post('https://leads-generation.onrender.com/auth/signup', formData);
      if (response.status === 200) {
        navigate('/login');

        
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setFieldError('submit', 'Registration failed. Please try again.');
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
    setSubmitting(false);
  };
  

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form noValidate onSubmit={props.handleSubmit} {...rest}>
            <TextField
              error={Boolean(props.touched.username && props.errors.username)}
              fullWidth
              helperText={props.touched.username && props.errors.username}
              label="Username"
              margin="normal"
              name="username"
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              type="text"
              value={props.values.username}
              variant="outlined"
            />
            <TextField
              error={Boolean(props.touched.email && props.errors.email)}
              fullWidth
              helperText={props.touched.email && props.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              type="email"
              value={props.values.email}
              variant="outlined"
            />
            <FormControl
              fullWidth
              error={Boolean(props.touched.password && props.errors.password)}
              sx={{ mt: theme.spacing(3), mb: theme.spacing(1) }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={props.values.password}
                name="password"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {props.touched.password && props.errors.password && (
                <FormHelperText error id="standard-weight-helper-text">
                  {' '}
                  {props.errors.password}{' '}
                </FormHelperText>
              )}
            </FormControl>
            {props.errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{props.errors.submit}</FormHelperText>
              </Box>
            )}
            <Box mt={2}>
              <Button color="primary" disabled={props.isSubmitting} fullWidth size="large" type="submit" variant="contained">
                Register
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
