import React from "react";
import PageContent from "components/PageContent";
import Header from "components/Header";
import Footer from "components/Footer";
import globalProps from "utils/globalProps";
import { getDocumentByUid } from "helper/prismic";

const Pages = ({ doc, global }) => {
  if (!doc) {
    return "";
  }
  const { header, footer } = global || {};

  return (
    <div>
      <Header header={header} />
      <PageContent doc={doc} />
      <Footer footer={footer} />
    </div>
  );
};

export default Pages;

export async function getStaticProps({ params, preview = false }) {
  const {
    props: { global },
  } = await globalProps();

  const doc = await getDocumentByUid("pages", params.handle);

  return {
    props: {
      global,
      preview,
      doc,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
