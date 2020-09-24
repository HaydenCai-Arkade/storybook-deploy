import gql from "graphql-tag";

export const PRODUCT_BY_HANDLE = gql`
  query($productHandle: String!) {
    product: productByHandle(handle: $productHandle) {
      id
      title
      handle
      description
      options {
        id
        name
        values
      }
      images(first: 3) {
        edges {
          node {
            originalSrc
          }
        }
      }
      variants(first: 5) {
        edges {
          node {
            id
            title
            price
            compareAtPrice
            selectedOptions {
              name
              value
            }
          }
        }
      }
      metafields(first: 10) {
        edges {
          node {
            key
            value
          }
        }
      }
    }
  }
`;

export const productByHandleVars = (productHandle) => ({
  productHandle,
});
