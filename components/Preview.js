import PropTypes from 'prop-types';
import Link from 'next/link';

const Preview = ({ preview }) => {
  if (!preview) return '';
  return (
    <>
      <div className="preview">
        <p>Preview Mode On</p>
        <Link href="/api/exit-preview">
          <a className="exit"> Exit Preview</a>
        </Link>
      </div>
      <style jsx>
        {`
          p {
            position: fixed;
            right: 20px;
            bottom: 130px;
            color: #686de0;
            font-size: 20px;
          }

          .exit {
            text-align: center;
            position: fixed;
            right: 40px;
            bottom: 30px;
            display: block;
            background-color: #686de0;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            font-size: 20px;
            color: white;
            padding: 22px;
          }
        `}
      </style>
    </>
  );
};

Preview.propTypes = {
  preview: PropTypes.bool,
};

Preview.defaultProps = {
  preview: false,
};

export default Preview;
