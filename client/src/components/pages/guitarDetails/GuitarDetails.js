import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import './GuitarDetails.css'

import UpdateGuitarForm from '../updateGuitar/UpdateGuitarForm'
import Message from '../../shared/Message'


import guitarService from './../../../service/guitar.service'
import authUserService from './../../../service/auth.userService'




class GuitarDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            owner: {},

            showModal: false,
            showToastGuitar: false,
            message: ''
        }
        this.guitarService = new guitarService()
        this.authUserService = new authUserService()
    }


    componentDidMount = () => {

        this.guitarService
            .getOneGuitar(this.props.match.params._id)
            .then(response => this.setState(response.data))
            .catch(err => this.setState({ message: err.response.data.message }))
    }


    delete = () => {

        this.guitarService
            .deleteGuitar(this.props.match.params._id)
            .then(() => this.props.history.push('/profile'))
            .catch(err => this.setState({ message: err.response.data.message }))
    }

    addFavourites = e => {

        e.preventDefault()

        const guitar = { user: this.props.loggedIn._id, guitar: this.state._id }
        this.authUserService
            .addFavouritesUser(guitar)
            .then(() => this.props.history.push('/profile'))
            .catch(err => this.setState({ message: err.response.data.message }))


    }


    handleGuitar = updatedGuitar => {
        this.setState({

            name: updatedGuitar.name,
            model: updatedGuitar.model,
            state: updatedGuitar.state,
            price: updatedGuitar.price,
            image: updatedGuitar.image,
            showToastGuitar: null
        })
        this.handleModalGuitar(false)



    }


    handleModalGuitar = () => {
        this.setState({ showToastGuitar: null })
        this.handleModal(false)
    }
    handleModal = showModal => this.setState({ showModal, showToastGuitar: true })



    render() {


        return (
            <Container>
                <main id='details'>
                    <p style={{ color: 'red' }}>{this.state.message}</p>
                    <Link to="/profile/" >
                        <Button style={{ marginBottom: '5% ' }} variant="light" size="sm">Volver al Perfil</Button>

                    </Link>
                    <h1 className='h1'>{this.state.name} {this.state.model}</h1>
                    <hr style={{ border: '1px solid white' }} />
                    <Button style={{ margin: '50px 0' }} onClick={this.addFavourites}
                        variant="light" size="sm">Añadir a Favoritos</Button>

                    <Row>
                        <Col md={4}>

                            <h2 className='owner'>Propietario: {this.state.owner ? this.state.owner.name : 'No existe'}</h2>
                            <hr />

                            <p className='p'>Email: {this.state.owner ? this.state.owner.email : 'No existe'}</p>
                            <p className='p'>Telefono: {this.state.owner ? this.state.owner.phone : 'No existe'}</p>
                            <p className='p'>Estado: {this.state.state}</p>
                            <p className='p'>Precio: {this.state.price}$</p>

                            {this.state.owner && this.props.loggedIn.name === this.state.owner.name ? <Button style={{ marginRight: 20 }} onClick={() => this.handleModal(true)} variant="light" size="sm">Actualizar</Button> : null}
                            {this.state.owner && this.props.loggedIn.name === this.state.owner.name ? <Button onClick={() => this.delete()} variant="light" size="sm">Eliminar</Button> : null}
                            <hr />

                            <Modal style={{ marginTop: 30 }} show={this.state.showModal} onHide={() => this.handleModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title >Actualizar datos</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className='config-modal-update'>
                                    <UpdateGuitarForm guitarData={this.state} handleGuitar={this.handleGuitar} />
                                </Modal.Body>
                            </Modal>
                        </Col>

                        <Col md={6}>
                            <img className='image-detail' alt={this.state.name} src={this.state.image} />
                        </Col>
                    </Row>
                </main>
                {this.state.showToastGuitar ? <Message text='Tu guitarra ha sido actualizada' /> : null}

            </Container>
        )
    }
}

export default GuitarDetails