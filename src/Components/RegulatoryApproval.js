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
    onAttachementSave(id) {

        if (this.state.AttachmentsDocument.trim() === '') {
            alert(' Document name is required.');
            return;
        }
        if (this.state.AttachmentsMandatory.trim() === '-') {
            alert(' Is this document required.');
            return;
        }

        if (this.state.AttachmentsOpetation === 0) {
            this.state.Approvalattachments.push({ ID: 'New', document: this.state.AttachmentsDocument, description: this.state.AttachmentsDescription, mandatory: this.state.AttachmentsMandatory })

        } else if (this.state.AttachmentsOpetation === 1) {
            this.state.Approvalattachments[id] = { ID: this.state.AttachmentsID, document: this.state.AttachmentsDocument, description: this.state.AttachmentsDescription, mandatory: this.state.AttachmentsMandatory }
        }
        this.setState({
            AttachmentsID: '-',
            AttachmentsDocument: '',
            AttachmentsDescription: '',
            AttachmentsMandatory: ''
        });
        this.onLoadAttachement();
    }

    onRemove(id) {
        alert(id);
        this.state.Approvalattachments.splice(id, 1);
        this.onLoadAttachement();
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
                        <button type="button" key={i} className="btn btn-primary-bridge-close" onClick={() => this.onEditClick(attachment)}>Edit</button>
                        <button type="button" key={i} className="btn btn-primary-bridge-close" onClick={() => this.onRemove(i)}>Remove</button>
                    </td>
                </tr>
            );
        });

        this.setState({ AttachmentsOpetationRows: rows });
    }
    onSubmitClick() {

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
                Institute: this.state.ApprovalInstitute,
                TestName: this.state.ApprovalTestName,
                ReleaseTimeInDays: this.state.ApprovalReleaseTimeInDays,
                SampleRequired: this.state.ApprovalSampleRequired,
                AverageReleaseTime: this.state.ApprovalAverageReleaseTime,
                ObtainingStage: this.state.ApprovalObtainingStage,
                IsActive: this.state.ApprovalIsActive,
                Parent_ID: this.state.ApprovalParent_ID,
                CreatedBy: this.state.ApprovalCreatedBy,
                CreatedTime: this.state.ApprovalCreatedTime,
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
                              /*  ApprovalID: 'NEW_APPROVAL',
                                ApprovalInstitute: '',
                                ApprovalTestName: '',
                                ApprovalReleaseTimeInDays: 0,
                                ApprovalSampleRequired: false,
                                ApprovalAverageReleaseTime: 0,
                                ApprovalObtainingStage: ''*/
                            }}

                            onSubmit={fields => {
                                this.onSubmitClick();
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className=" col-12 form-box mt-4">   <h3 className="pb-3">Regulatory Approval</h3>  </div>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalID">Approval ID</label>
                                                <Field name="ApprovalID" type="text" value={this.state.ApprovalID} onChange={this.onChangehandler.bind(this)} className={'form-control' + (errors.ApprovalID && touched.ApprovalID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalInstitute">Institute</label>
                                                <Field name="ApprovalInstitute" onChange={this.onChangehandler.bind(this)}
                                                    value={this.state.ApprovalInstitute} className={'form-control' + (errors.ApprovalInstitute && touched.ApprovalInstitute ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalInstitute" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalTestName">Test Name</label>
                                                <Field name="ApprovalTestName" type="text" value={this.state.ApprovalTestName} onChange={this.onChangehandler.bind(this)} className={'form-control' + (errors.ApprovalTestName && touched.ApprovalTestName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalTestName" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalReleaseTimeInDays">Release Time(Days)</label>
                                                <Field name="ApprovalReleaseTimeInDays" value={this.state.ApprovalReleaseTimeInDays} type="text" onChange={this.onChangehandler.bind(this)} className={'form-control' + (errors.ApprovalReleaseTimeInDays && touched.ApprovalReleaseTimeInDays ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalReleaseTimeInDays" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalSampleRequired">Sample Required</label>
                                                <Field name="ApprovalSampleRequired" value={this.state.ApprovalSampleRequired} component="select" onChange={this.onChangehandler.bind(this)} className={'form-control' + (errors.supplierTransportMode && touched.supplierTransportMode ? ' is-invalid' : '')} >
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
                                                <Field name="ApprovalAverageReleaseTime" value={this.state.ApprovalAverageReleaseTime} type="text" onChange={this.onChangehandler.bind(this)} className={'form-control' + (errors.ApprovalAverageReleaseTime && touched.ApprovalAverageReleaseTime ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalAverageReleaseTime" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalObtainingStage">Approval Obtaining Stage</label>
                                                <Field name="ApprovalObtainingStage" value={this.state.ApprovalObtainingStage} component="select" onChange={this.onChangehandler.bind(this)} className={'form-control' + (errors.ApprovalObtainingStage && touched.ApprovalObtainingStage ? ' is-invalid' : '')} >
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
                                                <Field name="AttachmentsDocument" value={this.state.AttachmentsDocument} onChange={this.onChangehandler.bind(this)} type="text" className={'form-control' + (errors.AttachmentsDocument && touched.AttachmentsDocument ? ' is-invalid' : '')} />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="AttachmentsDescription">Description</label>
                                                <Field name="AttachmentsDescription" value={this.state.AttachmentsDescription} onChange={this.onChangehandler.bind(this)} type="text" className={'form-control' + (errors.AttachmentsDescription && touched.AttachmentsDescription ? ' is-invalid' : '')} />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="AttachmentsMandatory">Mandatory</label>
                                                <Field name="AttachmentsMandatory" value={this.state.AttachmentsMandatory} onChange={this.onChangehandler.bind(this)} component="select" className={'form-control' + (errors.AttachmentsMandatory && touched.AttachmentsMandatory ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    <option value="No">No</option>
                                                    <option value="Yes">Yes</option>
                                                </Field>

                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="attachmentActionButton">Action </label>
                                                <button type="button" name="attachmentActionButton" onClick={this.onAttachementSave.bind(this)}>Save</button>
                                                <button type="button" name="attachmentActionButton" onClick={this.onAttachementReset.bind(this)}>Reset</button>
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