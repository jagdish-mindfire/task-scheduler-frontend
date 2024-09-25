import { render, fireEvent,act } from "@testing-library/react";
import Login from "../components/Login";
import { AuthContext } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

const mockAuthContext = {
  userName:"user",
  setUserName:jest.fn(),
  setIsAuthenticated:jest.fn(),
  isAuthenticated:true,
  login:jest.fn(),
  logout:jest.fn(),
  accessToken:"some value",
  setAccessToken:jest.fn(),
  refreshToken:"some value",
  setRefreshToken:jest.fn(),
}

describe("Login Component", () => {
  const component = (
    
    <AuthContext.Provider value={mockAuthContext}>
      <MemoryRouter>
      <Login/>
    </MemoryRouter>
    </AuthContext.Provider>
  );

  test("Renders successfully", () => {
    render(component);
  });

  test("Clicking Invalid Inputs", () => {
    // Setup

    const { getByTestId } = render(component);
    const email = getByTestId("email");
    const password = getByTestId("password");
    const submitButton = getByTestId("submit_login");

    act(()=>{
  
      fireEvent.change(email, {
        target: { value: "jonilom" },
      });
      fireEvent.change(password, {
        target: { value: "145678" },
      });
  
      fireEvent.click(submitButton);
    })
  });
  test("Clicking Login with Email & Password", () => {
    // Setup

    const { getByTestId } = render(component);
    const email = getByTestId("email");
    const password = getByTestId("password");
    const submitButton = getByTestId("submit_login");

    act(()=>{
  
      fireEvent.change(email, {
        target: { value: "jonh@email.com" },
      });
      fireEvent.change(password, {
        target: { value: "12345678" },
      });
  
      fireEvent.click(submitButton);
    })
  });

});
