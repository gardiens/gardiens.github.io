import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import PrintMarkdown from './PrintMarkdown';
import PropTypes from 'prop-types';
import Link from 'next/link';
import style from './CompetitionTile.module.css';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import copy from 'copy-to-clipboard';


export default function CompetitionTile({ id, date, title, abstract, content, tags, stags, image, links, linksDescription, rank, leaderboard}) {
    const [rankNumber, totalNumber] = rank.split('/');
    let color = 'black';
    if (rankNumber == 1) {
        color = 'gold';
    } else if (rankNumber/totalNumber < 0.2) {
        color = 'silver';
    } else if (rankNumber/totalNumber < 0.5) {
        color = 'bronze';
    }
    const [hidden, setHidden] = useState(true);
    const [show, setShow] = useState(false);
    return (
        <Row
        id={id}
        key={id}
        >
            <Col className={style.tile}>
                <div className={style.leftContainer}>
                    <div className={style.date}>
                        {date.slice(3)}
                    </div>
                    {rank!="" &&
                    leaderboard!="" ?
                    <Link href={leaderboard} style={{textDecoration: 'none'}}>
                        <div className={style.rank} style={{color: color}}>
                            <FontAwesomeIcon icon={faMedal} style={{marginRight: '5px'}}/>
                            {rank}
                        </div>
                    </Link>
                    :
                    <div className={style.rank} style={{color: color}}>
                        <FontAwesomeIcon icon={faMedal} style={{marginRight: '5px'}}/>
                        {rank}
                    </div>}
                </div>
                
                <div className={style.content}>
                <h3
                    onMouseEnter={() => {
                        setHidden(false);
                    }}
                    onMouseLeave={() => {
                        setHidden(true);
                    }}
                    className={style.title}
                    >
                    {content !== '' ?
                        <Link href={`/competitions/${id}`} className={style.link}>
                        {title}
                        </Link>
                    :
                        title
                    }
                    <OverlayTrigger
                        placement='top'
                        show={show && !hidden}
                        overlay={<Tooltip>Copied !</Tooltip>}
                    >
                        <FontAwesomeIcon
                        icon={faLink}
                        hidden={hidden}
                        className={style.anchor}
                        onClick={() => {
                            // Copy link to clipboard
                            copy(`${window.location.origin}/competitions#${id}`);

                            // Activate overlay
                            setShow(true);
                            setTimeout(() => {
                            setShow(false);
                            }, 1000);
                        }}
                        />
                    </OverlayTrigger>
                    </h3>
                    <div className={style.tags}>
                        {tags.map((tag, index) => (
                            <OverlayTrigger
                                key={tag}
                                placement="bottom"
                                overlay={<Tooltip id={tag}>{tag}</Tooltip>}
                            >
                                <Button variant="secondary" className={style.tagButton}>
                                    {stags[index]}
                                </Button>
                            </OverlayTrigger>
                        ))}
                    </div>
                    <div>
                        <PrintMarkdown text={abstract} id={id}/>
                    </div>
                    <div>
                        {links.map((link, index) => (
                            <Button key={link} variant="primary" className={style.linkButton} href={link}>
                                {linksDescription[index]}
                            </Button>
                        ))}
                    </div>
                    
                </div>
                <div className={style.imagecontainer}>
                    {content !== '' ?
                    <Link href={`/competitions/${id}`}>
                        <img src={`/competitions/${id}/${image}`} alt={title} className={style.image}/>
                    </Link>
                    :
                    <img src={`/competitions/${id}/${image}`} alt={title} className={style.image}/>
                    }
                </div>
            </Col>
        </Row>
    );
};


CompetitionTile.propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    abstract: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};
