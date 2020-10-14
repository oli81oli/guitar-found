import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import GuitarCard from '../guitarListUser/GuitarCard'

import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'


import './GuitarFavs.css'

import authUserService from './../../../service/auth.userService'




class GuitarFavs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favGuitars: []
        }
        this.authUserService = new authUserService()
    }

    componentDidMount = () => this.find()
    find = () => {
        this.authUserService
            .findUser(this.props.loggedIn._id)
            .then(response => this.setState({ favGuitars: response.data.favGuitars }))
    }


    render() {


        return (
            <>
                <div className='center-back'>
                    <Link to='/profile'>
                        <Button style={{ marginBottom: 40 }} variant="light" size="sm">Volver</Button>
                    </Link>
                </div>
                <h1 className='center-title'>Tus Guitarras Favoritas</h1>
                <Row>
                    {this.state.favGuitars.length ? this.state.favGuitars.map((elm, idx) => <GuitarCard key={idx}{...elm} />) : <div className='center-Spinner'><Spinner animation="border" variant='light' /></div>}
                </Row>
            </>
        )
    }
}
export default GuitarFavs