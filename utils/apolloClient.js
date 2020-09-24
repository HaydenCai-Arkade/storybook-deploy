import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

const httpLink = createHttpLink({
  uri: "https://haydentestshop.myshopify.com/api/graphql",
});

const middlewareLink = setContext(() => ({
  headers: {
    "X-Shopify-Storefront-Access-Token": "d92c41acfd6ceaf3f2547d9ac89d728b",
  },
}));
export const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});
