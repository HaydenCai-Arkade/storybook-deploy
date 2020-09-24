import React from "react";
import PropTypes from "prop-types";
import HitComponent from "./HitComponent";
import {
  RefinementList,
  SearchBox,
  Hits,
  Configure,
  Pagination,
  InstantSearch,
  SortBy,
  ClearRefinements,
} from "react-instantsearch-dom";

const Search = ({
  searchClient,
  resultsState,
  onSearchStateChange,
  searchState,
  createURL,
  indexName,
  onSearchParameters,
}) => {
  return (
    <>
      <div className="search-results">
        <InstantSearch
          searchClient={searchClient}
          resultsState={resultsState}
          onSearchStateChange={onSearchStateChange}
          searchState={searchState}
          createURL={createURL}
          indexName={indexName}
          onSearchParameters={onSearchParameters}
        >
          <Configure hitsPerPage={6} />
          <header>
            <SearchBox />
          </header>

          <main>
            <div className="filter-menu">
              <SortBy
                defaultRefinement="productsproducts"
                items={[
                  {
                    value: "productsproducts_title_asc",
                    label: "alphabetically,A-Z",
                  },
                  {
                    value: "productsproducts_title_desc",
                    label: "alphabetically,Z-A",
                  },
                  {
                    value: "productsproducts_price_asc",
                    label: "Price: Low-High",
                  },
                  {
                    value: "productsproducts_price_desc",
                    label: "Price: High-Low",
                  },
                  {
                    value: "productsproducts_publish_at_asc",
                    label: "Date: Old-New",
                  },
                ]}
              />
              <p style={{ fontSize: "18px" }}>Category</p>
              <RefinementList attribute="collections" />
              <p style={{ fontSize: "18px" }}>Price Range</p>
              <RefinementList attribute="price_range" />
              <ClearRefinements
                translations={{
                  reset: "Clear all filters",
                }}
              />
            </div>
            <div className="results">
              <Hits hitComponent={HitComponent} />
            </div>
          </main>
          <footer>
            <Pagination />
          </footer>
        </InstantSearch>

        <style>{`
          .ais-SortBy-select {
            display: block;
            height: 30px;
            width: 150px;
          }

          .ais-SearchBox-input {
            margin-top: 40px;
            display: block;
            height: 30px;
            width: 300px;
            border: none;
            outline: 0;
            border: 1px solid black;
          }

          header {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .ais-ClearRefinements-button {
            margin-bottom: 20px;
          }

          .ais-SearchBox-submit {
            display: none;
          }

          main {
            width: 80vw;
            margin: 0 auto;
            padding-top: 50px;
            display: flex;
          }

          .filter-menu {
            margin-right: 60px;
          }

          footer {
            width: 400px;
            margin: 0 auto;
          }

          .hit {
            width: 300px;
          }

          .ais-RefinementList-list {
            border-bottom: 1px solid black;
            list-style-type: none;
            padding: 0;
          }

          .ais-RefinementList-item {
            margin-bottom: 10px;
          }

          .ais-RefinementList-count {
            color: grey;
            margin-left: 5px;
            position: relative;
          }

          .ais-Pagination-list {
            margin-left: 100px;
            margin-top: 80px;
            list-style-type: none;
            display: flex;
            flex-direction: row;
          }

          .ais-Pagination-item {
            height: 30px;
            width: 30px;
            background-color: black;
            line-height: 30px;
            padding-left: 10px;
            display: block;
            margin-right: 10px;
          }

          .ais-Pagination-link {
            color: white;
            text-decoration: none;
            cursor: pointer;
          }
        `}</style>
      </div>
    </>
  );
};

Search.propTypes = {
  searchState: PropTypes.object,
  resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onSearchStateChange: PropTypes.func,
  createURL: PropTypes.func,
  indexName: PropTypes.string,
  searchClient: PropTypes.object,
};

export default Search;
