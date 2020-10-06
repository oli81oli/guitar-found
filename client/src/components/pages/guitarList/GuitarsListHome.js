import React, { Component } from 'react'


// import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

import './GuitarsListHome.css'

import guitarService from '../../../service/guitar.service'


class GuitarsListHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guitars: [],

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
            .catch(err => console.log('Error:', err))
    }



    render() {

        return (
            <>
                {this.state.guitars.length ?
                    this.state.guitars.slice(0, 8).map(elm =>
                        <Col style={{ marginTop: '10em' }} key={elm._id} xl={3} lg={6}>
                            <div>
                                <h2>{elm.name}</h2>

                                <figure>
                                    <img className='width-img' src={elm.image} alt='guitar' />
                                </figure>
                            </div>
                        </Col>)
                    : <Spinner animation="border" />}

                <Button className='center-btn' onClick={this.props.hideGuitars} variant="light" size="sm">Cerrar </Button>


            </>
        )
    }
}

export default GuitarsListHome