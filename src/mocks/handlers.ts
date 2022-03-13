// src/mocks/handlers.js
import { rest } from "msw";
import { API_URL } from "services/api";

export const handlers = [
  rest.get(API_URL + "/coins/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        coin: {
          icon: "https://static.coinstats.app/coins/EthereumOCjgD.png",
          id: "ethereum",
          name: "Ethereum",
          price: 2568.825863353705,
          priceChange1d: -0.42,
          symbol: "ETH",
        },
      }),
    );
  }),
  rest.get(API_URL + "/charts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        chart: [
          [1647115500, 2577.5384, 0.06605408, 1],
          [1647117600, 2589.0786, 0.06609742, 1],
        ],
      }),
    );
  }),
];
