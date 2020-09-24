import React from 'react';
import Link from 'next/link';
import SSRLink from 'helper/SSRLink';
import PropTypes from 'prop-types';

const Header = ({ header }) => {
  const nav = header ? header.data.body : [];

  return (
    <div className="menu">
      {nav.map((item, key) => {
        const navItem = item && item.items ? item.items : [];
        return (
          <div key={key}>
            <ul>
              <div>
                {item.primary && item.primary.column_title
                  ? item.primary.column_title
                  : ''}
              </div>
              <Link href="/">
                <span className="nike-home">NIKE</span>
              </Link>
              {navItem.map((itemLink, index) => {
                return (
                  <li key={index} className="link">
                    <SSRLink
                      linkUrl={itemLink.link}
                      linkType={itemLink.link_type}
                      title={itemLink.link_title}
                    >
                      {itemLink.link_title}
                    </SSRLink>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <style jsx>
        {`
          .nike-home {
            cursor: pointer;
            font-size: 25px;
          }
          .menu {
            padding: 10px 200px;
            height: 70px;
            color: white;
            background: black;
          }
          .link {
            float: right;
            list-style-type: none;
            display: inline-block;
            margin-right: 20px;

            font-size: 20px;
          }
          a:hover {
            color: #4b96f9;
          }
        `}
      </style>
    </div>
  );
};
Header.propTypes = {
  header: PropTypes.object.isRequired,
};

export default Header;
