import Prismic from "prismic-javascript";

const prismicApiEndpoint = "https://slice-machine-app.cdn.prismic.io/api/v2";
const prismicAccessToken = "";

export default Prismic.client(prismicApiEndpoint, {
  accessToken: prismicAccessToken,
});

export const getSimpleClient = () => {
  return Prismic.getApi(prismicApiEndpoint, {
    accessToken: prismicAccessToken,
  });
};

export async function getDocumentByUid(type, uid) {
  const documents = await getSimpleClient()
    .then((api) =>
      api.query(Prismic.Predicates.at(`my.${type}.uid`, uid), { lang: "*" })
    )
    .then((response) => response.results);

  if (!documents.length) return null;

  return documents[0];
}

export async function getDocumentsByTag(tags) {
  const documents = await getSimpleClient()
    .then((api) => api.query(Prismic.Predicates.at("document.tags", tags)))
    .then((response) => response.results);

  return documents;
}

export async function getDocumentsByType(type, options = {}) {
  const documents = await getSimpleClient()
    .then((api) =>
      api.query(Prismic.Predicates.at("document.type", type), options)
    )
    .then((response) => response.results);

  return documents;
}

export async function getStaticPathsByType(type, paramName) {
  const documents = await getSimpleClient()
    .then((api) => api.query(Prismic.Predicates.at("document.type", type)))
    .then((response) => response.results);

  return documents.map((doc) => ({
    params: { [paramName]: doc.uid },
  }));
}
