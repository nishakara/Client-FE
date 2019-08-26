import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const { URL_BFF, ENDPOINTS } = require('./config');

class Incoterm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incotermIncotermID: 'Incoterm-ID',
            incotermIncorterm: '',
            incotermDescription: '',
            incotermFreight: '',
            incotermInsurance: '',
            incotermStatus: '',
            isEditMode: false,
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
                        <td>{data[k].Incoterm}</td>
                        <td>{data[k].Description}</td>
                        <td>{data[k].Freight}</td>
                        <td>{data[k].Insurance}</td>
                        <td>{data[k].Status}</td>
                        <td> <button type="button" value={data[k].ID} className="btn btn-primary-bridge-close" onClick={this.onEditModeLoadDetail}>Edit-X</button></td>
                    </tr>);

                }
                this.setState({ incotermListOptions: arrOptions });
            })
            .catch(console.log)
    }

    componentDidMount() {

        this.loadDropdown(URL_BFF + ENDPOINTS.INCOTERM)

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
            incotermIncotermID: 'Incoterm-ID',
            incotermIncorterm: '',
            incotermDescription: '',
            incotermFreight: '',
            incotermInsurance: '',
            incotermStatus: '',
        });
    }

    onEditModeLoadDetail(event) {
        var Id = event.target.value;

        this.setState({ isEditMode: true });

        let url = URL_BFF + ENDPOINTS.INCOTERM + '/' + Id;
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                if (data.length !== 0) {
                    if (data) {
                        this.setState({
                            incotermIncotermID: data.ID,
                            incotermIncorterm: data.Incoterm,
                            incotermDescription: data.Description,
                            incotermFreight: data.Freight,
                            incotermInsurance: data.Insurance,
                            incotermStatus: data.Status
                        });
                        this.setState({ isEditMode: true });
                        this.openModal();
                    }
                }
            })
            .catch(console.log)
    }


    /*
    handleChange(evt) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }
    */

    onSubmitClick(fields) {
        var ID = null;
        var METHOD = 'POST'

        if (this.state.isEditMode === true) {
            METHOD = 'PUT'
            ID = fields.incotermIncotermID;
        }


        fetch(URL_BFF + ENDPOINTS.INCOTERM, {
            method: METHOD,
            body: JSON.stringify({
                ID: ID,
                Incorterm: fields.incotermIncorterm,
                Description: fields.incotermDescription,
                Freight: fields.incotermFreight,
                Insurance: fields.incotermInsurance,
                Status: fields.incotermStatus
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            this.setState({ isEditMode: false });
            if (response.status === 200 || response.status === 201) {
                alert('Incoterm is success fully saved');
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
                <div className="col-11 form-box mt-2 mb-4">
                    <div className="float-right">
                        <button type="button" onClick={this.openModal} className="btn btn-line-primary-bridge " data-toggle="modal" data-target=".bd-example-modal-lg" >Add Incoterm</button>
                    </div>
                </div>
                <div>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        ariaHideApp={false}
                        contentLabel="Incoterm">
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                incotermIncotermID: this.state.incotermIncotermID,
                                incotermIncorterm: this.state.incotermIncorterm,
                                incotermDescription: this.state.incotermDescription,
                                incotermFreight: this.state.incotermFreight,
                                incotermInsurance: this.state.incotermInsurance,
                                incotermStatus: this.state.incotermStatus,
                                fields: {}
                            }}
                            validationSchema={Yup.object().shape({
                                incotermIncotermID: Yup.string()
                                    .required('Incoterm ID is required'),
                                incotermIncorterm: Yup.string()
                                    .required('Incoterm  is required'),
                                incotermDescription: Yup.string()
                                    .required('Incoterm description is required'),
                                incotermFreight: Yup.string()
                                    .required('Freight status is required'),
                                incotermInsurance: Yup.string()
                                    .required('Insurance status is required'),
                                incotermInsurance: Yup.string()
                                    .required('Incoterm status is required'),
                            })}
                            onSubmit={fields => {
                                this.onSubmitClick(fields);
                            }}
                            render={({ values, errors, status, touched, handleChange }) => (

                                <Form>
                                    {console.error(errors)}
                                    <div className=" col-12 form-box mt-4">   <h3 className="pb-3">Incoterm</h3>  </div>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="incotermIncotermID">Incorterm</label>
                                                <Field name="incotermIncotermID" type="text" value={values.incotermIncotermID} onChange={handleChange} className={'form-control' + (errors.incotermIncotermID && touched.incotermIncotermID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="incotermIncotermID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="incotermIncorterm">Incorterm</label>
                                                <Field name="incotermIncorterm" type="text" value={values.incotermIncorterm} onChange={handleChange} className={'form-control' + (errors.incotermIncorterm && touched.incotermIncorterm ? ' is-invalid' : '')} />
                                                <ErrorMessage name="incotermIncorterm" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="incotermDescription">Description</label>
                                                <Field name="incotermDescription" type="text" value={values.incotermDescription} onChange={handleChange} className={'form-control' + (errors.incotermDescription && touched.incotermDescription ? ' is-invalid' : '')} />
                                                <ErrorMessage name="incotermDescription" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="incotermFreight">Freight</label>
                                                <Field name="incotermFreight" component="select" value={values.incotermFreight} onChange={handleChange} className={'form-control' + (errors.incotermFreight && touched.incotermFreight ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    <option ngvalue="Seller">Seller</option>
                                                    <option ngvalue="Consignee">Consignee</option>
                                                </Field>
                                                <ErrorMessage name="incotermFreight" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="incotermInsurance">Insurance</label>
                                                <Field name="incotermInsurance" component="select" value={values.incotermInsurance} onChange={handleChange} className={'form-control' + (errors.incotermInsurance && touched.incotermInsurance ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    <option ngvalue="Seller">Seller</option>
                                                    <option ngvalue="Consignee">Consignee</option>
                                                </Field>
                                                <ErrorMessage name="incotermInsurance" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="incotermStatus">Status</label>
                                                <Field name="incotermStatus" component="select" value={values.incotermStatus} onChange={handleChange} className={'form-control' + (errors.incotermStatus && touched.incotermStatus ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </Field>
                                                <ErrorMessage name="incotermStatus" component="div" className="invalid-feedback" />
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
                                <th scope="col">ID</th>
                                <th scope="col">Incorterm</th>
                                <th scope="col">Description</th>
                                <th scope="col">Freight</th>
                                <th scope="col">Insurance</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.incotermListOptions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Incoterm;