import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import SignupPage from '../login/page';
import useAuth from '../hooks/useAuth';

// Mock the Next.js router and useAuth hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SignupPage', () => {
  let signupMutationMock;
  let push;

  beforeEach(() => {
    signupMutationMock = { mutate: jest.fn(), isPending: false };
    useAuth.mockReturnValue({ signupMutation: signupMutationMock });
    push = jest.fn();
    useRouter.mockReturnValue({ push });
  });

  test('renders signup form fields and submit button', () => {
    render(<SignupPage />);

    // Check for form fields
    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Create a password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm your password/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /Create account/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields when submitting the form', async () => {
    render(<SignupPage />);

    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm password is required/i)).toBeInTheDocument();
    });
  });

  test('calls signupMutation with correct data when form is valid', async () => {
    render(<SignupPage />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Create a password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm your password/i), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => {
      expect(signupMutationMock.mutate).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
    });
  });

  test('displays loading state when signup is pending', () => {
    signupMutationMock.isPending = true;
    render(<SignupPage />);

    const button = screen.getByRole('button', { name: /Creating account/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Creating account...');
  });

  test('redirects to login page on "Sign in" button click', () => {
    render(<SignupPage />);

    fireEvent.click(screen.getByText(/Sign in/i));
    expect(push).toHaveBeenCalledWith('/login');
  });
});
