import { Box, Flex } from "@modulz/design-system";
import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  return (
    <Flex
      css={{
        flexDirection: "column",
        "@bp2": {
          flexDirection: "row",
        },
      }}
    >
      <Box>Hello</Box>
    </Flex>
  );
};

export default Home;
