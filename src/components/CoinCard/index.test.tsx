import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CoinCard from ".";

describe("CoinCard component", () => {
  it("should render coin information", () => {
    render(
      <CoinCard
        name="Ethereum"
        imageUrl="https://api.coin-stats.com/api/files/812fde17aea65fbb9f1fd8a478547bde/e1259737fa19af705f0207d5b384c37e_1027.png"
        price={210.13}
        id="ethereum"
      />,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText(/Ethereum/i)).toBeInTheDocument();
    expect(screen.getByText("$210.13")).toBeInTheDocument();
    expect(screen.getByAltText(/Ethereum logo/)).toBeInTheDocument();
  });
});
