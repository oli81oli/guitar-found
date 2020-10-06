import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/index/Home'
import Footer from './layout/footer/Footer'
import NavBar from './layout/navbar/NavBar'
import Signup from './pages/signupUser/Signup'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'


import './App.css'

import authUserService from '../service/auth.userService'



class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: undefined
    }
    this.authUserService = new authUserService()
  }

  componentDidMount = () => this.fetchUser()


  takeUser = user => {
    this.setState({ loggedIn: user })
  }


  fetchUser = () => {
    this.authUserService
      .isLoggedIn()
      .then(response => this.setState({ loggedIn: response.data }))
      .catch(err => this.setState({ loggedIn: null }))
  }


  render() {

    return (
      <>
        <NavBar loggedIn={this.state.loggedIn} takeUser={this.takeUser} />
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/signup" render={props => <Signup takeUser={this.takeUser} {...props} />} />
          <Route path="/login" render={props => <Login takeUser={this.takeUser} {...props} />} />
          <Route path="/profile" exact render={() => this.state.loggedIn ? <Profile takeUser={this.takeUser} loggedIn={this.state.loggedIn} /> : null} />
          {/* Redirect arriba */}
          <Route />
          <Route />
          <Route />
          <Route />




        </Switch>
        <Footer />
      </>
    )
  }
}

export default App
// this.state.loggedIn?
{/* <Redirect to="/login" /> */ }