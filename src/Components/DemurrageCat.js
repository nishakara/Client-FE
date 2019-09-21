import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
const { URL_BFF, ENDPOINTS } = require('./config');


class Demurrages extends Component {
    constructor(props){

        super(props);
        this.state={
                dCatDemurrageCatID:'',
                dCatClientName:'',
                dCatPortDemurrages:'',
                dCatLinerDemurrages:'',
                    fields:{}
        }
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onEditModeLoadDetail = this.onEditModeLoadDetail.bind(this);
    }

    loadDropdown = (endPointUrl) => {
        fetch(endPointUrl)
            .then(res => res.json())
            .then((data) =>{

                var arrOptions = [];
                for(var k =0; k < data.length; k++) {
                    arrOptions.push(<tr key={k}>
                        <td>{data[k].DemurrageCatID }</td>
                        <td>{data[k].ClientName}</td>
                        <td>{data[k].PortDemurrages }</td>
                        <td>{data[k].LinerDemurrages}</td>
                        <td> <button type="button" value={data[k].ID} className="btn btn-primary-bridge-close" onClick={this.onEditModeLoadDetail}>Edit</button></td>
                   
                    </tr>)
                }
                this.setState({ demurageCatListOptions: arrOptions });
            })
            .catch(console.log)
    }

    componentDidMount() {

        this.loadDropdown(URL_BFF + ENDPOINTS.DEMURAGESCAT)

    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
        this.setState({
            dCatDemurrageCatID:'',
            dCatClientName:'',
            dCatPortDemurrages:'',
            dCatLinerDemurrages:'',

        })
    }
    onEditModeLoadDetail(event) {
        var Id = event.target.value;

        this.setState({isEditMode: true});

        let url = URL_BFF + ENDPOINTS.DEMURAGESCAT + '/' + Id;
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                if(data.length !==0) {
                    if(data) {
                        this.setState({
                            dCatDemurrageCatID:data.DemurrageCatID,
                            dCatClientName:data.ClientName,
                            dCatPortDemurrages:data.PortDemurrages,
                            dCatLinerDemurrages:data.LinerDemurrages,
                        });
                        this.setState({isEditMode : true});
                        this.openModal();
                    }
                }
            })
            .catch(console.log)
    }

    onSubmitClick(fields) {
        var ID = null;
        var METHOD = 'POST'

        if(this.state.isEditMode === true) {
            METHOD = 'PUT'
            ID = fields.dCatDemurrageCatID;
        }

        fetch(URL_BFF + ENDPOINTS.DEMURAGESCAT, {
            method : METHOD,
            body : JSON.stringify({
                DemurrageCatID:fields.dCatDemurrageCatID,
                ClientName:fields.dCatClientName,
                PortDemurrages:fields.dCatPortDemurrages,
                LinerDemurrages:fields.dCatLinerDemurrages,

            }),
            headers : {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            this.setState({isEditMode : false});
            if(response.status===200 || response.status ===201) {
                alert('New Demurages added');

            }
            else {
                alert('An error occured while saving please try again');
            }
            return;
        }).then(json => {
            this.setState({
                user: json
            });
        });
    }

    render() {
        return (
            <div className="row pl-5 pt-3">
                <div className="col-11 form-box mt-2 mb-4">
                    <div className="float-right">
                        <button type="button" onClick={this.openModal} className="btn btn-line-primary-bridge " data-toggle="modal" data-target=".bd-example-modal-lg" >Add Demurrages</button>
                    </div>
                </div>
                <div>

                <Modal
                     isOpen={this.state.modalIsOpen}
                     onAfterOpen={this.afterOpenModal}
                     onRequestClose={this.closeModal}
                     ariaHideApp={false}
                     contentLabel="DemurragesCat">

                         <Formik
                            enableReinitialize={true}
                            initialValues={{
                             dCatDemurrageCatID : this.state.clientClientID,
                             dCatClientName : this.state.ClientName ,
                             dCatPortDemurrages : this.state.ClientAddress,
                             dCatLinerDemurrages : this.state.ContactDetails,
                                fields:{}
                            }}
                        validationSchema = {Yup.object().shape({
                            dCatClientName : Yup.string()
                            .required('Client Name is required'),
                            dCatPortDemurrages : Yup.string()
                            .required('Port Demurrages is required'),
                            dCatLinerDemurrages : Yup.string()
                            .required('Line Demurrages is required'),

                        })}
                        onSubmit={fields => {
                            this.onSubmitClick(fields);
                           }}

                           render = {({values, errors, status, touched, handleChange}) => (
                    
                    <Form>
                        <div className=" col-12 form-box mt-4">   <h3 className="pb-3">Demurrages Category</h3>  </div>
                                    <div className="row pr-3 pl-3">

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="dCatClientName">Client Name</label>
                                                <Field name="dCatClientName" type="text" value={values.dCatClientName} onChange={handleChange} className={'form-control' + (errors.dCatClientName && touched.dCatClientName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="dCatClientName" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="dCatPortDemurrages">Port Demurrages</label>
                                                <Field name="dCatPortDemurrages" type="text" value={values.dCatPortDemurrages} onChange={handleChange} className={'form-control' + (errors.dCatPortDemurrages && touched.dCatPortDemurrages ? ' is-invalid' : '')} />
                                                <ErrorMessage name="dCatPortDemurrages" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="dCatLinerDemurrages">Liner Demurrages</label>
                                                <Field name="dCatLinerDemurrages" type="text" value={values.dCatLinerDemurrages} onChange={handleChange} className={'form-control' + (errors.dCatLinerDemurrages && touched.dCatLinerDemurrages ? ' is-invalid' : '')} />
                                                <ErrorMessage name="dCatLinerDemurrages" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                    </div>
                            </Form>
                           )}/>
                                    <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-primary-bridge-close" onClick={this.closeModal} >Cancel</button>
                                                <button type="submit" className="btn btn-primary-bridge">Save </button>
                                            </div>
                                    </div>
                                </Modal>

                                </div>

                                <div className="col-lg-11 table-wrapper">
                                    <table className = "table table-hover">
                                        <thead className = "material-table-th"> 
                                        <tr>
                                            <th scope="col">Client Name</th>
                                            <th scope="col">Port Demurrages</th>
                                            <th scope="col">Liner Demurrages</th>
                                        </tr>
                                        </thead>
                                            <tbody>
                                                {this.state.demuragescatListOptions}
                                            </tbody>
                                    </table>

                                </div>
                            </div>
            );
    }
}

export default Demurrages;
