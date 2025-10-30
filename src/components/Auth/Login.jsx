import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import './Login.scss';

export default function Login({ onLoginSuccess }) {
  const dispatch = useDispatch();

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      // Decode JWT token từ Google
      const decoded = jwtDecode(credentialResponse.credential);
      
      const userData = {
        user: {
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
        },
        token: credentialResponse.credential,
      };

      // Dispatch login success
      dispatch(loginSuccess(userData));
      
      // Callback nếu có
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }

      console.log('Login successful:', userData);
    } catch (error) {
      console.error('Error decoding token:', error);
      dispatch(loginFailure('Failed to decode token'));
    }
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
    dispatch(loginFailure('Google login failed'));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>🌸 Welcome to Orchid Gallery</h2>
          <p>Sign in to manage your orchid collection</p>
        </div>
        
        <div className="login-content">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </div>

        <div className="login-footer">
          <p className="text-muted">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
