import React from 'react';
import { Container } from 'react-bootstrap';
import getSortedProjectsData from '../lib/projects';
import PropTypes from 'prop-types';

import ProjectTile from '../components/ProjectTile';

export const metadata = {
  title: "Juien Cardinal's Projects",
  description: 'Every project I worked on.',
};

export default function Projects({ allProjectsData }) {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <Container>{allProjectsData.map(ProjectTile)}</Container>
      </div>
    );
}

  
export async function getStaticProps() {
    const allProjectsData = getSortedProjectsData();

    return {
        props: {
        allProjectsData,
        },
    };
}
  

Projects.propTypes = {
    allProjectpagesData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        abstract: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
};
