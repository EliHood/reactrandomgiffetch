import React from "react";
import PropTypes from "prop-types";

const styles = {
  width: "300px",
  height: "300px"
};

const Card = ({ title, url }) =>
  title && url ? ( // if a title and url are passed in, return <div>...</div>, else return "null"
    <div className="card">
      <h1>{title}</h1>
      <div>
        <img alt="" src={url} styles={styles} />
      </div>
    </div>
  ) : null;

// PropTypes will throw a warning if either of them is missing
Card.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string
};

export default Card;