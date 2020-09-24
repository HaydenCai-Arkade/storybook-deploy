import Link from "next/link";
import Head from "next/head";
import Header from "components/Header";
import Footer from "components/Footer";
import globalProps from "utils/globalProps";
import { RichText } from "prismic-reactjs";
import { getDocumentByUid, getStaticPathsByType } from "helper/prismic";

function News({ news, global }) {
  const { header, footer } = global || {};
  const { title, image, date, content } = news.data;
  const newContent = content.map((content, index) => {
    return <p key={index}>{content.text}</p>;
  });
  return (
    <>
      <Head>
        <title>Nike News</title>
      </Head>
      <Header header={header} />
      <div className="container">
        <div className="news-box">
          <div style={{ height: "60px", marginBottom: "60px" }}>
            <h2>{RichText.asText(title)}</h2>
            <p>{date}</p>
          </div>
          <div>
            <img src={image.url} alt={title} style={{ width: "800px" }} />
            {newContent}

            <Link href="/">
              <button type="button">Go back</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer footer={footer} />

      <style>
        {`
          .container{
            width:800px;
            margin:0 auto;
            padding :80px 0;
          }
          button{
            background-color: black;
            color: white;
            border: none;
            font-size: 1.2rem;
            padding: 10px 17px;
            cursor: pointer;
            margin-top:30px;
          }
        `}
      </style>
    </>
  );
}

export default News;

export async function getStaticProps({ params, preview = null }) {
  const {
    props: { global },
  } = await globalProps();

  const news = await getDocumentByUid("news", params.uid);

  return {
    props: {
      global,
      preview,
      news,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsByType("news", "uid");
  return {
    paths,
    fallback: true,
  };
}
