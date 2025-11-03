import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, Container } from 'react-bootstrap';

/**
 * ProtectedRoute component - Restricts access to routes based on authentication and role
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render if authorized
 * @param {string} props.requiredRole - Required role to access this route ('admin' or 'member')
 * @param {string} props.redirectTo - Path to redirect if not authorized (default: '/')
 */
const ProtectedRoute = ({ children, requiredRole = 'member', redirectTo = '/' }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <Container className="mt-5">
        <Alert variant="warning" className="text-center">
          <h4>🔒 Authentication Required</h4>
          <p>Please login to access this page.</p>
          <Navigate to={redirectTo} replace />
        </Alert>
      </Container>
    );
  }

  // If authenticated but doesn't have required role
  if (requiredRole === 'admin' && user?.role !== 'admin') {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          <h4>🚫 Access Denied</h4>
          <p>You do not have permission to access this page.</p>
          <p className="mb-0">
            <strong>Required role:</strong> Administrator
          </p>
          <Navigate to={redirectTo} replace />
        </Alert>
      </Container>
    );
  }

  // User is authenticated and has required role
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.oneOf(['admin', 'member']),
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;
