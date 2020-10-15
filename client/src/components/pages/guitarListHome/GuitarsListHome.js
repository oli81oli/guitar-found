import React, { Component } from 'react'


import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'


import './GuitarsListHome.css'

import guitarService from '../../../service/guitar.service'



class GuitarsListHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guitars: [],
            message: ''

        }
        this.guitarService = new guitarService()
    }


    componentDidMount = () => this.loadGuitars()


    loadGuitars = () => {
        this.guitarService
            .getAllGuitars()
            .then(response => {
                const random = response.data.sort(() => .5 - Math.random())
                this.setState({ guitars: random })
            })
            .catch(err => this.setState({ message: err.response.data.message }))
    }



    render() {

        return (
            <>
                <p style={{ color: 'red' }}>{this.state.message}</p>

                {this.state.guitars.length ?
                    this.state.guitars.slice(0, 8).map(elm =>
                        <Col style={{ marginBottom: '5em' }} key={elm._id} xl={3} lg={6}>
                            <div>
                                <h2 className='h2'>{elm.name}</h2>

                                <figure>
                                    <img className='width-img' src={elm.image} alt='guitar' />
                                </figure>
                            </div>
                        </Col>)
                    : <div className='center-spinner'><Spinner animation="border" variant='light' /></div>}


            </>
        )
    }
}

export default GuitarsListHome