import { Link as RRLink } from "react-router-dom";
import { Box, Text, Image, Flex, Link } from "@chakra-ui/react";

type Props = {
  name: string;
  imageUrl: string;
  price: number;
  id: string;
};

const CoinCard: React.FC<Props> = (props) => {
  const { name, imageUrl, price, id } = props;
  const formattedPrice = price.toFixed(2);

  return (
    <Link as={RRLink} to={`/coin/${id}`}>
      <Flex
        gap={4}
        alignItems="center"
        border="1px solid"
        borderColor="white"
        borderRadius={12}
        minW="180px"
        bg="gray.700"
        p={3}
      >
        <Image w="60px" src={imageUrl} alt={`${name} logo`} />
        <Box>
          <Text>{name}</Text>
          <Box as="span" color="white" fontSize="sm">
            ${formattedPrice}
          </Box>
        </Box>
      </Flex>
    </Link>
  );
};

export default CoinCard;
