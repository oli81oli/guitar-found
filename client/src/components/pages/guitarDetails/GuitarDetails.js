import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import './GuitarDetails.css'

import UpdateGuitarForm from '../updateGuitar/UpdateGuitarForm'

import guitarService from './../../../service/guitar.service'



class GuitarDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            owner: {},

            showModal: false
        }
        this.guitarService = new guitarService()
    }


    componentDidMount = () => {

        this.guitarService
            .getOneGuitar(this.props.match.params._id)
            .then(response => this.setState(response.data))
            .catch(err => console.log('Error:', err))
    }


    delete = () => {

        this.guitarService
            .deleteGuitar(this.props.match.params._id)
            .then(() => this.props.history.push('/profile'))
            .catch(err => console.log(err))
    }


    handleGuitar = updatedGuitar => {
        this.setState({

            name: updatedGuitar.name,
            model: updatedGuitar.model,
            state: updatedGuitar.state,
            price: updatedGuitar.price,
            image: updatedGuitar.image
        })
        this.handleModalGuitar(false)


    }


    handleModalGuitar = () => this.handleModal(false)
    handleModal = showModal => this.setState({ showModal })



    render() {


        return (
            <Container>
                <main id='details'>
                    <Link to="/profile/guitars" >
                        <Button style={{ marginBottom: '5% ' }} variant="light" size="sm">Volver</Button>

                    </Link>
                    <h1 className='h1'>{this.state.name} {this.state.model}</h1>
                    <hr style={{border:'1px solid white'}}/>
                    <Row>
                        <Col md={4}>

                            <h2 >Propietario: {this.state.owner.name}</h2>
                            <hr />
                            <p className='p'>Email: {this.state.owner.email}</p>
                            <p className='p'>Telefono: {this.state.owner.phone}</p>
                           

                            <p className='p'>Estado: {this.state.state}</p>
                            <p className='p'>Precio: {this.state.price}$</p>
                            {this.props.loggedIn.name === this.state.owner.name ? <Button style={{ marginRight: 20 }} onClick={() => this.handleModal(true)} variant="light" size="sm">Actualizar</Button> : null}
                            {this.props.loggedIn.name === this.state.owner.name ? <Button onClick={() => this.delete()} variant="light" size="sm">Eliminar</Button> : null}
                            <hr />

                            <Modal style={{ marginTop: 100}} show={this.state.showModal} onHide={() => this.handleModal(false)}>
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
            </Container>
        )
    }
}

export default GuitarDetails