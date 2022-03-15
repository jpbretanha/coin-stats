import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import "jest-canvas-mock";
import { DefaultRequestBody, rest } from "msw";
import CoinPage from ".";
import { renderWithRouter } from "testUtils";
import { server } from "mocks/server";
import { API_URL } from "services/api";

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
    expect(screen.getByText(/^\$2568\.83/i)).toBeInTheDocument();
    expect(screen.getByText(/-0\.42% \(last 24h\)/i)).toBeInTheDocument();
    expect(screen.getByText(/decreased by/)).toBeInTheDocument();
    expect(screen.getByText("Ethereum price (ETH)")).toBeInTheDocument();
  });

  describe("when some error is thrown by the api", () => {
    beforeEach(async () => {
      server.use(
        rest.get<DefaultRequestBody, { message: string }>(
          API_URL + "/coins/:id",
          (req, res, ctx) => {
            return res(
              ctx.status(500),
              ctx.json({ message: "Sorry Something happened!" }),
            );
          },
        ),
      );
    });

    it("should show error message if request fails", async () => {
      renderWithRouter(<CoinPage />, { route: "/coin/ethereum" });
      await waitForElementToBeRemoved(() => screen.queryByTestId("loader"));
      const errorMessage = await screen.findByText("Something went wrong");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
