import React, { Component } from 'react';
import './App.css';
import CompanyList from './components/CompanyList'
import CompanyDetails from './components/CompanyDetails'
import SignUpPage from './components/userHandling/SignUpPage' 
import LogInPage from './components/userHandling/LogInPage' 
import LogOutPage from './components/userHandling/LogOutPage' 
import Landing from './components/Landing'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import TopBar from './components/ui/TopBar'



export default  class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <TopBar />
          <Route exact path="/" render={() => <Redirect to="/companys" /> } />
          {/* <Route exact path="/landing" component={Landing} /> */}
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/login" component={LogInPage} />
          <Route exact path="/logout" component={LogOutPage} />
          <Route exact path="/companys" component={CompanyList} />
          <Route exact path="/companys/:id" component={CompanyDetails} />
        </div>
      </Router>
    )
  }
}
