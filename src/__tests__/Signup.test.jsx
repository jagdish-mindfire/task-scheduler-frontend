import { render, fireEvent, waitFor, act } from "@testing-library/react";
import Signup from "../pages/Authentication/Signup";
import { MemoryRouter } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { userSignup } from "../api/apiLogin";

jest.mock("../hooks/useAuth");
jest.mock("../api/apiLogin");

describe("Signup Component", () => {
  const signupMutationMock = {
    mutate: jest.fn(),
    isPending: false,
  };

  useAuth.mockReturnValue({ signupMutation: signupMutationMock });

  const setup = () => {
    return render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
  };

  test("Renders successfully", () => {
    const { getByTestId } = setup();
  });

  test("Submits invalid email and password", async () => {
    const { getByTestId } = setup();
    const email = getByTestId("email");
    const name = getByTestId("name");
    const password = getByTestId("password");
    const submitButton = getByTestId("submit_signup");

    act(() => {
      fireEvent.change(email, { target: { value: "invalidemail" } });
      fireEvent.change(name, { target: { value: "jonh" } });
      fireEvent.change(password, { target: { value: "123" } });
      fireEvent.click(submitButton);
    });

 
    expect(signupMutationMock.mutate).not.toHaveBeenCalled();
 
  });

  test("Submits valid email, name, and password", async () => {
    userSignup.mockResolvedValueOnce({ data: { message: "success" } });

    const { getByTestId } = setup();
    const email = getByTestId("email");
    const name = getByTestId("name");
    const password = getByTestId("password");
    const submitButton = getByTestId("submit_signup");

    act(() => {
      fireEvent.change(email, { target: { value: "jonh@email.com" } });
      fireEvent.change(name, { target: { value: "jagdish" } });
      fireEvent.change(password, { target: { value: "12345678" } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(signupMutationMock.mutate).toHaveBeenCalledWith({
        email: "jonh@email.com",
        name: "jagdish",
        password: "12345678",
      });
    });
  });

});