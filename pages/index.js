// import Head from "next/head";
// import { RichText } from "prismic-reactjs";
// import AllNews from "components/news/allNews";
// import Header from "components/Header";
// import Footer from "components/Footer";
// import globalProps from "utils/globalProps";
// import PropTypes from "prop-types";
// import { getDocumentByUid, getDocumentsByType } from "helper/prismic";

// function Index({ doc, allNews, header, footer }) {

//   return (
//     <>
//       <Head>
//         <title>Nike Shop</title>
//       </Head>
//       <Header header={header} />
//       <div className="carousel">{Content}</div>
//       <AllNews allNews={allNews} />
//       <Footer footer={footer} />
//       <style>
//         {`
//         .carousel{
//           width:100%;
//           min-height:500px;
//           padding:30px 120px;
//         }

//         .image-section{
//           width:80%;
//           margin:0 auto;
//           text-align:center;
//         }
//         .image-gallery{
//           display: flex;
//           flex-flow: row;
//         }
//         .image-gallery{
//           padding-left:100px;
//           width:330px;
//           margin-right:20px;
//         }

//         .hero-section{
//           text-align:center;

//         }

//         @media only screen and (min-width: 768px) {
//           .image-gallery{
//             padding-left:0px;

//           }
//       }

//         `}
//       </style>
//     </>
//   );
// }

// Index.propTypes = {
//   doc: PropTypes.object.isRequired,
//   allNews: PropTypes.array.isRequired,
//   global: PropTypes.object.isRequired,
// };

// export default Index;

// // export async function getStaticProps({ preview = false }) {
// //   const doc = await getDocumentByUid("pages", "landing-page");
// //   const allNews = await getDocumentsByType("news", {
// //     pageSize: 3,
// //   });

// //   return {
// //     props: {
// //       doc,
// //       allNews,
// //       preview,
// //     },
// //   };
// // }

import { Client } from '../prismic';
import SliceZone from 'next-slicezone';
import { useGetStaticProps } from 'next-slicezone/hooks';
import resolver from '../sm-resolver.js';
import Header from 'components/Header';
import Footer from 'components/Footer';

const Page = (props) => {
  return (
    <div>
      <Header header={props.header} />
      <SliceZone {...props} resolver={resolver} />;
      <Footer footer={props.footer} />
    </div>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  uid: 'homepage',
});

export default Page;
