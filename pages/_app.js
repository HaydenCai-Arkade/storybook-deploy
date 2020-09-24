import React from "react";
import NextApp from "next/app";
import { theme } from "essential-slices";
import { client } from "utils/apolloClient";
import { ThemeProvider, BaseStyles } from "theme-ui";
import { ApolloProvider } from "react-apollo";
import "../styles/globals.css";
import Layout from "components/layout";
import ShopProvider from "context/shopContext";
import { Client } from "prismic";

export default class App extends NextApp {
  static async getInitialProps(appCtx) {
    const client = Client();
    const header = (await client.getSingle("header")) || {};
    const footer = (await client.getSingle("footer")) || {};
    return {
      props: {
        header: header,
        footer: footer,
      },
    };
  }

  render() {
    const { Component, pageProps, props } = this.props;
    const { global, preview } = pageProps || {};
    return (
      <ApolloProvider client={client}>
        <ShopProvider>
          <ThemeProvider theme={theme}>
            <BaseStyles>
              <Layout preview={preview} globalProps={global}>
                <Component
                  {...pageProps}
                  header={props.header}
                  footer={props.footer}
                />
              </Layout>
            </BaseStyles>
          </ThemeProvider>
        </ShopProvider>
      </ApolloProvider>
    );
  }
}
