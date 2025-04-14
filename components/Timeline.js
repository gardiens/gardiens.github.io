import React from "react";
import { Container } from "react-bootstrap";

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import getSortedCareerData from "../lib/career";
import PropTypes from 'prop-types';
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faSchool, faProjectDiagram, faUsers, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'react-bootstrap';
import style from './Timeline.module.css';

import dynamic from 'next/dynamic';
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });
export default function Timeline({ allCareerData }) {
    const types = ['education', 'work', 'project', 'association', 'competition'];
    const icons = [faSchool, faBriefcase, faProjectDiagram, faUsers, faTrophy];
    const colors = ['#1ab75f', '#d52020', '#f7f7f7', '#f7f7f7', '#f7f7f7'];
    return (
        <div>
            <h1>Career</h1>
            <Container>
                <VerticalTimeline lineColor={'#3e2a6c'}>
                    {allCareerData.map((career) => (
                        <VerticalTimelineElement
                            className={`vertical-timeline-element--${career.type}`}
                            contentStyle={{ background: 'rgba(250, 250, 250, 0.8)', color: '#000' }}
                            contentArrowStyle={{ borderRight: `10px solid #ddd`, marginLeft: '1px'}}
                            key={career.key}
                            date={career.period}
                            iconStyle={{ background: colors[types.indexOf(career.type)], color: '#fff' }}
                            icon={<FontAwesomeIcon icon={icons[types.indexOf(career.type)]} />}
                        >
                            <style>
                                {`
                                .vertical-timeline-element--${career.type} .vertical-timeline-element-content {
                                    border-top: 3px solid ${colors[types.indexOf(career.type)]};
                                }
                                `}
                            </style>
                            <h3 className={style.title}>{career.title}</h3>
                            <div className={style.compagny}><i>{career.company}</i></div>
                            {career.tags.map((tag, index) => (
                                <Badge key={index} variant="primary" className={style.Badge}>
                                    {tag}
                                </Badge>
                            ))}
                            <ReactMarkdown>{career.abstract}</ReactMarkdown>
                        </VerticalTimelineElement>
                    ))}
                 
                </VerticalTimeline>
            </Container>
        </div>
    );
}

