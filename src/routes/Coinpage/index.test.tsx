import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import "jest-canvas-mock";
import CoinPage from ".";
import { renderWithRouter } from "testUtils";

describe("CoinPage Route", () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });
  it("should show coin info", async () => {
    renderWithRouter(<CoinPage />, { route: "/coin/ethereum" });
    await waitForElementToBeRemoved(() => screen.queryByTestId("loader"));
    const coinName = await screen.findByText("Ethereum");
    expect(coinName).toBeInTheDocument();
  });
});
