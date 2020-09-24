import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

export const getProductLocalPath = (link) => {
  if (!link) return null;
  const linkHref = "products/[handle]";
  return linkHref;
};

export const getPageLocalPath = (link) => {
  return "/page/[handle]";
};

const SSRLink = ({ children, linkType, linkUrl, title }) => {
  if (!linkUrl) return null;
  let localLinkPath = linkUrl;
  let newLink = linkUrl;
  switch (linkType) {
    case "page":
      if (linkUrl === "/") localLinkPath = "/";
      localLinkPath = getPageLocalPath(linkUrl);
      break;
    case "Product":
      localLinkPath = getProductLocalPath(linkUrl);
      break;
    default:
      return (
        <a href={linkUrl} title={title || ""}>
          {children}
        </a>
      );
  }

  return (
    <Link href={localLinkPath} as={newLink}>
      <a href={newLink} title={title || ""}>
        {children}
      </a>
    </Link>
  );
};

SSRLink.propTypes = {
  children: PropTypes.any,
  linkType: PropTypes.string,
  linkUrl: PropTypes.string,
  title: PropTypes.string,
};

SSRLink.defaultProps = {
  children: null,
  linkType: null,
  linkUrl: null,
};

export default SSRLink;
