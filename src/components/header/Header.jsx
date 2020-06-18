import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import routes from '../../constants/routes';

const Header = () => {
  const NavLink = (link, text) => (
    <LinkContainer to={link} exact>
      <Nav.Link eventKey={link}>{text}</Nav.Link>
    </LinkContainer>
  );

  return (
    <Navbar bg="light" expand="lg" variant="light">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {NavLink(routes.LANDING, 'Главная')}
          {NavLink(routes.TEAM, 'О нас')}
          {NavLink(routes.SAVANNAH, 'Cаванна')}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
