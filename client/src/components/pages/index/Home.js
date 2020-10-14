import React, { Component } from 'react'

import GuitarListHome from '../guitarListHome/GuitarsListHome'
import Row from 'react-bootstrap/Row'


import './Home.css'

import Message from '../../shared/Message'


class Home extends Component {

    constructor() {
        super()
        this.state = {
            showGuitar: true
        }
    }

   
    showGuitars = () => <Row style={{ margin: '0 2em' }}><GuitarListHome hideGuitars={this.hideGuitars} /></Row>

    render() {

        return (
            <main id='main-page' >
                <h1>GuitarFound</h1>

                <div>
                                        
                    {this.state.showGuitar ? this.showGuitars() : null}
                </div >
                {this.props.sendMessage === false ? <Message text='Usuario dado de baja satisfactoriamente' /> : null}
            </main >
        )
    }
}

export default Home