import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export const NavigationBar = (props) => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/home">IMapp</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="/home">Acasa</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container >
        </Navbar >
    );
}