import { useEffect } from "react";
import { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { SWRConfig } from "swr";

import { fetcher } from "../utils/fetcher";
import { theme } from "../styles/theme";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </AnimatePresence>
  );
}

export default App;
