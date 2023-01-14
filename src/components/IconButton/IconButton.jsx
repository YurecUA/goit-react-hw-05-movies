import React from 'react';
import './IconButton.scss';
import PropTypes from 'prop-types';

const IconButton = ({ children, onClick, ...allyProps }) => (
  <button type="button" className="icon-button" onClick={onClick} {...allyProps}>
    {children}
  </button>
);

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;
