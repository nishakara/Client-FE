import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

var urlMaterialService = 'http://localhost:3010/1001/'

class HSCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hsHsCode: '',
            hsDescription: '',
            hsPriority:0,
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
                    <td>{data[k].HsCode}</td>
                    <td>{data[k].Description}</td>
                    <td>{data[k].Priority}</td>
                    </tr>);
                    break;
                }
                this.setState({ hsCodeListOptions: arrOptions });
            })
            .catch(console.log)
    }

    componentDidMount() {

        this.loadDropdown(urlMaterialService + 'hs')

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
        var hsID = null;
        var METHOD = 'POST'
        if (fields.hsHsCode !== 'NEW_HS_CODE') {
            METHOD = 'PUT';
            hsID = fields.hsHsCode;
        }
        fetch(urlMaterialService + 'hs', {
            method: METHOD,
            body: JSON.stringify({
                HsCode: fields.hsHsCode,
                Description: fields.incotermIncorterm,
                Priority:  fields.hsDescription
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {

            if (response.status === 200 || response.status === 201) {
                alert('HS code is success fully saved');
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
                                hsHsCode: '',
                                hsDescription: '',
                                hsPriority:0,
                                fields: {}
                            }}
                            validationSchema={Yup.object().shape({
                                hsHsCode: Yup.string()
                                .required('HS code is required'),
                                hsDescription: Yup.string()
                                .required('boolean  is required'),
                                hsPriority: Yup.number()
                                .required('Priority is required')
                            })}
                            onSubmit={fields => {
                                this.onMaterialClick(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsHsCode">Hs Code</label>
                                                <Field name="hsHsCode" type="text" className={'form-control' + (errors.hsHsCode && touched.hsHsCode ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsHsCode" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsDescription">Description</label>
                                                <Field name="hsDescription" type="text" className={'form-control' + (errors.hsDescription && touched.hsDescription ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsDescription" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsPriority">Priority</label>
                                                <Field name="hsPriority" type="text" className={'form-control' + (errors.hsPriority && touched.hsPriority ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsPriority" component="div" className="invalid-feedback" />
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
                                <th scope="col">HS Code</th>
                                <th scope="col">Description</th>
                                <th scope="col">ClientName</th>
                                <th scope="col">Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.hsCodeListOptions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default HSCode;