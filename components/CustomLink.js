import PropTypes from 'prop-types';
import React from 'react';
import { Link } from "react-router-dom"


export default function CustomLink({ children, href }) {
  return href.startsWith('/') || href === '' ? (
    <Link path="/">
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  );
}

CustomLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};
