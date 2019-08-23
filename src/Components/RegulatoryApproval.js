import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

var BFF_URL = 'http://localhost:8081/';
let END_POINT = 'regapproval';

class RegulatoryApproval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ApprovalID: 'NEW_APPROVAL',
            nameValue: '',
            ApprovalInstitute: '',
            ApprovalTestName: '',
            ApprovalReleaseTimeInDays: 0,
            ApprovalSampleRequired: false,
            ApprovalAverageReleaseTime: 0,
            ApprovalObtainingStage: '',
            IsActive: false,
            CreatedBy: '',
            AttachmentsID: '',
            AttachmentsDocument: '',
            AttachmentsDescription: '',
            AttachmentsMandatory: '',
            AttachmentsOpetation: 0,
            ApprovalList:[],
            Approvalattachments: [],
            AttachmentsOpetationRows: '',
            fields: {}
        };
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onLoadAttachement = this.onLoadAttachement.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onChangehandler = this.onChangehandler.bind(this);
        this.onAddRow = this.onAddRow.bind(this);
        this.onResetRow = this.onResetRow.bind(this);
        
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
                        <td><button className="delete" onClick={() => this.editClick(k)} > Change </button></td>
                    </tr>);
                }
                
                this.setState({ ApprovalList: data });
                this.setState({ approvalListOptions: arrOptions });
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.loadDropdown(BFF_URL + END_POINT)
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    onEditClick(attachment) {
        this.setState({
            AttachmentsID: attachment.ID,
            AttachmentsDocument: attachment.document,
            AttachmentsDescription: attachment.description,
            AttachmentsMandatory: attachment.mandatory,
            AttachmentsOpetation: 1
        });
    }

    editClick(id) {
        this.setState({ isEditMode: true });
        let url = BFF_URL + END_POINT + '/' + this.state.ApprovalList[id].ID;
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                if (data.length !== 0) {
                    if (data) {

                        var arrDocuments = [];
                        for (var k = 0; k < data.Attachments.length; k++) {
                            var attachment = data.Attachments[k];
                            arrDocuments.push({ ID: attachment.ID, document: attachment.DocumentName, Description: attachment.Description, mandatory: attachment.Mandatory });
                        }

                        this.setState({
                            ApprovalID: data.ID,
                            ApprovalInstitute: data.Institute,
                            ApprovalTestName: data.TestName,
                            ApprovalReleaseTimeInDays: data.ReleaseTimeInDays,
                            ApprovalSampleRequired: data.SampleRequired,
                            ApprovalAverageReleaseTime: data.AverageReleaseTime,
                            ApprovalObtainingStage: data.ObtainingStage,
                            Approvalattachments: arrDocuments
                        });


                        this.openModal();
                    }
                }
            })
            .catch(console.log)
    }
    onChangehandler(event) {
        console.log(event.target.name + ' : ' + event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onAttachementReset() {
        this.setState({
            AttachmentsID: '-',
            AttachmentsDocument: '',
            AttachmentsDescription: '',
            AttachmentsMandatory: ''
        })
    }
    onResetRow (event) {
     
  
    }
    onAddRow (event) {
        const [AttachmentsDocument, AttachmentsDescription, AttachmentsMandatory] = event.target.value.split(',');

        if (AttachmentsDocument.trim() === '') {
            alert(' Document name is required.');
            return;
        }
        if (this.state.AttachmentsMandatory.trim() === '-') {
            alert(' Is this document required.');
            return;
        }

        //if (this.state.AttachmentsOpetation === 0) {
            this.state.Approvalattachments.push({ ID: 'New', document: AttachmentsDocument, description: AttachmentsDescription, mandatory: AttachmentsMandatory })

       /* } else if (this.state.AttachmentsOpetation === 1) {
            this.state.Approvalattachments[id] = { ID: this.state.AttachmentsID, document: AttachmentsDocument, description: AttachmentsDescription, mandatory: AttachmentsMandatory }
        }*/
        this.setState({
            AttachmentsID: '-',
            AttachmentsDocument: '',
            AttachmentsDescription: '',
            AttachmentsMandatory: ''
        });
        this.onLoadAttachement();
    }
    onRemoveRow(event) {
        var index =  event.target.value
       //  alert(index);
         this.state.Approvalattachments.splice(index, 1);
         this.onLoadContact();
     }

    onLoadAttachement() {
        var rows = this.state.Approvalattachments.map((attachment, i) => {
            return (
                <tr >
                    <td>{attachment.ID}</td>
                    <td>{attachment.document}</td>
                    <td>{attachment.description}</td>
                    <td>{attachment.mandatory}</td>
                    <td>
                        <button type="button" key={i} className="btn btn-primary-bridge-close" value={i} onClick={this.onRemoveRow}>Remove</button>
                    </td>
                </tr>
            );
        });

        this.setState({ AttachmentsOpetationRows: rows });
    }
    onSubmitClick(fields) {

        var APPROVAL_ID = null;
        var METHOD = 'POST'
        if (this.state.ApprovalID !== 'NEW_APPROVAL') {
            METHOD = 'PUT';
            APPROVAL_ID = this.state.ApprovalID;
        }
        console.error('METHOD : ==>' + METHOD);
        var arrDocuments = [];

        for (var k = 0; k < this.state.Approvalattachments.length; k++) {
            var attachment = this.state.Approvalattachments[k]
            arrDocuments.push({ ID: attachment.ID, RegulatoryApproval_ID: APPROVAL_ID, DocumentName: attachment.document, Description: attachment.description, Mandatory: attachment.mandatory });
        }

        fetch(BFF_URL + END_POINT, {
            method: METHOD,
            body: JSON.stringify({
                ID: APPROVAL_ID,
                Institute: fields.ApprovalInstitute,
                TestName: fields.ApprovalTestName,
                ReleaseTimeInDays: fields.ApprovalReleaseTimeInDays,
                SampleRequired: fields.ApprovalSampleRequired,
                AverageReleaseTime: fields.ApprovalAverageReleaseTime,
                ObtainingStage: fields.ApprovalObtainingStage,
                IsActive: fields.ApprovalIsActive,
                Parent_ID: fields.ApprovalParent_ID,
                CreatedBy: fields.ApprovalCreatedBy,
                CreatedTime: fields.ApprovalCreatedTime,
                Attachments: arrDocuments
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
            return;//response.json()
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
                                ApprovalReleaseTimeInDays: '',
                                ApprovalSampleRequired: false,
                                ApprovalAverageReleaseTime: '',
                                ApprovalObtainingStage: ''
                            }}
                            
                            validationSchema={Yup.object().shape({
                                ApprovalID: Yup.string()
                                    .required('Approval ID is required'),
                                ApprovalInstitute: Yup.string()
                                    .required('Institute is required.'),
                                ApprovalTestName: Yup.string()
                                    .required('Test name is required.'),
                                ApprovalReleaseTimeInDays: Yup.number()
                                    .required()
                                    .integer()
                                    .required('Positive integer value is required for release time (days)'),
                                ApprovalSampleRequired:Yup.string()
                                    .required('Is sample required ?'),
                                ApprovalAverageReleaseTime: Yup.number()
                                    .required()
                                    .integer()
                                    .required('Positive integer value is required for average release time (days)'),
                                ApprovalObtainingStage: Yup.string()
                                    .required('Obtaining stage air port is required.'),
                            })}

                            onSubmit={fields => {
                                this.onSubmitClick(fields);
                            }}
                            render={({ values, errors, status, touched, handleChange} ) => (
                                <Form>
                                    <div className=" col-12 form-box mt-4">   <h3 className="pb-3">Regulatory Approval</h3>  </div>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalID">Approval ID</label>
                                                <Field name="ApprovalID" type="text" value={values.ApprovalID} onChange={handleChange} className={'form-control' + (errors.ApprovalID && touched.ApprovalID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalInstitute">Institute</label>
                                                <Field name="ApprovalInstitute" value={values.ApprovalInstitute} onChange={handleChange} className={'form-control' + (errors.ApprovalInstitute && touched.ApprovalInstitute ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalInstitute" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalTestName">Test Name</label>
                                                <Field name="ApprovalTestName" type="text" value={values.ApprovalTestName} onChange={handleChange} className={'form-control' + (errors.ApprovalTestName && touched.ApprovalTestName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalTestName" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalReleaseTimeInDays">Release Time(Days)</label>
                                                <Field name="ApprovalReleaseTimeInDays" value={values.ApprovalReleaseTimeInDays} onChange={handleChange} type="text" className={'form-control' + (errors.ApprovalReleaseTimeInDays && touched.ApprovalReleaseTimeInDays ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalReleaseTimeInDays" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalSampleRequired">Sample Required</label>
                                                <Field name="ApprovalSampleRequired" value={values.ApprovalSampleRequired} onChange={handleChange} component="select" className={'form-control' + (errors.supplierTransportMode && touched.supplierTransportMode ? ' is-invalid' : '')} >
                                                    <option value=""></option>
                                                    <option value="Upon_raising_PO">Yes</option>
                                                    <option value="After_On-boarding">No</option>
                                                </Field>
                                                <ErrorMessage name="ApprovalSampleRequired" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalAverageReleaseTime">Average Release Time</label>
                                                <Field name="ApprovalAverageReleaseTime" value={values.ApprovalAverageReleaseTime} onChange={handleChange} type="text" className={'form-control' + (errors.ApprovalAverageReleaseTime && touched.ApprovalAverageReleaseTime ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalAverageReleaseTime" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalObtainingStage">Approval Obtaining Stage</label>
                                                <Field name="ApprovalObtainingStage" value={values.ApprovalObtainingStage} onChange={handleChange} component="select" className={'form-control' + (errors.ApprovalObtainingStage && touched.ApprovalObtainingStage ? ' is-invalid' : '')} >
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
                                                <Field name="AttachmentsDocument" value={values.AttachmentsDocument} onChange={handleChange} type="text" className={'form-control' + (errors.AttachmentsDocument && touched.AttachmentsDocument ? ' is-invalid' : '')} />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="AttachmentsDescription">Description</label>
                                                <Field name="AttachmentsDescription"  value={values.AttachmentsDescription} onChange={handleChange} type="text" className={'form-control' + (errors.AttachmentsDescription && touched.AttachmentsDescription ? ' is-invalid' : '')} />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="AttachmentsMandatory">Mandatory</label>
                                                <Field name="AttachmentsMandatory" value={values.AttachmentsMandatory} onChange={handleChange} component="select" className={'form-control' + (errors.AttachmentsMandatory && touched.AttachmentsMandatory ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    <option value="No">No</option>
                                                    <option value="Yes">Yes</option>
                                                </Field>

                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="attachmentActionButton">Action </label>
                                                <br></br>
                                                <button type="button" name="ContectActionButton" value={[values.AttachmentsDocument,values.AttachmentsDescription,values.AttachmentsMandatory]} onClick={this.onAddRow}>Save</button>
                                                <button type="button" name="ContectActionButton" value={values} onClick={this.onResetRow}>Reset</button>
                                            </div>
                                        </div>

                                        <div className=" col-12 form-box mt-4">
                                            <table className="table table-hover">
                                                <thead className="material-table-th">
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col">Attachments</th>
                                                        <th scope="col">Description </th>
                                                        <th scope="col"> Mandatory </th>
                                                        <th scope="col"> Edit Delete </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.AttachmentsOpetationRows}
                                                </tbody>
                                            </table>
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
                                <th scope="col">Edit</th>
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