import qs from "qs";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "components/Header";
import Footer from "components/Footer";
import { withRouter, useRouter } from "next/router";
import algoliasearch from "algoliasearch/lite";
import { findResultsState } from "react-instantsearch-dom/server";
import Search from "components/products/Search";
import globalProps from "utils/globalProps";

const searchClient = algoliasearch(
  "AMN6LAIM53",
  "ebfe25280b7ea6fa088db8439a00b581"
);

const createURL = (state) => `?${qs.stringify(state)}`;

const searchStateToURL = (searchState) =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : "";

const DEFAULT_PROPS = {
  searchClient,
  indexName: "productsproducts",
};

const SearchPage = ({ resultsState, global }) => {
  const { header, footer } = global;
  const router = useRouter();

  async function getStaticProp(router) {
    const path = router.asPath;

    const searchState = path.includes("?")
      ? qs.parse(path.substring(path.indexOf("?") + 1))
      : {};

    const resultsState = await findResultsState(Search, {
      ...DEFAULT_PROPS,
      searchState,
    });

    return {
      resultsState,
      searchState,
    };
  }
  const [searchState, setSearchState] = useState({});

  const onSearchStateChange = (searchState) => {
    const href = searchStateToURL(searchState);

    router.push(href, href, {
      shallow: true,
    });

    setSearchState(searchState);
  };

  return (
    <>
      <Header header={header} />

      <div>
        <Search
          {...DEFAULT_PROPS}
          searchState={searchState}
          resultsState={resultsState}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
        />
      </div>
      <Footer footer={footer} />
    </>
  );
};

SearchPage.propTypes = {
  global: PropTypes.object.isRequired,
};

export default withRouter(SearchPage);

export async function getStaticProps() {
  const {
    props: { global },
  } = await globalProps();

  return {
    props: {
      global,
    },
  };
}
