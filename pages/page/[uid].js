import { Client } from "prismic";
import SliceZone from "next-slicezone";
import { useGetStaticProps, useGetStaticPaths } from "next-slicezone/hooks";
import Header from "components/Header";
import Footer from "components/Footer";
import resolver from "sm-resolver.js";

const Page = (props) => {
  return (
    <div>
      <Header header={props.header} />
      <SliceZone {...props} resolver={resolver} />
      <Footer footer={props.footer} />
    </div>
  );
};

export const getStaticProps = useGetStaticProps({
  client: Client(),
  uid: ({ params }) => params.uid,
});

export const getStaticPaths = useGetStaticPaths({
  client: Client(),
  type: "page",
  fallback: true,
  formatPath: ({ uid }) => ({ params: { uid } }),
});

export default Page;
