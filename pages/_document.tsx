import { useTheme } from "@mui/material";
import type { DocumentHeadTagsProps } from "@mui/material-nextjs/v15-pagesRouter";
import { createEmotionCache, documentGetInitialProps, DocumentHeadTags } from "@mui/material-nextjs/v15-pagesRouter";
import { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import type { DocumentProps } from "next/document";

export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
  const theme = useTheme();
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        <DocumentHeadTags {...props} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx, {
    emotionCache: createEmotionCache({ key: "mui", enableCssLayer: true }),
  });
  return finalProps;
};
