import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select'

var BFF_URL = 'http://localhost:8081/';
let END_POINT = 'tradeagreement';

class TradeAgreements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AgreementID: 'NEW_AGREEMENT',
            AgreementName: '',
            AgreementDescription: '',
            AgreementAttachment: '',
            AgreementCountries: []
        };
        this.onSumbmitClick = this.onSumbmitClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onEditModeLoadDetail = this.onEditModeLoadDetail.bind(this);
    }

    loadDropdown = (endPointUrl) => {
        let url = BFF_URL + endPointUrl;
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                var arrOptions = [];
                if (endPointUrl === END_POINT) {
                    for (var k = 0; k < data.length; k++) {
                        arrOptions.push(<tr key={k}>
                            <td>{data[k].Agreement}</td>
                            <td>{data[k].Description}</td>
                            <td>{data[k].Attachment}</td>
                            <td>{data[k].Attachment}</td>
                            <td> <button type="button" value={data[k].ID} className="btn btn-primary-bridge-close" onClick={this.onEditModeLoadDetail}>Edit</button></td>

                        </tr>);
                    }
                    this.setState({ supplierListOptions: arrOptions });
                } else if (endPointUrl === 'countries') {
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            arrOptions.push(<option value={key}> {data[key]} </option>);
                        }
                    }
                    this.setState({ countryCodeOptions: data });
                }

            })
            .catch(console.log)
    }

    componentDidMount() {
        this.loadDropdown(END_POINT);
        this.loadDropdown('countries');
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
    }

    handleChange = (name, value) => {
        this.setState({ ...this.state, [name]: value });
    };
onEditModeLoadDetail(event) {
        var Id = event.target.value;
        this.setState({ isEditMode: true });
        let url = BFF_URL + END_POINT + '/' + Id;
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                
                if (data) {
                        
                        this.setState({
                            AgreementID: data.ID,
                            AgreementName: data.Agreement,
                            AgreementDescription: data.Description,
                            AgreementAttachment: data.Attachment,
                            AgreementCountries: data.Countries
                        });
                        this.openModal();
                }
            })
            .catch(console.log)
    }
    onSumbmitClick(fields) {
        var AGREEMENT_ID = 'NEW_AGREEMENT';
        var METHOD = 'POST'
        if (this.state.AgreementID !== AGREEMENT_ID) {
            METHOD = 'PUT';
            AGREEMENT_ID = this.state.AGREEMENT_ID;
        }

        var arrCounties = [];
        var i;
        for (i = 0; i < this.state.AgreementCountries.length; i++) {
            arrCounties.push(this.state.AgreementCountries[i].value);
        }

        fetch(BFF_URL + END_POINT, {
            method: METHOD,
            body: JSON.stringify({
                ID: AGREEMENT_ID,
                Agreement: fields.AgreementName,
                Description: fields.AgreementDescription,
                Attachment: fields.AgreementAttachment,
                Countries: arrCounties
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {

            if (response.status === 200 || response.status === 201) {
                alert('Trade agreement is success fully saved');
            } else {
                alert('An error occurred while saving please try again');
            }
            return response.json()
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
                        <button type="button" onClick={this.openModal} className="btn btn-line-primary-bridge " data-toggle="modal" data-target=".bd-example-modal-lg" >Add</button>
                    </div>
                </div>
                <div>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        ariaHideApp={false}

                        contentLabel="Example Modal">
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                AgreementID: this.state.ID,
                                AgreementName: this.state.AgreementName,
                                AgreementDescription: this.state.AgreementDescription,
                                AgreementAttachment: this.state.AgreementAttachment,
                                AgreementCountries: this.state.AgreementCountries
                            }}
                            validationSchema={Yup.object().shape({
                                AgreementID: Yup.string()
                                    .required('Agreement ID is required'),
                                AgreementName: Yup.string()
                                    .required('Agreement name is required.'),
                                AgreementDescription: Yup.string()
                                    .required('Description  is required.')
                            })}
                            onSubmit={fields => {
                                this.onSumbmitClick(fields);
                            }}
                            render={({ values, errors, status, touched, handleChange }) => (
                                <Form>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="AgreementID">Agreement ID</label>
                                                <Field name="AgreementID" type="text" value={values.AgreementID} onChange={handleChange} className={'form-control' + (errors.AgreementID && touched.AgreementID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="AgreementID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="AgreementName">Agreement </label>
                                                <Field name="AgreementName" type="text" value={values.AgreementName} onChange={handleChange} className={'form-control' + (errors.AgreementName && touched.AgreementName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="AgreementName" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="AgreementDescription">Description</label>
                                                <Field name="AgreementDescription" type="text" value={values.AgreementDescription} onChange={handleChange} className={'form-control' + (errors.AgreementDescription && touched.AgreementDescription ? ' is-invalid' : '')} />
                                                <ErrorMessage name="AgreementDescription" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="AgreementAttachment">Attachment</label>
                                                <Field name="AgreementAttachment" type="text" value={values.AgreementAttachment} onChange={handleChange} className={'form-control' + (errors.AgreementAttachment && touched.AgreementAttachment ? ' is-invalid' : '')} />
                                                <ErrorMessage name="AgreementAttachment" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="AgreementCountries">Country</label>
                                                <Select name="AgreementCountries" value={values.AgreementCountries} onChange={handleChange} isMulti={true} options={this.state.countryCodeOptions} />
                                                <ErrorMessage name="AgreementCountries" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

    
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-primary-bridge-close" onClick={this.closeModal} >Cancel</button>
                                                <button type="submit" className="btn btn-primary-bridge">Save </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        />
                    </Modal>
                </div>
                <div className="col-lg-11 table-wraper">
                    <table className="table table-hover">
                        <thead className="material-table-th">
                            <tr>
                                <th scope="col">Agreement </th>
                                <th scope="col">Description</th>
                                <th scope="col">Attachment</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.supplierListOptions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TradeAgreements;