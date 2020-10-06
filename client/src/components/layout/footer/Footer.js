import React from 'react'
import './Footer.css'
// import Container from 'react-bootstrap/Container'


const Footer = () => {
    
    return (
       

        <footer>
            <p><span dangerouslySetInnerHTML={{ "__html": "&copy;" }} />{new Date().getFullYear()} Registrado por GuitarFound</p>
        </footer>
       

    )

}

export default Footer