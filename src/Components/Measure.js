import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

var urlMaterialService = 'http://localhost:3010/1001/'

class Measure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mesID: '',
            mesMeasure: '',
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
                        <td>{data[k].Measure}</td>
                    </tr>);
                    break;
                }
                this.setState({ measureListOptions: arrOptions });
            })
            .catch(console.log)
    }

    componentDidMount() {

        this.loadDropdown(urlMaterialService + 'mesure')

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
    onEditClick(){

    }
    onMaterialClick(fields) {
        console.error(fields);
        alert('1--SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
        var mesID = null;
        var METHOD = 'POST'
        if (fields.hsHsCode !== 'UNIT_OF_MEASURES') {
            METHOD = 'PUT';
            mesID = fields.ID;
        }
        fetch(urlMaterialService + 'mesure', {
            method: METHOD,
            body: JSON.stringify({
                ID: mesID,
                Measure: fields.Measure
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {

            if (response.status === 200 || response.status === 201) {
                alert('Measure is success fully saved');
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
                                mesID: '',
                                mesMeasure: '',
                                fields: {}
                            }}
                            validationSchema={Yup.object().shape({
                                mesID: Yup.string()
                                    .required('Measure is required'),
                                mesMeasure: Yup.string()
                                    .required('Decription  is required')
                            })}
                            onSubmit={fields => {
                                this.onMaterialClick(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="mesID">Mesure</label>
                                                <Field name="mesID" type="text" className={'form-control' + (errors.mesID && touched.mesID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="mesID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="mesMeasure">Description</label>
                                                <Field name="mesMeasure" type="text" className={'form-control' + (errors.mesMeasure && touched.mesMeasure ? ' is-invalid' : '')} />
                                                <ErrorMessage name="mesMeasure" component="div" className="invalid-feedback" />
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
                                <th scope="col">Measure</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.measureListOptions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Measure;