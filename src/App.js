import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { connect } from 'react-redux';

import HomeScreen from "./components/home.component"; 
import UsersList from "./components/user-list.component";
import AddUser from "./components/add-user.component";
import UserProfile from "./components/profile.component";
import SigninScreen from "./components/signin.component";
import { userLogoutFetch } from './actions/userActions';
import ImportCSV from "./components/import-csv.component";
import UnderConstruction from "./components/z-under-construction.component";
import TradingList from "./components/trading-list.component";
import TradeDetail from "./components/trade-detail.component";
import EditTrade from "./components/edit-trade.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      password: '',
      email:''
  }
  }

  render() {

    return (
<div>
        <header className="header">
          <div className="brand">
            <button onClick={this.openMenu}>
                  &#9776;
            </button>
            <a href="/underconstruction/">DD Daily Stock</a>
          </div>
        </header>
        
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={this.closeMenu}>x</button>

          <ul>
              <div>
                <label className="form-label"><strong>Long tieng:</strong>
                    <input onChange={(event)=> this.isActionChange(event)} value="0" type="radio" className="form-input" name="usvn_longtieng" defaultChecked='0' />US
                    <input onChange={(event)=> this.isActionChange(event)} value="1" type="radio" className="form-input" name="usvn_longtieng" />VN
                </label>
              </div>
          </ul>

          <ul>
            <li>
              <a href="/dailystocks/1?searchKeyword=">Trading List</a>
            </li>
            <li>
              <a href="/importcsv/">Import CSV</a>
            </li>
            <li>
              <a href="/underconstruction/">Retail Seal Box</a>
            </li>
          </ul>
        </aside>


    </div>
    )
}
}

const mapDispatchToProps = dispatch => ({
  userLogoutFetch: () => dispatch(userLogoutFetch())
})

const mapStateToProps = (state, ownProps) => {
  console.log('userSignin trong App.js ' + JSON.stringify(state.userSignin));
  
  return {
      // currUser: state.userSignin.userInfo  //8/3 tam doi ve userSignin
      currUser: state.userSignin
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;

    // "start": "react-scripts start",
    // "build": "react-scripts build",
    // "test": "react-scripts test",
    // "predeploy": "npm run build",
    // "deploy": "gh-pages -d build",
    // "eject": "react-scripts eject"