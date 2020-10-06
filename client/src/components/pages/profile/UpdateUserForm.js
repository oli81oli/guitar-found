import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import authUserService from '../../../service/auth.userService'

class UpdateUserForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.loggedIn.name,
            username: this.props.loggedIn.username,
            email: this.props.loggedIn.email,
            phone: this.props.loggedIn.phone
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
            .updateUser(this.props.loggedIn._id, this.state)
            .then(response => {
                this.props.closeModal(response.data)
            })
            .catch(err => console.log('Erroro!!', { err }))
    }




    render() {

        return (

            <Form onSubmit={this.handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type="number" name="phone" value={this.state.phone} onChange={this.handleInputChange} />
                </Form.Group>

                <Button variant="dark" type="submit">Actualizar datos</Button>
            </Form>
        )
    }
}

export default UpdateUserForm