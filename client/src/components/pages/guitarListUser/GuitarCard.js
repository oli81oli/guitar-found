import React from 'react'

import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import './GuitarCard.css'



const GuitarCard = ({ _id, name, model, state, price, image}) => {

    return (

        <Col xl={4} lg={6}>
            <Card className="guitar-card">
                <Card.Img src={image} />
                <Card.Body>
                    <div className='text-card'>
                        <h4>{name}</h4>
                        <p>{model}</p>
                        <p>Estado: {state}</p>
                        <p>Precio: {price} $</p>
                       
                        <Link to={`/profile/guitars/details/${_id}`} className="btn btn-sm btn-black">Detalles</Link>
                    </div>

                </Card.Body>
            </Card>
        </Col>


    )
}

export default GuitarCard




