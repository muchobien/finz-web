import * as React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Text, Box, Flex, Container, IconButton } from "@modulz/design-system";
import { ScrollArea } from "$components/ScrollArea";
import { ThemeToggle } from "$components/ThemeToggle";
import { pages } from "$lib/routes";
import { HamburgerMenuIcon } from "@modulz/radix-icons";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export function AppPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentPath = router.pathname.replace(
    "[slug]",
    router.query.slug as string
  );

  React.useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
      <Flex
        css={{
          flexDirection: "column",
          "@bp2": {
            flexDirection: "row",
          },
        }}
      >
        <Box
          css={{
            width: "100%",
            maxHeight: "auto",
            borderBottom: "1px solid",
            borderColor: "$slate6",
            WebkitOverflowScrolling: "touch",
            overflowX: "hidden",

            "@bp2": {
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "250px",
              borderRight: "1px solid",
              borderBottom: "0",
              borderColor: "$slate6",
            },
          }}
        >
          <ScrollArea>
            <Flex css={{ alignItems: "center", p: "$4" }}>
              <ThemeToggle css={{ ml: "auto" }} />
              <Box css={{ ml: "$2", "@bp2": { display: "none" } }}>
                <IconButton
                  variant="ghost"
                  onClick={() => setIsOpen(!isOpen)}
                  state={isOpen ? "active" : undefined}
                >
                  <HamburgerMenuIcon />
                </IconButton>
              </Box>
            </Flex>

            <Box
              css={{
                display: isOpen ? "block" : "none",
                "@bp2": {
                  display: "block",
                },
              }}
            >
              {pages.map((page) => (
                <NavItem
                  key={page.slug}
                  href={`/${page.slug}`}
                  active={currentPath === `/${page.slug}`}
                >
                  <Text size="2" css={{ color: "inherit", lineHeight: "1" }}>
                    {page.title}
                  </Text>
                </NavItem>
              ))}

              <Box css={{ height: "$5", "@bp2": { height: "$8" } }} />
            </Box>
          </ScrollArea>
        </Box>

        <Box
          css={{
            maxWidth: "100%",
            flex: 1,
            py: "$5",
            "@bp2": { pt: "$5", pb: "$9", pl: "250px" },
          }}
        >
          <Container
            css={{
              "@bp4": {
                maxWidth: "1200px",
              },
            }}
          >
            {children}
          </Container>
        </Box>
      </Flex>
    </ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
  );
}

type NavItemProps = {
  children: React.ReactNode;
  active?: boolean;
  href: string;
};

function NavItem({ children, active, href, ...props }: NavItemProps) {
  const isExternal = href.startsWith("http");

  return (
    <Box
      as={isExternal ? "span" : (NextLink as any)}
      {...(isExternal ? {} : { href, passHref: true })}
    >
      <Box
        {...props}
        {...(isExternal
          ? { href, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        as="a"
        css={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "$hiContrast",
          py: "$2",
          px: "$5",
          backgroundColor: active ? "$violet5" : "transparent",
          userSelect: "none",
          minHeight: "$6",
          transition: "background-color 50ms linear",
          "&:hover": {
            backgroundColor: active ? "$violet5" : "$violet4",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
