import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PrintMarkdown from '../../components/PrintMarkdown';
import { Container } from 'react-bootstrap';
import getSortedProjectsData from '../../lib/projects';
import PropTypes from 'prop-types';

export async function generateMetadata({ params, allProjectsData }){
    const name = params.projects;
    const project = select(allProjectsData, name);
    return {
        title: project.title,
        description: project.abstract,
    };
}

function select(projects, pageId) {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === pageId) {
            return projects[i];
        }
    }
    return {};
  }
  
function createPaths(content) {
    const res = [];
    for (let i = 0; i < content.length; i++) {
    res.push({ params: { projects: content[i].id } });
    }
    return res;
}

export default function Post({ allProjectsData }) {
    const router = useRouter();
    const name = router.query.projects;
    const project = select(allProjectsData, name);
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Container>
            <PrintMarkdown text={project.content} id={project.id}/>
        </Container>
      </div>
    );
}


export async function getStaticPaths() {
    const allProjectpagesData = await getSortedProjectsData();
    const paths = createPaths(allProjectpagesData);
    return {
      paths,
      fallback: false, // See the "fallback" section below
    };
  }
  
export async function getStaticProps() {
    const allProjectsData = getSortedProjectsData();

    return {
        props: {
        allProjectsData,
        },
    };
}


Post.propTypes = {
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
