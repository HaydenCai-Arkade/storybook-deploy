import { Highlight } from "react-instantsearch-dom";
import SSRLink from "helper/SSRLink";
import PropTypes from "prop-types";

const HitComponent = ({ hit }) => {
  const { title, image, handle, price, compare_at_price } = hit;
  return (
    <div className="hit">
      <div>
        <div className="hit-picture">
          <p>{title}</p>
          <SSRLink linkUrl={`/products/${handle}`} linkType="Product">
            <img src={`${image}`} alt={title} className="product-image" />
          </SSRLink>

          {compare_at_price !== 0 ? <div className="sale">sale</div> : null}
        </div>
      </div>
      <div className="hit-content">
        <div>
          <Highlight attribute="name" hit={hit} />
          <span> ${price}</span>
        </div>
      </div>

      <style>{`

      .results{
        width:90vw;
      }

      .ais-Hits-list{
        width:1200px;
        margin:0 auto;
        display: flex;
        flex-flow: row;
        flex-wrap:wrap;
      }

      .ais-Hits-item{
        position:relative;
        width:400px;
        margin-bottom:30px;
        display:block;
      }
      .product-image{
        width:350px;
        cursor:pointer;
      }

      .sale{
        height:40px;
        width:40px;
        background-color:#e74c3c;
        color:white;
        font-size:14px;
        padding-top:10px;
        text-align:center;
        border-radius:50%;
        position:absolute;
        top:70px;
        left:10px;
      }

      @media only screen and (min-width: 768px) {
        .product-image{
          width:300px;
          cursor:pointer;
        }

        .ais-Hits-item{
          margin-right:30px;
          width:300px;
        }

        .hit{
          width:300px;
        }
      }
    `}</style>
    </div>
  );
};

HitComponent.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default HitComponent;
