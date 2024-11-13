import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from './Divider';

export default function Footer(props) {
  return (
    <>
      <Container {...props}>
        <Row
          className='justify-content-md-center'
          style={{ padding: '100px 0 80px', textAlign: 'center' }}
        >
          <Col md='auto'>
            <h3
              style={{
                color: 'green',
                textTransform: 'uppercase',
                fontWeight: '300',
                marginBottom: '22px',
                fontFamily: ['Open Sans', 'sans-serif'],
                fontSize: '1.9em',
              }}
            >
              My Socials
            </h3>
            <Divider />
          </Col>
        </Row>
        <Row className='d-none d-sm-flex'>
          <Col style={{ display: 'flex', flex: 1 }}>
            <div style={{ height: '70px', width: '70px' }}>
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{
                  color: '#374354',
                  fontSize: '40px',
                  margin: '0px 15px 15px 15px',
                }}
              />
            </div>
            <div>
              <h3
                style={{
                  fontSize: '20px',
                  color: '#151515',
                  margin: 0,
                  padding: 0,
                }}
              >
                Mail :
              </h3>
              <p>
                <a href="mailto:pierrick.bournez@student-cs.fr">pierrick.bournez@student-cs.fr</a>
              </p>
            </div>
          </Col>
          <Col
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'flex-end',
              padding: '0 10px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                padding: '0 5px',
                display: 'inline-block',
              }}
            >
              {/* <a
                target='_blank'
                rel='noreferrer'
                href='https://www.france-ioi.org/user/perso.php?sLogin=juliencardinal'
              >
                <img
                  style={{ maxWidth: '100%' }}
                  src='/images/fioi3.png'
                  alt='france ioi logo'
                />
              </a> */}
            </div>

            <div
              style={{
                width: '60px',
                height: '60px',
                padding: '0 5px',
                display: 'inline-block',
              }}
            >
              {/* <a
                target='_blank'
                rel='noreferrer'
                href='https://www.kaggle.com/juliencardinal'
              >
                <img
                  style={{ maxWidth: '100%' }}
                  src='/images/kaggle3.png'
                  alt='kaggle logo'
                />
              </a> */}
            </div>

            <div
              style={{
                width: '60px',
                height: '60px',
                padding: '0 5px',
                display: 'inline-block',
              }}
            >
              <a
                target='_blank'
                rel='noreferrer'
                href='https://www.linkedin.com/in/pierrick-bournez/'
              >
                <img
                  style={{ maxWidth: '100%' }}
                  src='/images/linkedin.png'
                  alt='linkedin logo'
                />
              </a>
            </div>

            <div
              style={{
                width: '60px',
                height: '60px',
                padding: '0 5px',
                display: 'inline-block',
              }}
            >
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/gardiens'
              >
                <img
                  style={{ maxWidth: '100%' }}
                  src='/images/github.png'
                  alt='github logo'
                />
              </a>
            </div>
          </Col>
        </Row>
        <div
          className='d-sm-none'
          style={{
            flex: 1,
            flexDirection: 'colomn',
            alignContent: 'flex-start',
          }}
        >
          <Row style={{ display: 'flex', flex: 1 }}>
            <div>
              <h3
                style={{
                  fontSize: '20px',
                  color: '#151515',
                  margin: 0,
                  padding: 0,
                }}
              >
                Mail :
              </h3>
              <p>
                <a href="mailto:pierrick[DOT]bournez@student-cs[DOT]fr">pierrick[DOT]bournez@student-cs[DOT]fr</a>
              </p>
            </div>
          </Row>
          <Row
            style={{
              flex: 1.65,
              flexDirection: 'row',
              padding: '0 5px',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                padding: '0 5px',
                display: 'inline-block',
              }}
            >
              <a
                target='_blank'
                rel='noreferrer'
                href='https://www.france-ioi.org/user/perso.php?sLogin=juliencardinal'
              >
                <img
                  style={{ maxWidth: '100%' }}
                  src='/images/fioi3.png'
                  alt='france ioi logo'
                />
              </a>
            </div>

            <div
              style={{
                width: '60px',
                height: '60px',
                padding: '0 5px',
                display: 'inline-block',
              }}
            >
              <a
                target='_blank'
                rel='noreferrer'
                href='https://www.kaggle.com/juliencardinal'
              >
                <img
                  style={{ maxWidth: '100%' }}
                  src='/images/kaggle3.png'
                  alt='kaggle logo'
                />
              </a>
            </div>

            <div
              style={{
                width: '60px',
                height: '60px',
                padding: '0 5px',
                display: 'inline-block',
              }}
            >
              <a
                target='_blank'
                rel='noreferrer'
                href='https://linkedin.com/in/julcardinal'
              >
                <img
                  style={{ maxWidth: '100%' }}
                  src='/images/linkedin.png'
                  alt='linkedin logo'
                />
              </a>
            </div>

            <div
              style={{
                width: '60px',
                height: '60px',
                padding: '0 5px',
                display: 'inline-block',
              }}
            >
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/gardiens'
              >
                <img
                  style={{ maxWidth: '100%' }}
                  src='/images/github.png'
                  alt='github logo'
                />
              </a>
            </div>
          </Row>
        </div>
      </Container>
      <div
        style={{
          padding: '1em 0',
          backgroundColor: '#383737',
          textAlign: 'center',
          color: 'white',
          fontSize: '0.8em',
        }}
      >
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span >
              © 2023-2024 - Property of Pierrick Bournez</span>
            <a href='https://github.com/gardiens/gardiens.github.io' style={{textDecoration: "none"}}>
              Website Source Code
            </a>
          </div>
        </Container>
      </div>

    </>
  );
}
