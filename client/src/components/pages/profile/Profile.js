import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import UpdateUserForm from './UpdateUserForm'
import NewGuitarForm from '../newGuitar/NewGuitarForm'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import './Profile.css'

import authUserService from '../../../service/auth.userService'



class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.loggedIn.name,
            username: this.props.loggedIn.username,
            email: this.props.loggedIn.email,
            phone: this.props.loggedIn.phone,

            showModal: false,
            showModalGuitar: false
        }

        this.authUserService = new authUserService()

    }

    handleUser = updatedUser => {

        this.setState({
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            phone: updatedUser.phone
        })
        this.handleModalUser(false)
    }


    handleModalUser = showModal => this.setState({ showModal })


    
    handleGuitar = () => this.handleModalNewGuitar(false)
    handleModalNewGuitar = showModalGuitar => this.setState({ showModalGuitar })



    delete = () => {
        this.authUserService
            .deleteUser(this.props.loggedIn._id)
            .then(() => {
                this.props.takeUser(null)
                this.props.history.push('/')
            })
            .catch(err => console.log(err))

    }


    render() {

        return (
            <>
                <div className='profile'>

                    <h2>Hola! {this.state.name}
                        <Button onClick={() => this.handleModalUser(true)} className='config-btn' size="sm" variant="light" >Actualizar Datos</Button >
                        <Button onClick={() => this.delete()} className='config-btn' size="sm" variant="light" >Dar de Baja</Button >
                    </h2>


                    <div className='flexBox'>
                        <p>{this.state.email}</p>
                        <p>{this.state.username}</p>
                        <p>{this.state.phone}</p>
                    </div>
                    <hr />

                </div>


                <Modal style={{marginTop:100}}show={this.state.showModal} onHide={() => this.handleModalUser(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title >Actualizar datos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: 'black' }}>
                        <UpdateUserForm loggedIn={this.props.loggedIn} closeModal={this.handleUser} />
                    </Modal.Body>
                </Modal>



                <Link to='/profile/guitars'>
                    <Button size="lg" variant="light" className='config-btn-center'>
                        Encuentra tu guitarra </Button>
                </Link>

                <Button onClick={() => this.handleModalNewGuitar(true)} size="lg" variant="light" className='config-btn-center'>
                    Anuncia tu guitarra </Button>



                <Modal style={{marginTop:100}} show={this.state.showModalGuitar} onHide={() => this.handleModalNewGuitar(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title >Anuncia tu guitarra</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='config-modal-newGuitar'>
                        <NewGuitarForm loggedIn={this.props.loggedIn} closeModalGuitar={this.handleGuitar} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Profile

