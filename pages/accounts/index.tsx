import Account from "$components/Account";
import { Flex, Text, Grid } from "@modulz/design-system";
import type { NextPage } from "next";
import React from "react";

const Accounts: NextPage = () => {
  return (
    <Flex
      css={{
        flexDirection: "column",
        "@bp2": {
          flexDirection: "column",
        },
      }}
    >
      <Text
        as="h1"
        size="8"
        css={{ fontWeight: 500, mb: "$2", lineHeight: "40px" }}
      >
        Accounts
      </Text>

      <Grid
        css={{
          mt: "$5",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 16rem), 1fr))",
          gap: "$5",
        }}
      >
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
        <Account name="BBVA" balance="2000" />
      </Grid>
    </Flex>
  );
};

export default Accounts;
