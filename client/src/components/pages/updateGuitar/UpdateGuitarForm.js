import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import guitarService from './../../../service/guitar.service'
import filesService from '../../../service/files.service'



class UpdateGuitarForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            guitar: {
                name: this.props.guitarData.name,
                model: this.props.guitarData.model,
                state: this.props.guitarData.state,
                price: this.props.guitarData.price,
                image: this.props.guitarData.image
            },
            message: '',
            uploadingImage: false

        }
        this.guitarService = new guitarService()
        this.filesService = new filesService()


    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ guitar: { ...this.state.guitar, [name]: value } })

    }


    handleFormSubmit = e => {
        e.preventDefault()

        this.guitarService
            .editGuitar(this.props.guitarData._id, this.state.guitar)
            .then(response => this.props.handleGuitar(response.data))
            .catch(err => this.setState({ message: err.response.data.message }))
    }


    handleImageUpload = e => {

        this.setState({ uploadingImage: true })


        const uploadData = new FormData()
        uploadData.append('image', e.target.files[0])

        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    guitar: { ...this.state.guitar, image: response.data.secure_url },
                    uploadingImage: null
                })
            })
            .catch(err => this.setState({ message: err.response.data.message }))

    }




    render() {

        return (

            <Form onSubmit={this.handleFormSubmit}>

                <Form.Group>
                    <Form.Label style={{ color: 'white' }}>Marca</Form.Label>
                    <Form.Control type="text" name="name" value={this.state.guitar.name} onChange={this.handleInputChange} placeholder='marca' />
                </Form.Group>

                <Form.Group>
                    <Form.Label style={{ color: 'white' }}>Modelo</Form.Label>
                    <Form.Control type="text" name="model" value={this.state.guitar.model} onChange={this.handleInputChange} placeholder='modelo' />
                </Form.Group>

                <Form.Group>
                    <Form.Label style={{ color: 'white' }}>Estado</Form.Label>
                    <Form.Control type="text" name="state" value={this.state.guitar.state} onChange={this.handleInputChange} placeholder='estado' />
                </Form.Group>

                <Form.Group>
                    <Form.Label style={{ color: 'white' }}>Precio</Form.Label>
                    <Form.Control type="number" name="price" value={this.state.guitar.price} onChange={this.handleInputChange} placeholder='precio' />
                </Form.Group>

                <Form.Group >
                    <Form.Label style={{ color: 'white' }}>Foto</Form.Label>
                    <Form.Control style={{ backgroundColor: 'white', borderRadius: 5 }} type="file" name="image" onChange={this.handleImageUpload} />
                </Form.Group>

                <p style={{ color: 'red' }}>{this.state.message}</p>

                <Button style={{ marginTop: 20 }} variant="light" type="submit" disabled={this.state.uploadingImage}>{this.state.uploadingImage ? 'Subiendo Imagen...' : 'Actualizar Guitarra'}</Button>
            </Form>
        )
    }
}

export default UpdateGuitarForm