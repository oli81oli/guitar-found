import React from 'react'

import GuitarListHome from '../guitarListHome/GuitarsListHome'
import Row from 'react-bootstrap/Row'


import './Home.css'

import Message from '../../shared/Message'


const Home = props => {



    return (
        <main id='main-page' >
            <h1>GuitarFound</h1>

            <div>
                <Row style={{ margin: '0 2em' }}><GuitarListHome /></Row>
            </div >
            {props.sendMessage === false ? <Message text='Usuario dado de baja satisfactoriamente' /> : null}
        </main >
    )

}

export default Home