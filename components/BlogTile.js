import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import PrintMarkdown from './PrintMarkdown';
import PropTypes from 'prop-types';
import Link from 'next/link';
import style from './ProjectTile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import copy from 'copy-to-clipboard';

export default function BlogsTile({ id, date, title, abstract, content, tags, stags, image, links, linksDescription}) {
    const [hidden, setHidden] = useState(true);
    const [show, setShow] = useState(false);
    return (
        <Row 
        id={id}
        key={id}
        >
            <Col className={style.tile}>
                <div className={style.date}>
                {date.slice(3)}
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
                        <Link href={`/blogs/${id}`} className={style.link}>
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
                            copy(`${window.location.origin}/blogs#${id}`);

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
                        <Link href={`/blogs/${id}`}>
                        <img src={`/blogs/${id}/${image}`} alt={title} className={style.image}/>
                        </Link>
                        :
                        <img src={`/blogs/${id}/${image}`} alt={title} className={style.image}/>
                    }
                </div>
            </Col>
        </Row>
    );
};


BlogsTile.propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    abstract: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};
