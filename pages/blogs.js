import React from 'react';
import { Container } from 'react-bootstrap';
import getSortedCompetitionsData from '../lib/blog';
import PropTypes from 'prop-types';

import BlogsTile from '../components/BlogTile';

export const metadata = {
    title: "Pierrick's Bournez Competition",
    description: 'I am learning :).',
};

export default function Blogs({ allCompetitionsData }) {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <Container>
        {/* 🧠 Top Text Here */}
        <div className="mb-5">
          <h1>Welcome to my Blog</h1>
          <p className="lead">This is where I will document my opinions and projects. All views are my own.</p>
        </div>

        {/* Blog Tiles */}
        {allCompetitionsData.map(BlogsTile)}
      </Container>
    </div>
  );
}

  
export async function getStaticProps() {
    const allCompetitionsData = getSortedCompetitionsData();

    return {
        props: {
        allCompetitionsData,
        },
    };
}
  

Blogs.propTypes = {
    allCompetitionpagesData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        abstract: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
};
