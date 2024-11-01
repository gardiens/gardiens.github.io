import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';
import ClickableCV from '../components/ClickableCV';
import { Shiba } from '../components/shiba';
import Timeline from '../components/Timeline';
import getSortedCareerData from '../lib/career';
import styles from './index.module.css';
export const metadata = {
    title: "Pierrick Bournez",
    description: 'Pierrick Bournez is an AI student  specialising in geometry and Deep Learning .',
};
import TreeComponent from '../components/TreeComponent';
import { Frog } from '../components/frog';
const Home = ({ allCareerData }) => (
    
    <>  <div className={styles.banner}>
            <Container>
                <br />
                <br />
                <br />
                <br />
                <div className={styles.row}>
                    <div className={styles.citation}>
                        <span className={styles.line1}>Hi</span>
                        <span className={styles.line2}>It's Pierrick.</span>
                        <span className={styles.author}>I like 3D models :O </span>
                    </div>
                    <div className={styles.tree}>
                        <Frog />
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
        {/* <Container className={styles.ShibaContainer}>
        <Shiba />
    </Container> */}

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
