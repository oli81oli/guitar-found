import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import UpdateUserForm from './UpdateUserForm'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import './Profile.css'



class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.loggedIn.name,
            username: this.props.loggedIn.username,
            email: this.props.loggedIn.email,
            phone: this.props.loggedIn.phone,

            showModal: false
        }

    }
    handleUser = updatedUser => {

        this.setState({
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            phone: updatedUser.phone
        })
        this.handleModal(false)
    }

    handleModal = showModal => this.setState({ showModal })


    render() {

        return (
            <>
                <div className='profile'>
                    <h2>Hola! {this.state.name}
                        <Button onClick={() => this.handleModal(true)} className='config-btn' size="sm" variant="light" >Actualizar Datos</Button >
                    </h2>

                    <div className='flexBox'>
                        <p>jhjkhjkhkj{this.state.email}</p>
                        <p>oliiiiiii{this.state.username}</p>
                        <p>{this.state.phone}</p>
                    </div>
                    <hr />
                </div>

                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title >Actualizar datos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'black'}}>
                        <UpdateUserForm loggedIn={this.props.loggedIn} closeModal={this.handleUser} />
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}

export default Profile