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
            ApprovalID: 'NEW_APPROVAL',
            ApprovalInstitute: '',
            ApprovalTestName: '',
            ApprovalReleaseTimeInDays: 0,
            ApprovalSampleRequired: false,
            ApprovalAverageReleaseTime: 0, 
            ApprovalObtainingStage: '',
            IsActive: false,
            CreatedBy: '',
            fields: {}
        };
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onEditClick = this.onEditClick.bind(this);

    }

    loadDropdown = (endPointUrl) => {
        fetch(endPointUrl)
            .then(res => res.json())
            .then((data) => {
                var arrOptions = [];
                for (var k = 0; k < data.length; k++) {
                    console.log(data[k])
                    arrOptions.push(<tr key={k}>
                    <td>{data[k].Institute}</td>
                    <td>{data[k].TestName}</td>
                    <td>{data[k].ReleaseTimeInDays}</td>
                    <td>{data[k].SampleRequired}</td>
                    <td>{data[k].AverageReleaseTime}</td>
                    <td>{data[k].ApprovalObtainingStage}</td>
                    </tr>);
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
    onEditClick(id){
        alert(id);
    }
    onSubmitClick(fields) {
        console.error(fields);
        var APPROVAL_ID = null;
        var METHOD = 'POST'
        if (fields.ApprovalID !== 'NEW_APPROVAL') {
            METHOD = 'PUT';
            APPROVAL_ID = fields.ApprovalID;
        }
        fetch(urlMaterialService + Client_ID + '/regapproval', {
            method: METHOD,
            body: JSON.stringify({

                ID : APPROVAL_ID,
                Institute : fields.ApprovalInstitute,
                TestName : fields.ApprovalTestName,
                ReleaseTimeInDays : fields.ApprovalReleaseTimeInDays,
                SampleRequired : fields.ApprovalSampleRequired,
                AverageReleaseTime : fields.ApprovalAverageReleaseTime,
                ObtainingStage : fields.ApprovalObtainingStage,
                IsActive : fields.ApprovalIsActive,
                Parent_ID : fields.ApprovalParent_ID,
                CreatedBy: fields.ApprovalCreatedBy,
                CreatedTime : fields.ApprovalCreatedTime,
                Attachments: [{DocumentName: fields.AttachmentsDocument,
                    Description:fields.AttachmentsDescription,
                    Mandatory:fields.AttachmentsMandatory}]
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",'InitiatedBy': 'UAT USER','Client_ID': Client_ID
            }
        }).then(response => {

            if (response.status === 200 || response.status === 201) {
                alert('Approval is success fully saved');
            } else {
                alert('An error occurred while saving please try again');
            }
            return ;//response.json()
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
                   
                        contentLabel="Regulatory Approval">
                        <Formik
                            initialValues={{
                                ApprovalID: 'NEW_APPROVAL',
                                ApprovalInstitute: '',
                                ApprovalTestName: '',
                                ApprovalReleaseTimeInDays: 0,
                                ApprovalSampleRequired: false,
                                ApprovalAverageReleaseTime: 0, 
                                ApprovalObtainingStage: ''
                            }}
                            validationSchema={Yup.object().shape({
                                ApprovalID: Yup.string()
                                    .required('Approval id is required'),
                                ApprovalInstitute: Yup.string()
                                    .required('Institute type is required.'),
                                ApprovalTestName: Yup.string()
                                    .required('Test name type is required.'),
                                ApprovalReleaseTimeInDays: Yup.number().required().positive().integer()
                                    .required('Release time required.'),
                                ApprovalSampleRequired: Yup.string()
                                    .required('IS sample is required.'),
                                ApprovalAverageReleaseTime: Yup.number().required().positive().integer()
                                    .required('Average release time is required'),
                                ApprovalObtainingStage: Yup.string()
                                    .required('Is sample required'),
                                AttachmentsDocument: Yup.string()
                                .required('Is sample required'),
                            })}
                            onSubmit={fields => {
                                this.onSubmitClick(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className=" col-12 form-box mt-4">   <h3 className="pb-3">Regulatory Approval</h3>  </div>
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
                                                <label htmlFor="ApprovalTestName">TestName</label>
                                                <Field name="ApprovalTestName" type="text" className={'form-control' + (errors.ApprovalTestName && touched.ApprovalTestName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalTestName" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalReleaseTimeInDays">Release Time(Days)</label>
                                                <Field name="ApprovalReleaseTimeInDays" type="text" className={'form-control' + (errors.ApprovalReleaseTimeInDays && touched.ApprovalReleaseTimeInDays ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalReleaseTimeInDays" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-3 form-box mt-1">
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

                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalAverageReleaseTime">Average Release Time</label>
                                                <Field name="ApprovalAverageReleaseTime" type="text" className={'form-control' + (errors.ApprovalAverageReleaseTime && touched.ApprovalAverageReleaseTime ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalAverageReleaseTime" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalObtainingStage">Approval Obtaining Stage</label>
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

                                        </div>
                                        <div className=" col-12 form-box mt-4">   <h6 className="pb-3">Attachments</h6>  </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="AttachmentsDocument">Document</label>
                                                <Field name="AttachmentsDocument" type="text" className={'form-control' + (errors.AttachmentsDocument && touched.AttachmentsDocument ? ' is-invalid' : '')} />
                                                <ErrorMessage name="AttachmentsDocument" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="AttachmentsDescription">Description</label>
                                                <Field name="AttachmentsDescription" type="text" className={'form-control' + (errors.AttachmentsDescription && touched.AttachmentsDescription ? ' is-invalid' : '')} />
                                                <ErrorMessage name="AttachmentsDescription" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="AttachmentsMandatory">Mandatory</label>
                                                <Field name="AttachmentsMandatory" type="text" className={'form-control' + (errors.AttachmentsMandatory && touched.AttachmentsMandatory ? ' is-invalid' : '')} />
                                                <ErrorMessage name="AttachmentsMandatory" component="div" className="invalid-feedback" />
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