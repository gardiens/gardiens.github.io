import React from 'react';
import { Container } from 'react-bootstrap';
import getSortedCompetitionsData from '../lib/competitions';
import PropTypes from 'prop-types';

import CompetitionTile from '../components/CompetitionTile';

export const metadata = {
    title: "Juien Cardinal's Competitions",
    description: 'Every competition I have participated in.',
};

export default function Competitions({ allCompetitionsData }) {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <Container>{allCompetitionsData.map(CompetitionTile)}</Container>
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
  

Competitions.propTypes = {
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
