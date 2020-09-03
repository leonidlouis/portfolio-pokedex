import React from "react";
import Header from "../../components/header";
import { render } from "@testing-library/react";

it("[HEADER] renders without crashing", () => {
  const component = render(<Header />);
  expect(component).toBeTruthy();
});
