/** Example file */

import Prismic from 'prismic-javascript';
import Link from 'next/link';

import smConfig from './sm.json';

export const apiEndpoint = smConfig.apiEndpoint;

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = '';

export const linkResolver = (doc) => {
  if (doc.type === 'news') {
    return `/news/${doc.uid}`;
  } else if (doc.type === 'page') {
    return `/page/${doc.uid}`;
  }
  return '/';
};

// Additional helper function for Next/Link components
export const hrefResolver = (doc) => {
  if (doc.type === 'news') {
    return '/news/[uid]';
  } else if (doc.type === 'page') {
    return '/page/[handle]';
  }

  return '/';
};

export const customLink = (type, element, content, children, index) => (
  <Link
    key={index}
    href={hrefResolver(element.data)}
    as={linkResolver(element.data)}
  >
    <a>{content}</a>
  </Link>
);

export const Router = {
  routes: [{ type: 'page', path: '/:uid' }],

  href: (type) => {
    const route = Router.routes.find((r) => r.type === type);
    return route && route.href;
  },
};

export const Client = (req = null, options = {}) =>
  Prismic.client(
    apiEndpoint,
    Object.assign({ routes: Router.routes }, options),
  );
