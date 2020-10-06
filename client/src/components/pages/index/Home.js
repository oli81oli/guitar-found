import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

import GuitarListHome from '../guitarList/GuitarsListHome'
import Row from 'react-bootstrap/Row'


import Button from 'react-bootstrap/Button'
import './Home.css'

// import image1 from './man-guitars.jpg'


class Home extends Component {
    constructor() {
        super()
        this.state = {
            showGuitar: false
        }
    }
    hideGuitars = () => this.setState({ showGuitar: false })

    showGuitars = () => <Row className='row'><GuitarListHome hideGuitars={this.hideGuitars} /></Row>
    render() {

        return (
            <main id='main-page' >
                <h1>GuitarFound</h1>
                {/* <Link to="/guitars"> */}
                <div>
                    {/* <img className='image'src={image1} alt='guitars' /> */}
                    < Button onClick={() => this.setState({ showGuitar: true })} size="sm" variant="light" style={{ marginTop: '20px' }}> Muestra algunas guitarras</Button >
                    {this.state.showGuitar ? this.showGuitars() : null}
                </div >
                {/* </Link> */}
            </main >
        )
    }
}

export default Home