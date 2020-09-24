import PropTypes from "prop-types";
import Preview from "../Preview";

export default function Layout({ children, preview }) {
  return (
    <div>
      {children}
      <Preview preview={preview} />
    </div>
  );
}

Layout.propTypes = {
  preview: PropTypes.bool,
};

Layout.defaultProps = {
  preview: false,
};
