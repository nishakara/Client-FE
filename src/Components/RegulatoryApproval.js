import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

var urlMaterialService = 'http://localhost:3010/';
var Client_ID = '6e65ad20-d576-43f2-95fa-19daf959070d';

class RegulatoryApproval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            Institute: '',
            TestName: '',
            ReleaseTimeInDays: 0,
            SampleRequired: false,
            AverageReleaseTime: 0, 
            ApprovalObtainingStage: '',
            IsActive: false,
            CreatedBy: '',
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
                    <td>{data[k].Institute}</td>
                    <td>{data[k].TestName}</td>
                    <td>{data[k].ReleaseTimeInDays}</td>
                    <td>{data[k].SampleRequired}</td>
                    <td>{data[k].AverageReleaseTime}</td>
                    <td>{data[k].ApprovalObtainingStage}</td>
                    </tr>);
                    break;
                }
                this.setState({ approvalListOptions: arrOptions });
            })
            .catch(console.log)
    }

    componentDidMount() {

        this.loadDropdown(urlMaterialService + Client_ID +'/regapproval')

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
        var mtID = null;
        var METHOD = 'POST'
        if (fields.materialID !== 'NEW_APPROVAL') {
            METHOD = 'PUT';
            mtID = fields.materialID;
        }
        fetch(urlMaterialService + 'regapproval', {
            method: METHOD,
            body: JSON.stringify({
                ApprovalID : fields.ApprovalID,
                ApprovalInstitute : fields.ApprovalInstitute,
                ApprovalTestName : fields.ApprovalTestName,
                ApprovalReleaseTimeInDays : fields.ApprovalReleaseTimeInDays,
                ApprovalSampleRequired : fields.ApprovalSampleRequired,
                ApprovalAverageReleaseTime : fields.ApprovalAverageReleaseTime,
                ApprovalApprovalObtainingStage : fields.ApprovalApprovalObtainingStage,
                ApprovalIsActive : fields.ApprovalIsActive,
                ApprovalParent_ID : fields.ApprovalParent_ID,
                ApprovalCreatedBy : fields.ApprovalCreatedBy,
                ApprovalCreatedTime : fields.ApprovalCreatedTime
       
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {

            if (response.status === 200 || response.status === 201) {
                alert('Approval is success fully saved');
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
                                ID: '',
                                Institute: '',
                                TestName: '',
                                ReleaseTimeInDays: 0,
                                SampleRequired: false,
                                AverageReleaseTime: 0, 
                                ApprovalObtainingStage: '',
                                IsActive: false,
                                CreatedBy: '',
                            }}
                            validationSchema={Yup.object().shape({
                                ApprovalID: Yup.string()
                                    .required('Approval id is required'),
                                ApprovalInstitute: Yup.string()
                                    .required('Institute type is required.'),
                                ApprovalReleaseTimeInDays: Yup.string()
                                    .required('Release time required.'),
                                ApprovalSampleRequired: Yup.string()
                                    .required('IS sample is required.'),
                                ApprovalAverageReleaseTime: Yup.string()
                                    .required('Average release time is required'),
                                ApprovalObtainingStage: Yup.boolean()
                                    .required('Is sample required'),
                                ApprovalApprovalObtainingStage: Yup.string()
                                    .required('Obtaining stage is required')
                            })}
                            onSubmit={fields => {
                                this.onMaterialClick(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalID">Approval ID</label>
                                                <Field name="ApprovalID" type="text" className={'form-control' + (errors.ApprovalID && touched.ApprovalID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalInstitute">Institute</label>
                                                <Field name="ApprovalInstitute" type="text" className={'form-control' + (errors.ApprovalInstitute && touched.ApprovalInstitute ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalInstitute" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalObtainingStage">TestName</label>
                                                <Field name="ApprovalObtainingStage" type="text" className={'form-control' + (errors.ApprovalObtainingStage && touched.ApprovalObtainingStage ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalObtainingStage" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="Institute">Release Time(Days)</label>
                                                <Field name="Institute" type="text" className={'form-control' + (errors.Institute && touched.Institute ? ' is-invalid' : '')} />
                                                <ErrorMessage name="Institute" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalSampleRequired">Sample Required</label>
                                                 <Field name="ApprovalSampleRequired" component="select" className={'form-control' + (errors.supplierTransportMode && touched.supplierTransportMode ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    <option value="Upon_raising_PO">Yes</option>
                                                    <option value="After_On-boarding">No</option>
                                                </Field>
                                                <ErrorMessage name="ApprovalSampleRequired" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="SampleRequired">Average Release Time</label>
                                                <Field name="SampleRequired" type="checkbox" className={'form-control' + (errors.SampleRequired && touched.SampleRequired ? ' is-invalid' : '')} />
                                                <ErrorMessage name="SampleRequired" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalObtainingStage">ApprovalObtainingStage</label>
                                                <Field name="ApprovalObtainingStage" component="select" className={'form-control' + (errors.ApprovalObtainingStage && touched.ApprovalObtainingStage ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    <option value="Upon_raising_PO">Upon raising PO</option>
                                                    <option value="After_On-boarding">After On-boarding</option>
                                                    <option value="After_shipment_arrival"> After shipment arrival</option>
                                                    <option value="Upon_sample_collection">Upon_sample_collection</option>
                                                    <option value="After_sample_verification">After sample verification</option>
                                                </Field>
                                                <ErrorMessage name="ApprovalObtainingStage" component="div" className="invalid-feedback" />
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
                                <th scope="col">Institute</th>
                                <th scope="col">Test Name</th>
                                <th scope="col">Release Time </th>
                                <th scope="col">Sample Required</th>
                                <th scope="col">Average Release Time</th>
                                <th scope="col">Approval Obtaining Stage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.approvalListOptions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default RegulatoryApproval;