import { render, fireEvent } from "@testing-library/react";
import Footer from "../components/Footer";



describe("Footer Component", () => {
  const component = (
      <Footer />
  );

  test("Renders successfully", () => {
    render(component);
  });


});