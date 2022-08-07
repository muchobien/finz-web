import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import { frontendConfig } from "$config/frontend-config";
import {
  globalCss,
  DesignSystemProvider,
  darkTheme,
} from "@modulz/design-system";
import { ThemeProvider } from "next-themes";
import { AppPage } from "$components/AppPage";

if (typeof window !== "undefined") {
  SuperTokensReact.init(frontendConfig());
}

const globalStyles = globalCss({
  html: {
    overflowX: "hidden",
  },

  body: {
    margin: 0,
    backgroundColor: "$loContrast",
  },

  "body, button": {
    fontFamily: "$untitled",
  },

  svg: { display: "block" },

  "pre, code": { margin: 0, fontFamily: "$mono" },

  "::selection": {
    backgroundColor: "$violet5",
  },
});

function App({ Component, pageProps }: AppProps) {
  globalStyles();

  const router = useRouter();

  const isAuth = router.pathname.includes("/auth");

  return (
    <DesignSystemProvider>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{ light: "light-theme", dark: darkTheme.className }}
        defaultTheme="system"
      >
        <SuperTokensWrapper>
          {isAuth ? (
            <Component {...pageProps} />
          ) : (
            <AppPage>
              <Component {...pageProps} />
            </AppPage>
          )}
        </SuperTokensWrapper>
      </ThemeProvider>
    </DesignSystemProvider>
  );
}

export default App;
