// pages/_app.js
import React from "react";
import NextApp from "next/app";

import { theme } from "essential-slices";

import { ThemeProvider, BaseStyles } from "theme-ui";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import "../styles/globals.css";
import Layout from "components/layout";
import ShopProvider from "context/shopContext";

const httpLink = createHttpLink({
  uri: "https://haydentestshop.myshopify.com/api/graphql",
});

const middlewareLink = setContext(() => ({
  headers: {
    "X-Shopify-Storefront-Access-Token": "d92c41acfd6ceaf3f2547d9ac89d728b",
  },
}));
const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  const { global, preview } = pageProps || {};
  return (
    <ApolloProvider client={client}>
      <ShopProvider>
        <ThemeProvider theme={theme}>
          <BaseStyles>
            <Layout globalProps={global} preview={preview}>
              <Component {...pageProps} />
            </Layout>
          </BaseStyles>
        </ThemeProvider>
      </ShopProvider>
    </ApolloProvider>
  );
}

export default MyApp;

// export default class App extends NextApp {
//   render() {
//     const { Component, pageProps } = this.props;
//     return (
//       <ThemeProvider theme={theme}>
//         <BaseStyles>
//           <Component {...pageProps} />
//         </BaseStyles>
//       </ThemeProvider>
//     );
//   }
// }
