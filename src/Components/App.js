import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import '../Components/Sidebar.css';
import Dashboard from './dashboard'
import Material from './Material';
import Supplier from './Supplier';
import HSCode from './HSCode';
import Measure from './Measure';
import RegulatoryApproval from './RegulatoryApproval';
//import TradeAgreements from './TradeAgreements';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const routes = [
  {
    path: "/Dashboard",
    exact: true,
    sidebar: () => <div>Dashboard!</div>,
    main: () => <Dashboard/>
  },
  {
    path: "/Material",
    sidebar: () => <div>Material!</div>,
    main: () => <Material/>
  },
  {
    path: "/Supplier",
    sidebar: () => <div>Suppliers!</div>,
    main: () => <Supplier/>
  },
  {
    path: "/HSCode",
    sidebar: () => <div>HS Codes!</div>,
    main: () => <HSCode/>
  },
  {
    path: "/Measure",
    sidebar: () => <div>Unit of Measures!</div>,
    main: () => <Measure/>
  },
  {
    path: "/RegulatoryApproval",
    sidebar: () => <div>Regulatory Approvals!</div>,
    main: () => <RegulatoryApproval/>
  },
  {
    path: "/TradeAgreements",
    sidebar: () => <div>Trade Agreements!</div>,
    main: () =>  <h1>Trade Agreements</h1> 
  }
];
class App extends Component {

  render() {
    return (
      <Router>
        <div className="container-fluid p-0 login">
          <div className="row  ">
            <div className="col-lg-12">
              <Header></Header>
            </div>
            <div className="col-lg-2 pr-0">
            <div className="container-fluid p-0 login">
                                <div className="row  ">
                                        <div className="col-lg-12">
                                                <nav id="sidebar">
                                                        <ul className="list-unstyled components">
                                                                <li className="pb-2">
                                                                        <a href="#"> <span className="dashboard"></span> Dashboard</a>
                                                                </li>
                                                                <li className="pb-2">
                                                                        <a href="/Material"> <span className="Material"></span> Materials</a>
                                                                </li>
                                                                <li className="pb-2">
                                                                        <a href="/Supplier"> <span className="Supplier"></span> Suppliers</a>
                                                                </li>
                                                                <li className="pb-2">
                                                                        <a href="/HSCode"> <span className="HSCode"></span> HS Codes</a>
                                                                </li>
                                                                <li className="pb-2">
                                                                        <a href="/Measure"> <span className="Measure"></span> Unit of Measures</a>
                                                                </li>
                                                                <li className="pb-2">
                                                                        <a href="/RegulatoryApproval"> <span className="RegulatoryApproval"></span> Regulatory Approvals</a>
                                                                </li>
                                                                <li className="pb-2">
                                                                        <a href="/TradeAgreements"> <span className="TradeAgreements"></span> Trade Agreements</a>
                                                                </li>
                                                        </ul>
                                                </nav>
                                            
                                        </div>
                                </div>
                        </div>     
            </div>
            <div className="col-lg-10 content-area">

              {routes.map((route, index) => (
                // Render more <Route>s with the same paths as
                // above, but different components this time.
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
export default App;