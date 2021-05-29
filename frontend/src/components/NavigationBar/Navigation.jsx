import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";

function Navigation() {
  return (
    <React.Fragment>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Tag Tag</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/home">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/search">
                  <Nav.Link>Search Image</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/addtag">
                  <Nav.Link>Add Tag</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/deleteimage">
                  <Nav.Link>Delete Image</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/similarimage">
                  <Nav.Link>Similar Images</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav className="ml-auto">
                <LinkContainer to="/logout">
                  <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </React.Fragment>
  );
}

export default Navigation;
