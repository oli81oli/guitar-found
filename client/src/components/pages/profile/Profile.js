import React, { Component } from 'react'
import { Link } from 'react-router-dom'



import UpdateUserForm from './UpdateUserForm'
import NewGuitarForm from '../newGuitar/NewGuitarForm'
import Message from '../../shared/Message'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import './Profile.css'

import authUserService from '../../../service/auth.userService'



class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.loggedIn.name,
            email: this.props.loggedIn.email,
            phone: this.props.loggedIn.phone,

            showModal: false,
            showModalGuitar: false,
            showToastUser: false,
            showToastGuitar: false,

        }

        this.authUserService = new authUserService()
       


    }

    handleUser = updatedUser => {

        this.setState({
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            showToastUser: true
        })
        this.handleModalUser(false)
    }


    handleModalUser = showModal => this.setState({ showModal })



    handleGuitar = () => {
        this.setState({ showToastGuitar: true })
        this.handleModalNewGuitar(false)
    }
    handleModalNewGuitar = showModalGuitar => this.setState({ showModalGuitar })


    

    delete = () => {
        this.authUserService
            .deleteUser(this.props.loggedIn._id)
            .then(() => {
                this.props.takeUser(null)
                this.props.history.push('/')
                this.props.message(false)
            })
            .catch(err => this.setState({ message: err.response.data.message }))

    }



    render() {

        return (
            <>
               
                <div className='profile'>

                    <h1>Hola!, {this.state.name} </h1>

                    <div className='flexBox'>
                        <p>{this.state.email}</p>
                        <p>{this.props.loggedIn.username}</p>
                        <p>{this.state.phone}</p>
                    </div>
                    <hr />
                    <Container>
                        <Row>
                            <Col sm={6} lg={3}>
                                <Link to="/profile/favs" >
                                    <div className='profile-btn'>
                                        <Button style={{ width: '80%' }} className='config-btn' size="sm" variant="light" >Mis Guitarras Favoritas</Button >
                                    </div>
                                </Link>

                            </Col>

                            <Col sm={6} lg={3}>
                                <Link to="/profile/myGuitars">
                                <div className='profile-btn'>
                                    <Button style={{ width: '80%' }} className='config-btn' size="sm" variant="light" >Mis Guitarras Publicadas</Button >
                                </div>
                                </Link>
                            </Col>
                            <Col sm={6} lg={3}>
                                <div className='profile-btn'>
                                    <Button style={{ width: '80%' }} onClick={() => this.handleModalUser(true)} className='config-btn' size="sm" variant="light" >Actualizar tus Datos</Button >
                                </div>
                            </Col>

                            <Col sm={6} lg={3}>
                                <div className='profile-btn'>
                                    <Button style={{ width: '80%' }} onClick={() => this.delete()} className='config-btn' size="sm" variant="light" >Darse de Baja</Button >
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>



                <Modal style={{ marginTop: 30 }} show={this.state.showModal} onHide={() => this.handleModalUser(false)}>
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



                <Modal style={{ marginTop: 30 }} show={this.state.showModalGuitar} onHide={() => this.handleModalNewGuitar(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title >Anuncia tu guitarra</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='config-modal-newGuitar'>
                        <NewGuitarForm loggedIn={this.props.loggedIn} closeModalGuitar={this.handleGuitar} />
                    </Modal.Body>
                </Modal>

                {this.state.showToastGuitar ? <Message text='Tu guitarra ha sido publicada' /> : null}
                {this.state.showToastUser ? <Message text='Tus datos han sido actualizados' /> : null}
            </>
        )
    }
}

export default Profile

