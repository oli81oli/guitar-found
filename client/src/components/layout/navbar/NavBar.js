import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import './Navbar.css'
import logo from './logo.png'

import authUserService from '../../../service/auth.userService'


class NavBar extends Component {
    constructor(props) {
        super(props)

        this.authUserService = new authUserService()
    }

    logout = () => {
        this.authUserService
            .logout()
            .then(() => this.props.takeUser(null))
            .catch(err => console.log(err))
    }



    render() {

        return (
            <>
                <nav>
                    <Navbar variant="dark" expand="md" style={{ marginBottom: 40 }}>

                        <Link to="/">
                            <Navbar.Brand>
                                <img
                                    alt="Logo"
                                    src={logo}
                                    width="50"
                                    height="50"
                                    className="d-inline-block align-top"
                                />{' '}
                            </Navbar.Brand>
                        </Link>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'white' }} />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Link to="/signup">
                                    <Button className="nav-btn" variant="outline-light" size="sm">Registro</Button>
                                </Link>
                                <Link to="/login">
                                    <Button className="nav-btn" variant="outline-light" size="sm">Iniciar Sesion</Button>
                                </Link>
                                <Link to="/">
                                    {this.props.loggedIn ? <Button onClick={this.logout} className="nav-btn" variant="outline-light" size="sm">Cerrar Sesion</Button> : null}
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </nav>
            </>
        )
    }
}

export default NavBar