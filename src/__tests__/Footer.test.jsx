import { render } from "@testing-library/react";
import Footer from "../components/Layout/Footer";

describe("Footer Component", () => {
  const component = (
      <Footer />
  );

  test("Renders successfully", () => {
    render(component);
  });


});