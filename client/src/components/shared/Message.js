import React, { Component } from 'react'
import Toast from 'react-bootstrap/Toast'



class Message extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: true
        }
    }

    render() {

        return (

            <Toast
                onClose={() => this.setState({ visible: false })} show={this.state.visible} delay={3000} autohide
                style={{ position: 'fixed', bottom: 20, right: 20 }}>
                <Toast.Body>{this.props.text} {this.props.name}</Toast.Body>
            </Toast>
        )
    }
}
export default Message