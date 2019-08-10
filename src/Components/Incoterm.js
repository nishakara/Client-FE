import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

var urlMaterialService = 'http://localhost:3010/1001/'

class Incoterm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incotermID: '',
            incotermIncorterm: '',
            incotermDescription: '',
            incotermStatus: '',
            fields: {}
        };
        this.onMaterialClick = this.onMaterialClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    loadDropdown = (endPointUrl) => {
        fetch(endPointUrl)
            .then(res => res.json())
            .then((data) => {

                var arrOptions = [];
                for (var k = 0; k < data.length; k++) {
                    arrOptions.push(<tr key={k}>
                        <td>{data[k].ID}</td>
                        <td>{data[k].Incorterm}</td>
                        <td>{data[k].ItemOrigin}</td>
                        <td>{data[k].Description}</td>
                        <td>{data[k].Status}</td>
                    </tr>);
                    break;
                }
                this.setState({ incotermListOptions: arrOptions });
            })
            .catch(console.log)
    }

    componentDidMount() {

        this.loadDropdown(urlMaterialService + 'incoterm')

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

    handleChange(evt) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }

    onMaterialClick(fields) {
        console.error(fields);
        alert('1--SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
        var intID = null;
        var METHOD = 'POST'
        if (fields.materialID !== 'NEW_INCOTERM') {
            METHOD = 'PUT';
            intID = fields.materialID;
        }
        fetch(urlMaterialService + 'incoterm', {
            method: METHOD,
            body: JSON.stringify({
                ID: intID,
                Incorterm: fields.incotermIncorterm,
                Description: fields.incotermDescription,
                Status: fields.incotermStatus
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {

            if (response.status === 200 || response.status === 201) {
                alert('Incoterm is success fully saved');
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

                        contentLabel="Example Modal">
                        <Formik
                            initialValues={{
                                incotermID: '',
                                incotermIncorterm: '',
                                incotermDescription: '',
                                incotermStatus: '',
                                fields: {}
                            }}
                            validationSchema={Yup.object().shape({
                                incotermID: Yup.string()
                                    .required('Incoterm ID is required'),
                                incotermIncorterm: Yup.string()
                                    .required('Incoterm  is required'),
                                incotermDescription: Yup.string()
                                    .required('Incoterm description is required'),
                                incotermStatus: Yup.boolean()
                                    .required('Incoterm status is required'),
                            })}
                            onSubmit={fields => {
                                this.onMaterialClick(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="incotermID">Incoterm ID</label>
                                                <Field name="incotermID" type="text" className={'form-control' + (errors.incotermID && touched.incotermID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="incotermID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="incotermIncorterm">Incorterm</label>
                                                <Field name="incotermIncorterm" type="text" className={'form-control' + (errors.incotermIncorterm && touched.incotermIncorterm ? ' is-invalid' : '')} />
                                                <ErrorMessage name="incotermIncorterm" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="incotermDescription">Description</label>
                                                <Field name="incotermDescription" type="text" className={'form-control' + (errors.incotermDescription && touched.incotermDescription ? ' is-invalid' : '')} />
                                                <ErrorMessage name="incotermDescription" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="incotermStatus">Status</label>
                                                <Field name="incotermStatus" type="checkbox" className={'form-control' + (errors.incotermStatus && touched.incotermStatus ? ' is-invalid' : '')} />
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
                                <th scope="col">Status</th>
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

export default Incoterm;