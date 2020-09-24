import { RichText } from "prismic-reactjs";
import PropTypes from "prop-types";

function PageContent({ doc }) {
  const { data, tags } = doc;
  const contentData = data.body[0].primary;
  if (!doc) {
    return "";
  }

  let content = "";

  switch (tags[0]) {
    case "shipping":
      content = (
        <div className="shipping">
          <h1>Shipping</h1>
          <img
            src={contentData.picture.url}
            alt={contentData.title}
            style={{ width: "85vw" }}
          />
          <div>{RichText.render(contentData.content)}</div>
        </div>
      );
      break;
    case "aboutus":
      content = (
        <div className="about-us">
          <h1>About Us</h1>
          <img
            src={contentData.picture.url}
            alt=""
            style={{ width: "85vw", marginBottom: "30px" }}
          />
          <div className="content" style={{ marginBottom: "40px" }}>
            {RichText.asText(contentData.content)}
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: contentData.video.html,
            }}
          />
        </div>
      );
      break;
    case "contact":
      content = (
        <div className="contact">
          <div style={{ textAlign: "center" }}>
            <h1>Contact Us</h1>
            {RichText.render(contentData.content)}
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: contentData.form[0].text,
            }}
          />
        </div>
      );
      break;
    default:
      null;
  }

  return (
    <div>
      <div>{content}</div>

      <style>
        {`
          .shipping{
            padding:100px;
          }

          p{
            font-size:10px;
          }
      
          .about-us{
            padding:100px;
            text-align:center;
          }
      
          .contact{
            min-height:700px;
            padding:30px 300px;   
          }
      
          p{
            font-size:20px;
          }
          iframe{
            width:800px;
            height:500px
      
          }

          margin-bottom:40px;
          text-algin:center;
        }
        iframe{
          margin-left:300px;
          width:70%;
          min-height:800px;
        }
    `}
      </style>
    </div>
  );
}

PageContent.propTypes = {
  doc: PropTypes.object.isRequired,
};

export default PageContent;
