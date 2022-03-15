import {
  CircularProgress,
  Container,
  Flex,
  Image,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  Text,
} from "@chakra-ui/react";
import useAsync from "hooks/useAsync";
import Chart from "kaktana-react-lightweight-charts";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import * as api from "services/handlers";
import type { Coin } from "types";
import { CHART_CONFIG } from "../constants";

type ChartArray = {
  chart: Array<Array<number>>;
};

type CoinAPIResponse = {
  coin: Coin;
};

const formatSeriesData = (arr: ChartArray) => [
  {
    data: arr.chart.map((el) => ({
      time: el[0],
      value: el[1],
    })),
  },
];

function CoinPage() {
  const { id } = useParams();
  const { data: chartData } = useAsync(() =>
    api.getChartInfo({ coinId: id as string, period: "24h" }),
  );

  const { data: coinData, status } = useAsync(() => api.getCoin(id as string));

  const coinResponse = coinData as CoinAPIResponse;

  const linearSeriesData = useMemo(() => {
    if (!chartData) return;
    return formatSeriesData(chartData as ChartArray);
  }, [chartData]);

  if (status === "pending")
    return (
      <Flex data-testid="loader" p={4} justifyContent="center">
        <CircularProgress isIndeterminate color="gray.500" />
      </Flex>
    );

  if (status === "error") return <Text>Something went wrong</Text>;

  return (
    <Container maxW="container.lg">
      <Flex justifyContent="space-between" alignItems="center" py={4}>
        <Flex alignItems="center" gap={4}>
          <Image w="80px" src={coinResponse.coin.icon} alt={`${id} logo`} />
          <Text>{coinResponse.coin.name}</Text>
          <Tag background="gray.700" color="white">
            {coinResponse.coin.symbol}
          </Tag>
        </Flex>
        <StatGroup>
          <Stat>
            <StatLabel>
              {coinResponse.coin.name} price ({coinResponse.coin.symbol})
            </StatLabel>
            <StatNumber>${coinResponse.coin.price.toFixed(2)}</StatNumber>
            <StatHelpText>
              <StatArrow
                type={
                  (coinResponse.coin.priceChange1d as number) > 0
                    ? "increase"
                    : "decrease"
                }
              />
              {coinResponse.coin.priceChange1d}% (last 24h)
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Flex>
      <Chart
        data-testid="chart"
        options={CHART_CONFIG.options}
        lineSeries={linearSeriesData}
        autoWidth
        height={320}
      />
    </Container>
  );
}

export default CoinPage;
