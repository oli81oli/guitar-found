import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/index/Home'
import Footer from './layout/footer/Footer'
import NavBar from './layout/navbar/NavBar'
import Signup from './pages/signupUser/Signup'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import GuitarListUser from './pages/guitarListUser/GuitarListUser'
import GuitarDetails from './pages/guitarDetails/GuitarDetails'
import GuitarFavs from './pages/guitarFavourites/GuitarFavs'
import MyGuitars from './pages/myGuitars/MyGuitars'
import Message from './shared/Message'


import './App.css'

import authUserService from '../service/auth.userService'



class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: undefined,
      stateMessage: true
    }
    this.authUserService = new authUserService()
  }

  componentDidMount = () => this.fetchUser()


  takeUser = user => {
    this.setState({ loggedIn: user })
  }

  message = () => {
    this.setState({ stateMessage: false })

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
          <Route path="/" exact render={() => <Home sendMessage={this.state.stateMessage} />} />
          <Route path="/signup" render={props => <Signup takeUser={this.takeUser} {...props} />} />
          <Route path="/login" render={props => <Login takeUser={this.takeUser} {...props} />} />
          <Route path="/profile" exact render={props => this.state.loggedIn ? <Profile takeUser={this.takeUser} message={this.message} loggedIn={this.state.loggedIn} {...props} /> : <Redirect to="/login" />} />
          <Route path="/profile/guitars" exact render={() => this.state.loggedIn ? <GuitarListUser loggedIn={this.state.loggedIn} /> : <Redirect to="/login" />} />
          <Route path="/profile/guitars/details/:_id" exact render={props => this.state.loggedIn ? <GuitarDetails loggedIn={this.state.loggedIn} {...props} /> : <Redirect to="/login" />} />
          <Route path="/profile/favs" render={() => this.state.loggedIn ? <GuitarFavs loggedIn={this.state.loggedIn} /> : <Redirect to="/login" />} />
          <Route path="/profile/myGuitars" render={() => this.state.loggedIn ? <MyGuitars loggedIn={this.state.loggedIn} /> : <Redirect to="/login" />} />
        </Switch>
        {this.state.loggedIn && <Message text={`Bienvend@, ${this.state.loggedIn.name} a GuitarFound`} />}

        <Footer />
      </>
    )
  }
}

export default App
