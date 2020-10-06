import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './Signup.css'

import authUserService from '../../../service/auth.userService'

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            password: '',
            email: '',
            phone: 0,
            message: ''
        }
        this.authUserService = new authUserService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.authUserService
            .signup(this.state)
            .then(response => {
                this.props.takeUser(response.data)
                this.props.history.push('/')
            })
            .catch(err => this.setState({ message: err.request.response }))
    }


    render() {

        return (
            <>
                <section>
                    <h1 style={{ color: 'rgb(169,169,169)' }} >Registro de usuario</h1>
                    <Form style={{ color: 'rgb(169,169,169)' }} onSubmit={this.handleFormSubmit}>

                        <Form.Group >
                            <Form.Label >Nombre</Form.Label>
                            <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control type="number" name="phone" value={this.state.phone} onChange={this.handleInputChange} />
                        </Form.Group>
                        <p>{this.state.message}
                        </p>
                        <Button variant="outline-light" size="sm" type="submit">Registrar</Button>
                    </Form>
                </section>
            </>
        )
    }
}

export default Signup