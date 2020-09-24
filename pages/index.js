import Head from "next/head";
import { RichText } from "prismic-reactjs";
import AllNews from "components/news/allNews";
import Header from "components/Header";
import Footer from "components/Footer";
import globalProps from "utils/globalProps";
import PropTypes from "prop-types";
import { getDocumentByUid, getDocumentsByType } from "helper/prismic";

function Index({ doc, allNews, global }) {
  const { header, footer } = global;
  const Content = doc.data.body.map((slice, index) => {
    if (slice.slice_type === "hero_section") {
      return (
        <div className="hero-section" key={index}>
          <img
            src={slice.primary.picture.url}
            alt={slice.primary.title1}
            style={{ width: "80vw" }}
          />
          <h1>{RichText.asText(slice.primary.title1)}</h1>
          <div style={{ padding: "10px 350px" }}>
            <h4>{RichText.asText(slice.primary.content)}</h4>
          </div>
        </div>
      );
    } else if (slice.slice_type === "image_gallery") {
      const galleryContent = slice.items.map((image, imageIndex) => {
        return (
          <img
            src={image.gallery_image.url}
            className="image-gallery"
            alt={image.gallery_image.alt}
            key={imageIndex}
          />
        );
      });
      return (
        <div className="image-section" key={index}>
          <div className="image-gallery">{galleryContent}</div>
          <h2 className="gallery-title">
            {RichText.asText(slice.primary.name_of_the_gallery)}
          </h2>
          <div style={{ marginBottom: "50px", marginTop: "30px" }}>
            <h4>{RichText.asText(slice.primary.description)}</h4>
          </div>

          <hr />
        </div>
      );
    }
    return null;
  });

  return (
    <>
      <Head>
        <title>Nike Shop</title>
      </Head>
      <Header header={header} />
      <div className="carousel">{Content}</div>
      <AllNews allNews={allNews} />
      <Footer footer={footer} />
      <style>
        {`
        .carousel{
          width:100%;
          min-height:500px;
          padding:30px 120px;
        }
      
        .image-section{
          width:80%;
          margin:0 auto;
          text-align:center;
        }
        .image-gallery{
          display: flex;
          flex-flow: row; 
        }
        .image-gallery{
          padding-left:100px;
          width:330px;
          margin-right:20px;
        }

        .hero-section{
          text-align:center;

        }

        @media only screen and (min-width: 768px) {
          .image-gallery{
            padding-left:0px;
           
          }
      }
        
        `}
      </style>
    </>
  );
}

Index.propTypes = {
  doc: PropTypes.object.isRequired,
  allNews: PropTypes.array.isRequired,
  global: PropTypes.object.isRequired,
};

export default Index;

export async function getStaticProps({ preview = false }) {
  const {
    props: { global },
  } = await globalProps();

  const doc = await getDocumentByUid("pages", "landing-page");
  const allNews = await getDocumentsByType("news", {
    pageSize: 3,
  });

  return {
    props: {
      global,
      doc,
      allNews,
      preview,
    },
  };
}
