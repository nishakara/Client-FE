
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../Components/Sidebar.css';



class Sidebar extends Component {
        render() {
                return (
                       
                        <div className="container-fluid p-0 login">
                                <div className="row  ">
                                        <div className="col-lg-12">
                                                <nav id="sidebar">
                                                        <ul className="list-unstyled components">
                                                                <li className="pb-2">
                                                                        <a href="#"> <span className="dashboard"></span> Dashboard</a>
                                                                </li>
                                                                <li className="pb-2">
                                                                        <a href="Material"> <span className="Material"></span> Materials</a>
                                                                </li>
                                                                <li className="pb-2">
                                                                        <a href="Suppliers"> <span className="Supplier"></span> Suppliers</a>
                                                                </li>
                                                                <li className="pb-2">
                                                                        <a href="HSCode"> <span className="HSCode"></span> HS Codes</a>
                                                                </li>
                                                                <li className="pb-2">
                                                                        <a href="Measure"> <span className="Measure"></span> Unit of Measures</a>
                                                                </li>
                                                                <li className="pb-2">
                                                                        <a href="RegulatoryApproval"> <span className="RegulatoryApproval"></span> Regulatory Approvals</a>
                                                                </li>
                                                                <li className="pb-2">
                                                                        <a href="TradeAgreements"> <span className="TradeAgreements"></span> Trade Agreements</a>
                                                                </li>
                                                        </ul>
                                                </nav>
                                            
                                        </div>
                                </div>
                        </div>     
                );
        }
}
export default Sidebar;