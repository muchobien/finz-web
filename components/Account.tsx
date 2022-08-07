import { Box, Card, Flex, Heading, Text, theme } from "@modulz/design-system";
import { memo } from "react";
import { VictoryArea } from "victory";
import { useMeasure } from "react-use";

const generateRadomNumberBetween = (min: number = 100, max: number = 2000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomData = () =>
  Array.from({ length: 30 }).map((_, x) => ({
    x,
    y: generateRadomNumberBetween(),
  }));

type AccountProps = {
  name: string;
  balance: string;
};

const formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
});

const Account = memo<AccountProps>(({ name, balance }) => {
  const [measureRef, { width, height }] = useMeasure<HTMLDivElement>();

  const data = generateRandomData();

  return (
    <Box ref={measureRef}>
      <Card
        css={{
          height: "10rem",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box css={{ position: "absolute", top: 0, left: 0 }}>
          <svg
            height={height}
            preserveAspectRatio="none"
            width={width}
            viewBox={`0 0 ${width} ${height}`}
          >
            <VictoryArea
              interpolation="catmullRom"
              height={height}
              width={width}
              standalone={false}
              padding={0}
              style={{
                data: { fill: theme.colors.violet9.value },
              }}
              data={data}
            />
          </svg>
        </Box>
        <Flex
          css={{
            p: "$3",
            fd: "column",
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        >
          <Heading size="2">{name}</Heading>
          <Flex
            css={{
              flex: 1,
              jc: "flex-end",
              ai: "flex-end",
            }}
          >
            <Text
              size="4"
              css={{
                color: "$slate12",
              }}
            >
              {formatter.format(data.at(-1)!.y)}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
});

Account.displayName = "Account";

export default Account;
