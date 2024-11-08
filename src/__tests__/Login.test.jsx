import { render, fireEvent, waitFor, act } from '@testing-library/react'
import Login from '../pages/Authentication/Login'
import { MemoryRouter } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { userLogin } from '../api/apiLogin'

jest.mock('../hooks/useAuth')
jest.mock('../api/apiLogin') // Mock the API call

describe('Login Component', () => {
  const loginMutationMock = {
    mutate: jest.fn(),
    isPending: false,
  }

  useAuth.mockReturnValue({ loginMutation: loginMutationMock })

  const setup = () => {
    return render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
  }

  test('Renders successfully', () => {
    setup() // Just render the component
  })

  test('Submits invalid inputs without triggering mutation', async () => {
    const { getByTestId } = setup()
    const email = getByTestId('email')
    const password = getByTestId('password')
    const submitButton = getByTestId('submit_login')

    fireEvent.change(email, { target: { value: 'invalidemail' } })
    fireEvent.change(password, { target: { value: 'short' } })
    fireEvent.click(submitButton)

    expect(loginMutationMock.mutate).not.toHaveBeenCalled() // Check that mutation was not called
  })

  test('Submits valid email and password', async () => {
    userLogin.mockResolvedValueOnce({ data: { token: 'fake_token' } }) // Mocking successful API response

    const { getByTestId } = setup()
    const email = getByTestId('email')
    const password = getByTestId('password')
    const submitButton = getByTestId('submit_login')

    fireEvent.change(email, { target: { value: 'jonh@email.com' } })
    fireEvent.change(password, { target: { value: '12345678' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(loginMutationMock.mutate).toHaveBeenCalledWith({
        email: 'jonh@email.com',
        password: '12345678',
      })
    })
  })

  test('Handles login error', async () => {
    userLogin.mockRejectedValueOnce(new Error('Login failed')) // Mocking API error response

    const { getByTestId } = setup()
    const email = getByTestId('email')
    const password = getByTestId('password')
    const submitButton = getByTestId('submit_login')

    fireEvent.change(email, { target: { value: 'jonh@email.com' } })
    fireEvent.change(password, { target: { value: '12345678' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(loginMutationMock.mutate).toHaveBeenCalledWith({
        email: 'jonh@email.com',
        password: '12345678',
      })
    })
  })
})
