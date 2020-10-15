import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './Login.css'

import authUserService from '../../../service/auth.userService'


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
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
            .login(this.state)
            .then(response => {
                this.props.takeUser(response.data)
                this.props.history.push('/profile')
            })
            .catch(err => this.setState({ message: err.response.data.message }))
    }


    render() {

        return (
            <>
                <section>
                    <Form className='config-form' onSubmit={this.handleFormSubmit}>
                        <h1>Inicio de Sesion</h1>

                        <Form.Group >
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} placeholder='Indica tu Usuario' />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder='Indica tu Contraseña' />
                        </Form.Group>

                        <p style={{ color: 'red' }}>{this.state.message}</p>
                        <Button style={{ marginTop: 20 }} variant="light" size="sm" type="submit">Entrar</Button>
                    </Form>

                </section>
            </>
        )
    }
}

export default Login