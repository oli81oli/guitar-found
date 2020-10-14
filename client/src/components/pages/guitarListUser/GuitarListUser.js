import React, { Component } from 'react'
import { Link } from 'react-router-dom'



import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


import GuitarCard from './GuitarCard'


import guitarService from '../../../service/guitar.service'


class GuitarListUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            guitars: [],
            filteredGuitars: [],


            nameFilter: '',
            priceFilter: '',
            stateFilter: ''


        }
        this.guitarService = new guitarService()
    }


    componentDidMount = () => this.loadGuitars()

    loadGuitars = () => {
        this.guitarService
            .getAllGuitars()
            .then(response => this.setState({ guitars: response.data, filteredGuitars: response.data }))
            .catch(err => console.log('------', err))

    }



    handleInputName = e => {
        this.setState({ nameFilter: e.target.value }, () => this.filterSearch())

    }
    handleInputState = e => {
        this.setState({ stateFilter: e.target.value }, () => this.filterSearch())

    }
    handleInputPrice = e => {
        this.setState({ priceFilter: e.target.value }, () => this.filterSearch1())

    }




    reset = () => {
        this.loadGuitars()
        this.setState({ nameFilter: '', priceFilter: '', stateFilter: '' })

    }



    filterSearch = () => {

        const guitarsToShow = this.state.filteredGuitars
            .filter(guitar => guitar.name.includes(this.state.nameFilter))
            .filter(guitar => guitar.state.includes(this.state.stateFilter))

        this.setState({ filteredGuitars: guitarsToShow })
    }
    filterSearch1 = () => {

        const guitarsToShow = this.state.filteredGuitars
            .filter(guitar => guitar.price <= this.state.priceFilter)

        this.setState({ filteredGuitars: guitarsToShow })
    }



    displayGuitars = () => this.state.filteredGuitars.map((elm, idx) => <GuitarCard key={idx} {...elm} />)


    render() {

        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <Link to='/profile'>
                                <Button style={{ marginBottom: 40 }} variant="light" size="sm">Volver</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>


                <Container>
                    <h2 className='text-header'>Personaliza tu Busqueda</h2>
                    <Row>
                        <Col lg={4}>
                            <Form>
                                <Form.Group>
                                    <Form.Label style={{ color: 'white' }}>Marca</Form.Label>
                                    <Form.Control size="lg" name="nameFilter" value={this.state.nameFilter} onChange={this.handleInputName} placeholder='Escriba una marca'>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col lg={4}>
                            <Form>
                                <Form.Group>
                                    <Form.Label style={{ color: 'white' }}>Estado</Form.Label>
                                    <Form.Control as="select" size="lg" name="stateFilter" onChange={this.handleInputState}>

                                        <option value=''>Elija una opcion</option>
                                        <option value='nueva'>Nueva</option>
                                        <option value='casi nueva'>Casi Nueva</option>
                                        <option value='restaurada'>Restaurada</option>
                                        <option value='mas de 7 años'>Mas de 7 años</option>


                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col lg={4}>
                            <Form>
                                <Form.Group>
                                    <Form.Label style={{ color: 'white' }}>Precio</Form.Label>
                                    <Form.Control as="select" size="lg" name="priceFilter" onChange={this.handleInputPrice}>
                                        <option value=''>Elija una opcion</option>
                                        <option value='250'>Menos de 250 $</option>
                                        <option value='550'>Menos de 550 $</option>
                                        <option value='1000'>Menos de 1000 $</option>
                                        <option value='5000'>Menos de 5000 $</option>
                                        <option value='10000'>Menos de 10000 $</option>


                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row >
                </Container>

                <Container>
                    <Row>
                        <Col style={{ marginTop: 10, marginBottom: 80 }}>

                            <Button onClick={() => this.reset()} variant="light" size="sm">Desactivar Busqueda</Button>
                        </Col>
                    </Row>
                </Container>


                <Row>
                    {!this.state.guitars.length || !this.state.filteredGuitars.length ? <Spinner className="center-spinner2" size="md" animation="border" variant="secondary" /> : this.displayGuitars()}
                </Row>
            </>
        )
    }
}

export default GuitarListUser
