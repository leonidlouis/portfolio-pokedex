import React from "react";
import { render, screen } from "@testing-library/react";
import BottomLoadingCard from "../../components/bottom_loading_card";

it("[BOTTOM_LOADING_CARD] when not passed anything, renders nothing", () => {
  const { queryByText } = render(<BottomLoadingCard />);
  expect(queryByText("Loading")).toBeNull();
});
