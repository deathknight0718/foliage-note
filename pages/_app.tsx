import theme from "@foliage-note/components/utils/theme";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@foliage-note/style.css";
import "katex/dist/katex.min.css";
import type { NextPage } from "next";
import "@foliage-note/components/utils/i18n";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AppCacheProvider {...props}>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </AppCacheProvider>
  );
}
