import React from 'react';
import ReferenceTile from '../components/ReferenceTile';
import { Container } from 'react-bootstrap';
import { min } from 'd3';

const References = () => (
    <div>
        <br />
        <br />
        <br />
        <br />
        <br />

        <Container>
            <h1> Books</h1>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '10px'}}>
                <ReferenceTile title="Analyse Harmonique réelle" author="Michel Willem" description="My reference book for Analyse harmonique" img="references/Willem.png" link="None" date=""/>
                <ReferenceTile title="convex analysis and monotone operator theory in hilbert spaces" author="HH Bauschke" description="The Convex Optimization Bible" img="references/Brauschke.png" link="None" date=""/>
                <ReferenceTile title="Computational Geometry Algorithms and Applications" author="De Berg,Cheong,Van Kreveld" description="Really great book on algorithmic geometry" img="references/comput_geometry.png" link="https://cimec.org.ar/foswiki/pub/Main/Cimec/GeometriaComputacional/DeBerg_-_Computational_Geometry_-_Algorithms_and_Applications_2e.pdf" date=""/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '10px' }}>
                <ReferenceTile title="Probabilistic Machine Learning: Advanced Topics" author="Kevin P. Murphy" description="A Statistical Approach to Deep Learning" img="references/probabilistic_ML.jpg" link="https://probml.github.io/pml-book/book2.html" date=""/>
                <ReferenceTile title="Deep Learning" author="Ian Goodfellow, Yoshua Bengio and Aaron Courville" description="The Deep Learning Bible" img="references/deep_learning.jpg" link="https://www.deeplearningbook.org/" date="2016"/>
                <ReferenceTile title="Reinforcement Learning: An Introduction" author="Richard S. Sutton and Andrew G. Barto" description="The RL Bible" img="references/sutton_barto.jpeg" link="https://inst.eecs.berkeley.edu/~cs188/sp20/assets/files/SuttonBartoIPRLBook2ndEd.pdf" date="2014"/>
            </div>
            <h1> Videos</h1>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '10px' }}>
                <ReferenceTile title="UCL Course on RL" author="David Silver" description="After almost 10 years and it is still the reference to learn RL" img="references/david_silver.jpg" link="https://www.youtube.com/watch?v=2pWv7GOvuf0&list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ" date=""/>
                <ReferenceTile title="M2 MVA Convex Optimization, Algorithms and Applications" author="Alexandre d'Aspremont" description="Great Course on Convex Optimization" img="references/Alexandre_aspremont.png" link="https://www.di.ens.fr/~aspremon/OptConvexeM2.html" date=""/>
                <ReferenceTile title="Automatants - Full AI Course" author="Automatants : AI Association of Centralesupelec" description="AI Course (in french)" img="references/Automatants.png" link="https://automatants.cs-campus.fr/formations" date=""/>
            </div>
        </Container>
    </div>
);

export default References;