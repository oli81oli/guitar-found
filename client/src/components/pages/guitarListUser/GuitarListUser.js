import React, { Component } from 'react'
import { Link } from 'react-router-dom'



import Row from 'react-bootstrap/Row'
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

            priceFilter: 0,


        }
        this.guitarService = new guitarService()
    }





    componentDidMount = () => this.loadGuitars()


    loadGuitars = () => {
        this.guitarService
            .getAllGuitars()
            .then(response => this.setState({ guitars: response.data }))
            .catch(err => console.log('------', err))
    }

    priceFilter = () => {
        
        this.setState({guitars:this.state.guitars.filter(guitar => guitar.price <= this.state.priceFilter)})  
       
        
    }

    handleInputChange = e => {
        const { name, value } = e.target

        if (name === "priceFilter") this.setState({ [name]: value })


    }


    render() {

        return (
            <>
                <Form.Group>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control as="select" size="lg"  name="priceFilter" onChange={this.handleInputChange}>

                        <option value='250'>
                            Menos de 250 $
                        </option>
                        <option value='450'>
                            Menos de  450 $
                        </option>
                        <option value='550'>
                            Menos de  550 $
                        </option>
                        <option value='750'>
                            Menos de  750 $
                        </option>
                        <option value='1000'>
                            Menos de  1000 $
                        </option>


                    </Form.Control>
                </Form.Group>

                <Button onClick={() => this.priceFilter()} style={{ marginLeft: '5%' }} variant="light" size="sm">Buscar</Button>





                <div>

                    <Link to='/profile'>
                        <Button style={{ marginLeft: '5%', marginTop: 200 }} variant="light" size="sm">Volver</Button>
                    </Link>

                    <Row>
                        {this.state.guitars.length ?
                            this.state.guitars.map(elm => <GuitarCard key={elm._id} {...elm} />)
                            : <div className='center-spinner'><Spinner animation="border" variant='light' /></div>}
                    </Row>
                </div>
            </>
        )
    }
}

export default GuitarListUser
