import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

// Components
import Home from './components/pages/home'
import Matches from './components/pages/matches'
import Ready from './components/pages/ready'
import BingoCards from './components/pages/cards'

const Router = () => (
  <BrowserRouter>
    <Route path="/" component={Home} exact={true} />
    <Route path="/matches" component={Matches} exact={true} />
    <Route path="/ready" component={Ready} exact={true} />
    <Route path="/cards" component={BingoCards} exact={true} />
  </BrowserRouter>
)

export default Router
