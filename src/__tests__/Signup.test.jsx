import { render, fireEvent,act } from "@testing-library/react";
import Signup from "../components/Signup";
import { MemoryRouter } from "react-router-dom";


describe("Singup Component", () => {
  const component = (
    <MemoryRouter>
      <Signup/>
    </MemoryRouter>
  );

  test("Renders successfully", () => {
    render(component);
  });

  test("Clicking Login with Email & Password", () => {
    // Setup

    const { getByTestId } = render(component);
    const email = getByTestId("email");
    const password = getByTestId("password");
    const name = getByTestId("name");
    const submitButton = getByTestId("submit_signup");

    act(()=>{
      fireEvent.change(email, {
        target: { value: "jonh@email.com" },
      });
      fireEvent.change(name, {
        target: { value: "jagdish" },
      });
      fireEvent.change(password, {
        target: { value: "12345678" },
      });
  
      fireEvent.click(submitButton);
    })
  });
 
  test("Entering Wrong Email & Password", () => {
    // Setup

    const { getByTestId } = render(component);
    const email = getByTestId("email");
    const password = getByTestId("password");
    const name = getByTestId("name");
    const submitButton = getByTestId("submit_signup");

    act(()=>{
  
      fireEvent.change(email, {
        target: { value: "dafadfasdfsadf" },
      });
      fireEvent.change(name, {
        target: { value: "jonh" },
      });
      fireEvent.change(password, {
        target: { value: "123" },
      });
  
      fireEvent.click(submitButton);
    })
  });
  

});
