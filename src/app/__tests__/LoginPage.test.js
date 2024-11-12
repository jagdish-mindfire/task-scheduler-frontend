// __tests__/LoginPage.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import LoginPage from '../login/page.js';
import useAuth from '../hooks/useAuth';

// Mock next/router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock useAuth hook
jest.mock('../hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('LoginPage', () => {
  let loginMutationMock;

  beforeEach(() => {
    loginMutationMock = { mutate: jest.fn(), isPending: false };
    useAuth.mockReturnValue({ loginMutation: loginMutationMock });
    useRouter.mockReturnValue({ push: jest.fn() });
  });

  test('renders login page components correctly', () => {
    render(<LoginPage />);

    // Check that all the main elements are rendered
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
  });

  test('shows validation errors on submit with empty fields', async () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test('calls loginMutation on submit with valid data', async () => {
    render(<LoginPage />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(loginMutationMock.mutate).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  test('disables submit button and shows loading state when login is pending', () => {
    loginMutationMock.isPending = true;
    render(<LoginPage />);

    const button = screen.getByRole('button', { name: /Signing in/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Signing in...');
  });

  test('redirects to signup page on "Sign up" button click', () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    render(<LoginPage />);

    fireEvent.click(screen.getByText(/Sign up/i));
    expect(push).toHaveBeenCalledWith('/signup');
  });
});
