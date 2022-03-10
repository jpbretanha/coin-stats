import {
  CircularProgress,
  Container,
  SimpleGrid,
  Text,
  Flex,
} from "@chakra-ui/react";
import CoinCard from "components/CoinCard";
import useAsync from "hooks/useAsync";
import * as api from "services/handlers";
import type { Coin } from "types";

const PAGINATION_LIMIT = 27;

function Home() {
  // TODO: implement pagination properly
  const { data, status } = useAsync(() =>
    api.listCoins({ limit: PAGINATION_LIMIT }),
  );

  if (status === "pending")
    return (
      <Flex p={4} justifyContent="center">
        <CircularProgress isIndeterminate color="gray.500" />
      </Flex>
    );

  if (status === "error") return <Text>Algo deu errado</Text>;
  return (
    <Container maxW="container.lg">
      <SimpleGrid columns={[1, 2, 2, 3]} spacing={4}>
        {(data as { coins: [] }).coins.map((coin: Coin) => (
          <CoinCard
            id={coin.id}
            imageUrl={coin.icon}
            name={coin.name}
            price={coin.price}
            key={coin.id}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Home;
