import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PrintMarkdown from '../../components/PrintMarkdown';
import { Container } from 'react-bootstrap';
import getSortedCompetitionsData from '../../lib/competitions';
import PropTypes from 'prop-types';

export async function generateMetadata({ params, allCompetitionsData }){
    const name = params.competitions;
  
      const competition = select(allCompetitionsData, name);
      return {
          title: competition.title,
          description: competition.abstract,
      };
}

function select(competitions, pageId) {
    for (let i = 0; i < competitions.length; i++) {
        if (competitions[i].id === pageId) {
            return competitions[i];
        }
    }
    return {};
  }
  
function createPaths(content) {
    const res = [];
    for (let i = 0; i < content.length; i++) {
    res.push({ params: { competitions: content[i].id } });
    }
    return res;
}

export default function Post({ allCompetitionsData }) {
    const router = useRouter();
    const name = router.query.competitions;
    const competition = select(allCompetitionsData, name);
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Container>
            <PrintMarkdown text={competition.content} id={competition.id}/>
        </Container>
      </div>
    );
}


export async function getStaticPaths() {
    const allCompetitionpagesData = await getSortedCompetitionsData();
    const paths = createPaths(allCompetitionpagesData);
    return {
      paths,
      fallback: false, // See the "fallback" section below
    };
  }
  
export async function getStaticProps() {
    const allCompetitionsData = getSortedCompetitionsData();

    return {
        props: {
        allCompetitionsData,
        },
    };
}


Post.propTypes = {
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
