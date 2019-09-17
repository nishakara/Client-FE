import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const { URL_BFF, ENDPOINTS } = require('./config');

class VoyageArrival extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vaID :'',
            vaVesselName:'',
            vaVoyage: '',
            vaYear: '',
            vaETAVTA: '',
            vaStatus: '',
            vaPrevious: '',
            fields: {}
            
        };
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onEditModeLoadDetail = this.onEditModeLoadDetail.bind(this);
    }
    loadDropdown = (endPointUrl) => {
        fetch(endPointUrl)
            .then(res => res.json())
            .then((data) => {

                var arrOptions = [];
                for (var k = 0; k < data.length; k++) {
                    arrOptions.push(<tr key={k}>
                        <td>{data[k].ID}</td>
                        <td>{data[k].VesselName}</td>
                        <td>{data[k].Voyage}</td>
                        <td>{data[k].Year}</td>
                        <td>{data[k].ETAVTA}</td>
                        <td>{data[k].Insurance}</td>
                        <td>{data[k].Status}</td>
                        <td>{data[k].Previous}</td>
                        <td> <button type="button" value={data[k].ID} className="btn btn-primary-bridge-close" onClick={this.onEditModeLoadDetail}>Edit</button></td>
                    </tr>);

                }
                this.setState({ vaListOptions: arrOptions });
            })
            .catch(console.log)
    }
    componentDidMount() {

        this.loadDropdown(URL_BFF + ENDPOINTS.VOYAGEARRIVAL)

    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
        this.setState({
            vaID: '',
            vaVesselName: '',
            vaVoyage: '',
            vaYear: '',
            vaETAVTA: '',
            vaStatus: '',
            vaPrevious:'',

            
        });
    }
    onEditModeLoadDetail(event) {
        var Id = event.target.value;

        this.setState({ isEditMode: true });

        let url = URL_BFF + ENDPOINTS.VOYAGEARRIVAL + '/' + Id;
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                if (data.length !== 0) {
                    if (data) {
                        this.setState({
                            vaID: data.ID,
                            vaVesselName: data.Incoterm,
                            vaVoyage: data.Description,
                            vaYear: data.Freight,
                            vaETAVTA: data.Insurance,
                            vaStatus: data.Status,
                            vaPrevious: data.Previous
                        });
                        this.setState({ isEditMode: true });
                        this.openModal();
                    }
                }
            })
            .catch(console.log)
    }

    onSubmitClick(fields) {
        var ID = null;
        var METHOD = 'POST'

        if (this.state.isEditMode === true) {
            METHOD = 'PUT'
            ID = fields.vaID;
        }


        fetch(URL_BFF + ENDPOINTS.VOYAGEARRIVAL, {
            method: METHOD,
            body: JSON.stringify({
                vaID: fields.ID,
                vaVesselName: fields.VesselName,
                vaVoyage: fields.Voyage,
                vaYear: fields.Year,
                vaETAVTA: fields.ETAVTA,
                vaStatus: fields.Status,
                vaPrevious: fields.Previous
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            this.setState({ isEditMode: false });
            if (response.status === 200 || response.status === 201) {
                alert('Voyage Arrival is success fully saved');
            } else {
                alert('An error occurred while saving please try again');
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
                <div className = "col-11 form-box mt-2 mb-4">
                    <div className = "float-right">
                    <button type="button" onClick={this.openModal} className="btn btn-line-primary-bridge " data-toggle="modal" data-target=".bd-example-modal-lg" >Add Voyage Arrival</button>
                    </div>
                </div>

                <div>
                <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        ariaHideApp={false}
                        contentLabel="VoyageArrival">
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    vaID: this.state.vaID,
                                    vaVesselName: this.state.vaVesselName,
                                    vaVoyage: this.state.vaVoyage,
                                    vaYear: this.state.vaYear,
                                    vaETAVTA: this.state.vaETAVTA,
                                    vaStatus: this.state.vaStatus,
                                    vaPrevious: this.state.vaPrevious,
                                    fields: {}
                                }}
                                validationSchema={Yup.object().shape({
                                        vaVesselName: Yup.string()
                                        .required('Vessel Name  is required'),
                                        vaVoyage: Yup.string()
                                        .required('Voyage is required'),
                                        vaYear: Yup.string()
                                        .required('Year is required'),
                                        vaETAVTA: Yup.string()
                                        .required('ETAVTA is required'),
                                        vaStatus: Yup.string()
                                        .required('Status is required'),
                                        vaPrevious: Yup.string()
                                        .required('Previous is required'),
                                })}
                                onSubmit={fields => {
                                    this.onSubmitClick(fields);
                                }}
                                 render={({ values, errors, status, touched, handleChange }) => (

                                    <Form>
                                        <div className=" col-12 form-box mt-4">   <h3 className="pb-3">Voyage Arrival</h3>  </div>
                                                <div className="row pr-3 pl-3">
                                                    
                                                    <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="vaID">ID</label>
                                                            <Field name="vaID" type="text" value={values.vaID} onChange={handleChange} className={'form-control' + (errors.vaID && touched.vaID ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="vaID" component="div" className="invalid-feedback" />
                                                        </div>
                                                    </div>

                                                    <div className=" col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="vaVesselName">Vessel Name</label>
                                                            <Field name="vaVesselName" type="text" value={values.vaVesselName} onChange={handleChange} className={'form-control' + (errors.vaVesselName && touched.vaVesselName ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="vaVesselName" component="div" className="invalid-feedback" />
                                                        </div>
                                                    </div>

                                                    <div className=" col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="vaVoyage">Voyage</label>
                                                            <Field name="vaVoyage" type="text" value={values.vaVoyage} onChange={handleChange} className={'form-control' + (errors.vaVoyage && touched.vaVoyage ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="vaVoyage" component="div" className="invalid-feedback" />
                                                        </div>
                                                    </div>

                                                    <div className=" col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="vaYear">Year</label>
                                                            <Field name="vaYear" type="text" value={values.vaYear} onChange={handleChange} className={'form-control' + (errors.vaYear && touched.vaYear ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="vaYear" component="div" className="invalid-feedback" />
                                                        </div>
                                                    </div>

                                                    <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="vaStatus">ETA/ATA</label>
                                                            <Field name="vaStatus" component="select" value={values.vaStatus} onChange={handleChange} className={'form-control' + (errors.vaStatus && touched.vaStatus ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option ngvalue="Arrived">Arrived</option>
                                                                <option ngvalue="Omitted">Omitted</option>
                                                                <option ngvalue="Delayed">Delayed</option>
                                                            </Field>
                                                            <ErrorMessage name="vaStatus" component="div" className="invalid-feedback" />
                                                        </div>
                                                    </div>

                                                    <div className=" col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="vaPrevious">Previous ETA</label>
                                                            <Field name="vaPrevious" type="text" value={values.vaPrevious} onChange={handleChange} className={'form-control' + (errors.vaPrevious && touched.vaPrevious ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="vaPrevious" component="div" className="invalid-feedback" />
                                                        </div>
                                                    </div>
                                                </div>
                                    </Form>
                                 )}/>

                                <div className="row pr-3 pl-3">
                                    <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-primary-bridge-close" onClick={this.closeModal} >Cancel</button>
                                                <button type="submit" className="btn btn-primary-bridge">Save </button>
                                            </div>
                                    </div>
                                </div>
                            </Modal>

                        </div>

                        <div className="col-lg-11 table-wraper">
                             <table className="table table-hover">
                                            <thead className="material-table-th">
                                                <tr>
                                                    <th scope="col">Vessel Name</th>
                                                    <th scope="col">Voyage</th>
                                                    <th scope="col">Year</th>
                                                    <th scope="col">ETA/ATA</th>
                                                    <th scope= "col">Status</th>
                                                    <th scope= "col">Previous ETA</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.VoyageArrivalListOptions}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
        );
    }

}

export default VoyageArrival