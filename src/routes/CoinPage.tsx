import { useMemo } from "react";
import { Flex, CircularProgress, Text } from "@chakra-ui/react";
import Chart from "kaktana-react-lightweight-charts";

import { useParams } from "react-router-dom";
import useAsync from "hooks/useAsync";
import * as api from "services/handlers";
import { CHART_CONFIG } from "./constants";

type ChartArray = {
  chart: [];
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
  const { data, status } = useAsync(() =>
    api.getChartInfo({ coinId: id as string, period: "24h" }),
  );

  const linearSeriesData = useMemo(() => {
    if (!data) return;
    return formatSeriesData(data as ChartArray);
  }, [data]);

  if (status === "pending")
    return (
      <Flex p={4} justifyContent="center">
        <CircularProgress isIndeterminate color="gray.500" />
      </Flex>
    );

  if (status === "error") return <Text>Something went wrong</Text>;

  return (
    <Chart
      options={CHART_CONFIG.options}
      lineSeries={linearSeriesData}
      autoWidth
      height={320}
    />
  );
}

export default CoinPage;
