import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PrintMarkdown from '../../components/PrintMarkdown';
import { Container } from 'react-bootstrap';
import getSortedblogsData from '../../lib/blog';
import PropTypes from 'prop-types';

export async function generateMetadata({ params, allblogsData }){
    const name = params.blogs;
    const project = select(allblogsData, name);
    return {
        title: project.title,
        description: project.abstract,
    };
}

function select(blogs, pageId) {
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].id === pageId) {
            return blogs[i];
        }
    }
    return {};
  }
  
function createPaths(content) {
    const res = [];
    for (let i = 0; i < content.length; i++) {
    res.push({ params: { blogs: content[i].id } });
    }
    return res;
}

export default function Post({ allblogsData }) {
    const router = useRouter();
    const name = router.query.blogs;
    const project = select(allblogsData, name);
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
    const allProjectpagesData = await getSortedblogsData();
    const paths = createPaths(allProjectpagesData);
    return {
      paths,
      fallback: false, // See the "fallback" section below
    };
  }
  
export async function getStaticProps() {
    const allblogsData = getSortedblogsData();

    return {
        props: {
        allblogsData,
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
