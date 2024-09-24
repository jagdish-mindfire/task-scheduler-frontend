// Imports
import React from "react";

import { render, fireEvent } from "@testing-library/react";

// To Test
import Footer from "../components/Footer";



describe("Footer Component", () => {
  const component = (
 
      <Footer />
 
  );

  test("Renders successfully", () => {
    render(component);
    // expect(true).toBeTruthy();
  });


});