import PropTypes from 'prop-types';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Router } from "react-router-dom";

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames';
import styles from './Header.module.css';

function NavLink({ href, children, eventKey }) {
  const classes = classNames({
    [styles.link]: true,
    [styles.isActive]:
      Router.location === href,
  });

  return (
    <Nav.Item>
      <Nav.Link href={href} eventKey={eventKey} className={classes}>
          {children}
      </Nav.Link>
    </Nav.Item>
  );
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  eventKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};


  
export default function Header() {
  return (
    <Navbar
      expand='lg'
      className={styles.bg}
      variant=''
      collapseOnSelect
      fixed='top'
    >
      <Container>
        <Navbar.Brand href='/' as={Nav.Link}>
          <img src='/assets/android-chrome-512x512.png' alt='logo' className={styles.logo} />
        </Navbar.Brand>
        <Navbar.Text className={styles.text} href='/' as={Nav.Link}>
          Pierrick De Bournez
        </Navbar.Text>

        <Navbar.Toggle aria-controls='basic-navbar-nav'>
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: 'white', width: '20px', height: '20px' }}
          />
        </Navbar.Toggle>

        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='justify-content-end' style={{ width: '100%' }}>
            <NavLink href='/' eventKey='1'>
              Home
            </NavLink>
            <NavLink href='/projects' eventKey='2'>
              Projects
            </NavLink>
            <NavLink href='/competitions' eventKey='3'>
              Competitions
            </NavLink>
            <NavLink href='/references' eventKey='4'>
              References
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
  