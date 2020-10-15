import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import GuitarCard from '../guitarListUser/GuitarCard'


import './MyGuitars.css'



import guitarService from '../../../service/guitar.service'





class MyGuitars extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guitars: [],
            created: [],
            message: ''
        }

        
        this.guitarService = new guitarService()
    }


    componentDidMount = () => this.load()

    load = () => {
        this.guitarService
            .getAllGuitars()
            .then(response => this.setState({ guitars: response.data }))
            .catch(err => this.setState({ message: err.response.data.message }))
    }


    show = () => {
        const ownerGuitars = this.state.guitars.filter(elm => elm.owner === this.props.loggedIn._id)
        this.setState({ created: ownerGuitars })
    }

    render() {

        return (
            <>
                <div className='center-back'>
                    <Link to='/profile'>
                        <Button style={{ marginBottom: 40 }} variant="light" size="sm">Volver</Button>
                    </Link>
                </div>
                <p style={{ color: 'red' }}>{this.state.message}</p>


                <h2 className='text-h2'>Haz Click para ver las Guitarras que has publicado</h2>
                <Button className='btn-created' onClick={() => this.show()} style={{ marginBottom: 40 }} variant="light" size="lg">Mostrar</Button>

                <Row>
                    {this.state.created.map(elm => <GuitarCard key={elm._id}  {...elm} />)}
                </Row>
            </>
        )
    }
}
export default MyGuitars