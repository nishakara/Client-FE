import React, { Component } from 'react';
import '../Components/Material.css';

class MaterialList extends Component {
    render() {
        return (
            <div className="row pl-5 pt-3">
            <div className="col-11 form-box mt-2 mb-4">
                <div className="float-right">
                    <button type="button"   className="btn btn-line-primary-bridge " data-toggle="modal" data-target=".bd-example-modal-lg" >Add</button>
                </div>
            </div>
            <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Material</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row pr-3 pl-3">
                                <div className="col-6 form-box mt-2">
                                    <label htmlFor="exampleFormControlInput1">Material ID</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Material ID"></input>
                                </div>

                                <div className=" col-6 form-box mt-2">
                                    <label htmlFor="exampleFormControlInput1">Material Name</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Material Name"></input>
                                </div>

                                <div className=" col-6 form-box mt-2">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Material Type</label>
                                        <select className="form-control" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>

                                <div className=" col-6 form-box mt-2">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Material Origin</label>
                                        <select className="form-control" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>

                                <div className=" col-6 form-box mt-2">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Unit of Measure </label>
                                        <select className="form-control" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>

                                <div className=" col-6 form-box mt-2">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Unit of Measure </label>
                                        <select className="form-control" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>

                                <div className=" col-6 form-box mt-2">
                                    <label htmlFor="exampleFormControlSelect1">Unit of Measure </label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" defaultChecked></input>
                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                            yes</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"></input>
                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                            No</label>
                                    </div>
                                </div>
                                <div className=" col-6 form-box mt-2">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Cargo Type </label>
                                        <select className="form-control" id="">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>
                                <div className=" col-12 form-box mt-2">
                                    <hr></hr>
                                    <h5 className="pb-3">HS Code</h5>
                                    <div className="row">

                                        <div className=" col-4">
                                            <label htmlFor="exampleFormControlInput1">Client Name</label>
                                            <input type="email" className="form-control" id="" placeholder="Material ID"></input>

                                        </div>

                                        <div className=" col-4">
                                            <label htmlFor="exampleFormControlInput1">HS Code</label>
                                            <input type="email" className="form-control" id="" placeholder="Material ID"></input>

                                        </div>

                                        <div className=" col-4">
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlSelect1">Priority</label>
                                                <select className="form-control" id="">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" col-12 form-box mt-2">
                                    <hr></hr>
                                    <h5 className="pb-3">Regulatory Approval</h5>
                                    <div className="row">

                                        <div className=" col-2">
                                            <label htmlFor="exampleFormControlInput1">Reference / Test </label>
                                            <input type="email" className="form-control" id="" placeholder="Reference / Test"></input>

                                        </div>

                                        <div className=" col-3">
                                            <label htmlFor="exampleFormControlInput1">Aproval Obtaining Stage</label>
                                            <input type="email" className="form-control" id="" placeholder="Aproval Obtaining Stage"></input>

                                        </div>
                                        <div className=" col-2">
                                            <label htmlFor="exampleFormControlInput1">Institute Name</label>
                                            <input type="email" className="form-control" id="" placeholder="Institute Name"></input>

                                        </div>
                                        <div className=" col-2">
                                            <label htmlFor="exampleFormControlInput1">Sample Required</label>
                                            <input type="email" className="form-control" id="" placeholder="Sample Required"></input>

                                        </div>
                                        <div className=" col-2">
                                            <label htmlFor="exampleFormControlInput1">Release Time Days</label>
                                            <input type="email" className="form-control" id="" placeholder="Release Time Days"></input>

                                        </div>

                                    </div>
                                </div>

                                <div className=" col-12 form-box mt-2">
                                    <hr></hr>
                                    <h5 className="pb-3">Trade Agreements</h5>
                                    <div className="row">

                                        <div className=" col-4">
                                            <label htmlFor="exampleFormControlInput1"> Agreement Type</label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Agreement Type"></input>

                                        </div>

                                        <div className=" col-4">
                                            <label htmlFor="exampleFormControlInput1">Application Tarriff</label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Application Tarriff"></input>

                                        </div>

                                        <div className=" col-4">
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlSelect1">Document</label>
                                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Document"></input>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-primary-bridge-close" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary-bridge ">Save </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-11 table-wraper">
                <table className="table table-hover">
                    <thead className="material-table-th">
                        <tr>
                            <th scope="col">Colum 1</th>
                            <th scope="col">Colum 2</th>
                            <th scope="col">Colum 3</th>
                            <th scope="col">Colum 4</th>
                            <th scope="col">Colum 5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Data</td>
                            <td>Data</td>
                            <td>Data</td>
                            <td>Data</td>
                            <td>Data</td>

                        </tr>
                        <tr>
                            <td>Data</td>
                            <td>Data</td>
                            <td>Data</td>
                            <td>Data</td>
                            <td>Data</td>
                        </tr>
                        <tr>
                            <td>Data</td>
                            <td>Data</td>
                            <td>Data</td>
                            <td>Data</td>
                            <td>Data</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
    }
}

export default MaterialList;