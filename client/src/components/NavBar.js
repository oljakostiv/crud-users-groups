import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {USERS_ROUTE, GROUPS_ROUTE} from "../utils/consts";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <NavLink
                    style={{textDecoration: 'none', color: 'grey', fontWeight: 'bold', fontSize: '20px'}}
                    to={USERS_ROUTE}
                >
                    CRUD
                </NavLink>

                <Nav className="ml-auto">
                    <Button
                        onClick={() => navigate(USERS_ROUTE)}
                        variant={'outline-secondary'}
                    >
                        Users
                    </Button>

                    <Button
                        onClick={() => navigate(GROUPS_ROUTE)}
                        variant={'outline-secondary'}
                        style={{marginLeft: 20}}
                    >
                        Groups
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
