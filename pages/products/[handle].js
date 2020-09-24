import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Header from "components/Header";
import Footer from "components/Footer";
import globalProps from "utils/globalProps";
import { useQuery, useMutation } from "@apollo/react-hooks";
import SingleProduct from "components/products/SingleProduct";
import { PRODUCT_BY_HANDLE, productByHandleVars } from "helper/productGraphql";
import { ShopContext } from "context/shopContext";

function P({ global }) {
  const { addVariantToCart } = useContext(ShopContext);

  const { header, footer } = global || {};

  const router = useRouter();
  const handle = router.query.handle;

  const {
    loading: productLoading,
    error: productError,
    data: productResponse,
  } = useQuery(PRODUCT_BY_HANDLE, {
    variables: productByHandleVars(handle),
  });

  if (productLoading) {
    return <p>Loading ...</p>;
  }

  if (productError) {
    return <p>{productError.message}</p>;
  }

  return (
    <div>
      <Header header={header} />
      <div className="Product-wrapper">
        <SingleProduct
          product={productResponse.product}
          addVariantToCart={addVariantToCart}
        />
      </div>
      <div></div>
      <Footer footer={footer} />

      <style jsx>{`
        .cart {
          position: absolute;
          top: 50px;
          right: 60px;
          background-color: black;
          color: white;
          border: none;
          font-size: 1.2rem;
          padding: 10px 17px;
          cursor: pointer;
          margin-top: 30px;
        }
      `}</style>
    </div>
  );
}

export default P;

export async function getStaticProps({ preview = false }) {
  const {
    props: { global },
  } = await globalProps();

  return {
    props: {
      global,
      preview,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
