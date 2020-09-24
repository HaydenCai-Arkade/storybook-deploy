import SSRLink from "helper/SSRLink";
import PropTypes from "prop-types";

function Footer({ footer }) {
  const nav = footer ? footer.body : [];

  return (
    <div className="footer">
      <div className="footer-container">
        {nav.map((item, key) => {
          const navItem = item && item.items ? item.items : [];
          return (
            <div key={key}>
              <ul>
                <div className="footer-title">
                  {item.primary && item.primary.column_title
                    ? item.primary.column_title
                    : ""}
                </div>

                {navItem.map((item, key) => {
                  return (
                    <li key={key}>
                      <SSRLink
                        linkUrl={item.link}
                        linkType={item.link_type}
                        title={item.link_title}
                      >
                        {item.link_title}
                      </SSRLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <style>{`
        .footer{
          padding-top:50px;
          width:100%;
          height:200px;
          color:white;
          background:black;
          display: flex;
          flex-flow: row; 
        }

        ul{
          margin-right:50px;
        }

        .footer-container{
          width:80%;
          display: flex;
          flex-flow: row;
          margin:0 auto;
        }

        li{
          list-style:none;
        }

        .footer-title{
          font-size:20px;
          font-weight:400;
          margin-bottom:15px;
        }
      `}</style>
    </div>
  );
}

Footer.propTypes = {
  footer: PropTypes.object.isRequired,
};

export default Footer;
