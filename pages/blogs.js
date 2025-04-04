import React from 'react';
import { Container } from 'react-bootstrap';
import getSortedBlogsData from '../lib/blog';
import PropTypes from 'prop-types';

import BlogTile from '../components/BlogTile';

export const metadata = {
  title: "Pierrick bournez Projects",
  description: 'Every project I worked on.',
};

export default function Blogs({ allBlogsData }) {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <Container>{allBlogsData.map(BlogTile)}</Container>
      </div>
    );
}

  
export async function getStaticProps() {
    const allBlogsData = getSortedBlogsData();

    return {
        props: {
        allBlogsData,
        },
    };
}
  

Blogs.propTypes = {
    allBlogspagesData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        abstract: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
};
