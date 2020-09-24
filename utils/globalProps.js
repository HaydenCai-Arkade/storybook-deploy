import Prismic from "helper/prismic";

let propsRequest = [];

if (Prismic && Prismic !== undefined) {
  propsRequest = [
    Prismic.getByUID("header", "header")
      .then((res) => ["header", res])
      .catch(() => null),
    Prismic.getByUID("footer", "footer")
      .then((res) => ["footer", res])
      .catch(() => null),
  ];
}

export const globalPropsRequests = propsRequest;

const globalProps = async () => {
  const global = {};

  await Promise.all(globalPropsRequests)
    .then((responses) => {
      responses.forEach((res) => {
        if (res) {
          const [id, body] = res;
          global[id] = body.data;
        }
      });
    })
    .catch(() => {});

  return {
    props: {
      global,
    },
  };
};

export default globalProps;
