import React from 'react';
import TreeComponent from '../components/TreeComponent';
import { Container } from 'react-bootstrap';
import styles from './index.module.css';
import ClickableCV from '../components/ClickableCV';
import Timeline from '../components/Timeline';

import getSortedCareerData from '../lib/career';
import PropTypes from 'prop-types';


export const metadata = {
    title: "Juien Cardinal",
    description: 'Julien Cardinal is an AI Research Scientist specialising in RL and Optimisation Problems.',
};


const Home = ({ allCareerData }) => (
    
    <>  <div className={styles.banner}>
            <Container>
                <br />
                <br />
                <br />
                <br />
                <div className={styles.row}>
                    <div className={styles.citation}>
                        <span className={styles.line1}>He who plants a Tree</span>
                        <span className={styles.line2}>plants a Hope.</span>
                        <span className={styles.author}>Plant a Tree - Lucy Larcom</span>
                    </div>
                    <div className={styles.tree}>
                        <TreeComponent />
                    </div>
                </div>
            </Container>
        </div>
        <Container className={styles.ClickableCVContainer}>
            <ClickableCV />
        </Container>
        <Container className={styles.TimelineContainer}>
            <Timeline allCareerData={allCareerData} />
        </Container>
    </>
);

export default Home;

export async function getStaticProps() {
    const allCareerData = getSortedCareerData();

    return {
        props: {
        allCareerData,
        },
    };
}

Timeline.propTypes = {
    allCareerData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        abstract: PropTypes.string.isRequired,
      })
    ),
};
