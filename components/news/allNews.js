import Link from "next/link";
import PropTypes from "prop-types";
import { hrefResolver, linkResolver } from "prismic.js";

const AllNews = ({ allNews }) => {
  return (
    <>
      <div className="container">
        <h2>Recently News</h2>
        <div className="all-news">
          {allNews.map((news, index) => (
            <div key={index} className="news-box">
              <div style={{ height: "450px" }}>
                <Link as={linkResolver(news)} href={hrefResolver(news)}>
                  <img
                    src={news.data.image.url}
                    alt={news.data.title}
                    className="news-image"
                    style={{ width: "400px", height: "300px" }}
                  />
                </Link>
                <p>{news.data.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>
        {`
          a {
            color: black;
            font-size: 18px;
          }

          .container {
            width: 100%;
            margin: 0 auto;
          }
          h2 {
            margin-left: 280px;
          }

          .all-news {
            width: 70%;
            margin: 0 auto;
            margin-top: 30px;
            display: flex;
            flex-flow: row;
          }

          .news-box {
            width: 30%;
            margin-right: 30px;
          }

          .news-image {
            width: 400px;
            height: 300px;
            cursor: pointer;
          }

          @media only screen and (min-width: 768px) {
            .news-box {
              width: 30%;
              margin-right: 20px;
            }
            .news-image {
              width: 300px;
              cursor: pointer;
            }
          }
        `}
      </style>
    </>
  );
};

AllNews.propTypes = {
  allNews: PropTypes.array.isRequired,
};

export default AllNews;
