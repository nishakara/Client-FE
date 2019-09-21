import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const { URL_BFF, ENDPOINTS } = require('./config');


class Client extends Component {
    constructor(props) {

        super(props);
        this.state =  {
             clientClientID : '',
             clientClientName : '',
             clientClientAddress : '',
             clientContactDetails : '',
             clientVAT: '',
             clientTIN :'',
             clientBRG : '',
             clientContactNo :'',
             clientDemurragesCat :'',
             clientNotifyType : '',
             clientEmailAlias :'',
             clientDescription :'',
             clientType:'',
             clientAttachment:'',
             clientRemarks:'',
             clientCoName:'',
             clientCoDesignation:'',
             clientCoContactNo:'',
             clientCoEmailAddress:'',
             clientCoOCD:'',
             clientEnName:'',
             clientEnAddress:'',
             clientEnTIN:'',
             clientEnVATNo:'',
             clientEnBrg:'',
             clientEnStatus:'',
             clientTypeOfExports:'',
             clientExportCat:'',
             fields:{}

        }
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
                        <td>{data[k].ClientID }</td>
                        <td>{data[k].ClientName}</td>
                        <td>{data[k].ClientAddress }</td>
                        <td>{data[k].ContactDetails}</td>
                        <td>{data[k].VAT}</td>
                        <td>{data[k].TIN}</td>
                        <td>{data[k].BRG }</td>
                        <td>{data[k].ContactNo}</td>
                        <td>{data[k].DemurragesCat }</td>
                        <td>{data[k].NotifyType }</td>
                        <td>{data[k].EmailAlias}</td>
                        <td>{data[k].Description}</td>
                        <td>{data[k].Type}</td>
                        <td>{data[k].Attachment}</td>
                        <td>{data[k].Remarks}</td>
                        <td>{data[k].CoName}</td>
                        <td>{data[k].CoDesignation}</td>
                        <td>{data[k].CoContactNo}</td>
                        <td>{data[k].CoEmailAddress}</td>
                        <td>{data[k].CoOCD}</td>
                        <td>{data[k].EnName}</td>
                        <td>{data[k].EnAddress}</td>
                        <td>{data[k].EnTIN}</td>
                        <td>{data[k].EnVATNo}</td>
                        <td>{data[k].EnBrg}</td>
                        <td>{data[k].EnStatus}</td>
                        <td>{data[k].TypeOfExports}</td>
                        <td>{data[k].ExportCat}</td>

                        <td> <button type="button" value={data[k].ID} className="btn btn-primary-bridge-close" onClick={this.onEditModeLoadDetail}>Edit-X</button></td>
                    </tr>);

                }
                this.setState({ clientListOptions: arrOptions });
            })
            .catch(console.log)
    }

    componentDidMount() {

        this.loadDropdown(URL_BFF + ENDPOINTS.CLIENT)

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
             clientClientID : '',
             clientClientName : '',
             clientClientAddress : '',
             clientContactDetails : '',
             clientVAT: '',
             clientTIN :'',
             clientBRG : '',
             clientContactNo :'',
             clientDemurragesCat :'',
             clientNotifyType : '',
             clientEmailAlias :'',
             clientDescription :'',
             clientType:'',
             clientAttachment:'',
             clientRemarks:'',
             clientCoName:'',
             clientCoDesignation:'',
             clientCoContactNo:'',
             clientCoEmailAddress:'',
             clientCoOCD:'',
             clientEnName:'',
             clientEnAddress:'',
             clientEnTIN:'',
             clientEnVATNo:'',
             clientEnBrg:'',
             clientEnStatus:'',
             clientTypeOfExports:'',
             clientExportCat:'',

            
        });
    }

    onEditModeLoadDetail(event) {
        var Id = event.target.value;

        this.setState({ isEditMode: true });

        let url = URL_BFF + ENDPOINTS.CLIENT + '/' + Id;
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                if (data.length !== 0) {
                    if (data) {
                        this.setState({
                            clientClientID : data.ClientID,
                            clientClientName :data.ClientName ,
                            clientClientAddress : data.ClientAddress ,
                            clientContactDetails : data.ContactDetails ,
                            clientVAT: data.VAT,
                            clientTIN :data.TIN ,
                            clientBRG : data.BRG,
                            clientContactNo :data.ContactNo ,
                            clientDemurragesCat :data.DemurragesCat ,
                            clientNotifyType : data.NotifyType ,
                            clientEmailAlias :data.ClientEmailAliasID,
                            clientDescription :data.Description,
                            clientType:data.Type,
                            clientAttachment:data.Attachment,
                            clientRemarks:data.Remarks,
                            clientCoName:data.CoName,
                            clientCoDesignation:data.CoDesignation,
                            clientCoContactNo:data.CoContactNo,
                            clientCoEmailAddress:data.CoEmailAddress,
                            clientCoOCD:data.CoOCD,
                            clientEnName:data.EnName,
                            clientEnAddress:data.EnAddress,
                            clientEnTIN:data.EnTIN,
                            clientEnVATNo:data.EnVATNo,
                            clientEnBrg:data.EnBrg,
                            clientEnStatus:data.EnStatus,
                            clientTypeOfExports:data.TypeOfExports,
                            clientExportCat:data.ExportCat,
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
            ID = fields.incotermIncotermID;
        }


        fetch(URL_BFF + ENDPOINTS.CLIENT, {
            method: METHOD,
            body: JSON.stringify({
                ClientID:fields.incotermIncorterm,
                ClientName:fields.incotermIncorterm,
                ClientAddress:fields.incotermIncorterm,
                ContactDetails:fields.incotermIncorterm,
                ContactDetails:fields.incotermIncorterm,
                VAT:fields.incotermIncorterm,
                TIN:fields.incotermIncorterm,
                BRG:fields.incotermIncorterm,
                ContactNo:fields.incotermIncorterm,
                DemurragesCat:fields.incotermIncorterm,
                NotifyType:fields.incotermIncorterm,
                ClientEmailAliasID:fields.incotermIncorterm,
                Description:fields.incotermIncorterm,
                Type:fields.incotermIncorterm,
                Attachment:fields.incotermIncorterm,
                Remarks:fields.incotermIncorterm,
                CoName:fields.incotermIncorterm,
                CoDesignation:fields.incotermIncorterm,
                CoContactNo:fields.incotermIncorterm,
                CoEmailAddress:fields.incotermIncorterm,
                CoOCD:fields.incotermIncorterm,
                EnName:fields.incotermIncorterm,
                EnAddress:fields.incotermIncorterm,
                EnTIN:fields.incotermIncorterm,
                EnVATNo:fields.incotermIncorterm,
                EnBrg:fields.incotermIncorterm,
                EnStatus:fields.incotermIncorterm,
                TypeOfExports:fields.incotermIncorterm,
                ExportCat:fields.incotermIncorterm,

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            this.setState({ isEditMode: false });
            if (response.status === 200 || response.status === 201) {
                alert('Client information saved');
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
                        <button type="button" onClick={this.openModal} className="btn btn-line-primary-bridge " data-toggle="modal" data-target=".bd-example-modal-lg" >Add Client</button>
                    </div>
                </div>
                <div>

                    <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            ariaHideApp={false}
                            contentLabel="Client">

                            <Formik
                                   enableReinitialize={true}
                                   initialValues={{
                                    clientClientID : this.state.clientClientID,
                                    clientClientName : this.state.ClientName ,
                                    clientClientAddress : this.state.ClientAddress,
                                    clientContactDetails : this.state.ContactDetails,
                                    clientVAT: this.state.VAT,
                                    clientTIN :this.state.TIN,
                                    clientBRG : this.state.BRG,
                                    clientContactNo :this.state.ContactNo,
                                    clientDemurragesCat :this.state.DemurragesCat,
                                    clientNotifyType : this.state.NotifyType,
                                    clientEmailAlias :this.state.EmailAlias ,
                                    clientDescription :this.state.Description,
                                    clientType:this.state.Type,
                                    clientAttachment:this.state.Attachment,
                                    clientRemarks:this.state.Remarks,
                                    clientCoName:this.state.CoName,
                                    clientCoDesignation:this.state.CoDesignation,
                                    clientCoContactNo:this.state.CoContactNo,
                                    clientCoEmailAddress:this.state.CoEmailAddress,
                                    clientCoOCD:this.state.CoOCD,
                                    clientEnName:this.state.EnName,
                                    clientEnAddress:this.state.EnAddress,
                                    clientEnTIN:this.state.EnTIN,
                                    clientEnVATNo:this.state.EnVATNo,
                                    clientEnBrg:this.state.EnBrg,
                                    clientEnStatus:this.state.EnStatus,
                                    clientTypeOfExports:this.state.TypeOfExports,
                                    clientExportCat:this.state.ExportCat,
                                       fields: {}
                                   }}
                                   
                                   validationSchema={Yup.object().shape({
                                    clientClientID : Yup.string()
                                        .required('Client ID is required'),
                                    clientClientName : Yup.string()
                                    .required('Client Name is required'),
                                    clientClientAddress : Yup.string()
                                    .required('Client Address is required'),
                                    clientContactDetails : Yup.string()
                                    .required('Contact Details is required'),
                                    clientVAT: Yup.string()
                                    .required('VAT: is required'),
                                    clientTIN :Yup.string()
                                    .required('TIN is required'),
                                    clientBRG : Yup.string()
                                    .required('BRG  is required'),
                                    clientContactNo :Yup.string()
                                    .required('Contact No is required'),
                                    clientDemurragesCat :Yup.string()
                                    .required('Demurrages Cat is required'),
                                    clientNotifyType : Yup.string()
                                    .required('Notify Type is required'),
                                    clientEmailAlias :Yup.string()
                                    .required('EmailAlias is required'),
                                    
                                   })}
                                   onSubmit={fields => {
                                    this.onSubmitClick(fields);
                                   }}

                                    render = {({values, errors, status, touched, handleChange}) => (
                                        
                                <Form>
                                    {console.error(errors)}
                                    <div className=" col-12 form-box mt-4">   <h3 className="pb-3">Client</h3>  </div>
                                    <div className="row pr-3 pl-3">

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientClientID">Client ID</label>
                                                <Field name="clientClientID" type="text" value={values.clientClientID} onChange={handleChange} className={'form-control' + (errors.clientClientID && touched.clientClientID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientClientID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientClientName">Client Name</label>
                                                <Field name="clientClientName" type="text" value={values.clientClientName} onChange={handleChange} className={'form-control' + (errors.clientClientName && touched.clientClientName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientClientName" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>


                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientClientAddress">Client Address</label>
                                                <Field name="clientClientAddress" type="text" value={values.clientClientAddress} onChange={handleChange} className={'form-control' + (errors.clientClientAddress && touched.clientClientAddress ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientClientAddress" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>


                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientContactDetails">Client Contact Details</label>
                                                <Field name="clientContactDetails" type="text" value={values.clientContactDetails} onChange={handleChange} className={'form-control' + (errors.clientContactDetails && touched.clientContactDetails ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientContactDetails" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>


                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientVAT">VAT</label>
                                                <Field name="clientVAT" type="text" value={values.clientVAT} onChange={handleChange} className={'form-control' + (errors.clientVAT && touched.clientVAT ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientVAT" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientTIN">TIN</label>
                                                <Field name="clientTIN" type="text" value={values.clientTIN} onChange={handleChange} className={'form-control' + (errors.clientTIN && touched.clientTIN ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientTIN" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>


                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientBRG">Buisness Registration No</label>
                                                <Field name="clientBRG" type="text" value={values.clientBRG} onChange={handleChange} className={'form-control' + (errors.clientBRG && touched.clientBRG ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientBRG" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>


                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientContactNo">Contact No</label>
                                                <Field name="clientContactNo" type="text" value={values.clientContactNo} onChange={handleChange} className={'form-control' + (errors.clientContactNo && touched.clientClientName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientContactNo" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        
                                        <div className="col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="clientDemurragesCat">Supplier</label>
                                                        <Field name="clientDemurragesCat" component="select" value={values.clientDemurragesCat} onChange={handleChange} className={'form-control' + (errors.clientDemurragesCat && touched.clientDemurragesCat ? ' is-invalid' : '')} >
                                                            <option value="-"></option>
                                                            <option value="Port">Port</option>
                                                            <option value="Liner">Liner</option>
                                                        </Field>
                                                        <ErrorMessage name="clientDemurragesCat" component="div" className="invalid-feedback" />
                                                    </div>
                                        </div>


                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientNotifyType">Notification Type</label>
                                                <Field name="clientNotifyType" type="text" value={values.clientNotifyType} onChange={handleChange} className={'form-control' + (errors.clientNotifyType && touched.clientNotifyType ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientNotifyType" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>


                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientEmailAlias">Email Alias</label>
                                                <Field name="clientEmailAlias" type="text" value={values.clientEmailAlias} onChange={handleChange} className={'form-control' + (errors.clientEmailAlias && touched.clientEmailAlias ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientEmailAlias" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                    </div><div><hr></hr></div>

                                    <div className="row pr-3 pl-3">

                                        

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label><h2>Attachments</h2></label>
                                                
                                            </div>
                                        </div>



                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientDescription">Description</label>
                                                <Field name="clientDescription" type="text" value={values.clientDescription} onChange={handleChange} className={'form-control' + (errors.clientDescription && touched.clientDescription ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientDescription" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>


                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientType">Type</label>
                                                <Field name="clientType" type="text" value={values.clientType} onChange={handleChange} className={'form-control' + (errors.clientType && touched.clientType ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientType" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>


                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientAttachment">Attachment</label>
                                                <Field name="clientAttachment" type="text" value={values.clientAttachment} onChange={handleChange} className={'form-control' + (errors.clientAttachment && touched.clientAttachment ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientAttachment" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientRemarks">Remarks</label>
                                                <Field name="clientRemarks" type="text" value={values.clientRemarks} onChange={handleChange} className={'form-control' + (errors.clientRemarks && touched.clientRemarks ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientRemarks" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                    </div>

                                    <div><hr></hr></div>

                                    <div className="row pr-3 pl-3">

                                            <div className=" col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label><h2>Contacts</h2></label>
                                                    
                                                </div>
                                            </div>


                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientCoName">Name</label>
                                                <Field name="clientCoName" type="text" value={values.clientCoName} onChange={handleChange} className={'form-control' + (errors.clientCoName && touched.clientCoName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientCoName" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientCoDesignation">Designation</label>
                                                <Field name="clientCoDesignation" type="text" value={values.clientCoDesignation} onChange={handleChange} className={'form-control' + (errors.clientCoDesignation && touched.clientCoDesignation ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientCoDesignation" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientCoContactNo">Contact No</label>
                                                <Field name="clientCoContactNo" type="text" value={values.clientCoContactNo} onChange={handleChange} className={'form-control' + (errors.clientCoContactNo && touched.clientCoContactNo ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientCoContactNo" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientCoEmailAddress">Email Address</label>
                                                <Field name="clientCoEmailAddress" type="text" value={values.clientCoEmailAddress} onChange={handleChange} className={'form-control' + (errors.clientCoEmailAddress && touched.clientCoEmailAddress ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientCoEmailAddress" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientCoOCD">Other Contact Details</label>
                                                <Field name="clientCoOCD" type="text" value={values.clientCoOCD} onChange={handleChange} className={'form-control' + (errors.clientCoOCD && touched.clientCoOCD ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientCoOCD" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                    </div><div><hr></hr></div>

                                    <div className="row pr-3 pl-3">

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label><h2>Entity</h2></label>
                                                
                                            </div>
                                        </div>


                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientEnName">Name</label>
                                                <Field name="clientEnName" type="text" value={values.clientEnName} onChange={handleChange} className={'form-control' + (errors.clientEnName && touched.clientEnName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientEnName" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>



                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientEnAddress">Address</label>
                                                <Field name="clientEnAddress" type="text" value={values.clientEnAddress} onChange={handleChange} className={'form-control' + (errors.clientEnAddress && touched.clientEnAddress ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientEnAddress" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientEnTIN">Tax Identification Number</label>
                                                <Field name="clientEnTIN" type="text" value={values.clientEnTIN} onChange={handleChange} className={'form-control' + (errors.clientEnTIN && touched.clientEnTIN ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientEnTIN" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientEnVATNo">VAT No</label>
                                                <Field name="clientEnVATNo" type="text" value={values.clientEnVATNo} onChange={handleChange} className={'form-control' + (errors.clientEnVATNo && touched.clientEnVATNo ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientEnVATNo" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientEnBrg">Buisness Registration No</label>
                                                <Field name="clientEnBrg" type="text" value={values.clientEnBrg} onChange={handleChange} className={'form-control' + (errors.clientEnBrg && touched.clientEnBrg ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientEnBrg" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="clientEnStatus">Status</label>
                                                        <Field name="clientEnStatus" component="select" value={values.clientEnStatus} onChange={handleChange} className={'form-control' + (errors.clientEnStatus && touched.clientEnStatus ? ' is-invalid' : '')} >
                                                            <option value="-"></option>
                                                            <option value="Enable">Enable</option>
                                                            <option value="Disable">Disable</option>
                                                        </Field>
                                                        <ErrorMessage name="clientEnStatus" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientTypeOfExports">Type Of Exports</label>
                                                <Field name="clientTypeOfExports" type="text" value={values.clientTypeOfExports} onChange={handleChange} className={'form-control' + (errors.clientTypeOfExports && touched.clientTypeOfExports ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientTypeOfExports" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="clientExportCat">Export Category</label>
                                                <Field name="clientExportCat" type="text" value={values.clientExportCat} onChange={handleChange} className={'form-control' + (errors.clientExportCat && touched.clientExportCat ? ' is-invalid' : '')} />
                                                <ErrorMessage name="clientExportCat" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                    </div>

                                    </Form>
                                    )}/>
                                    
                                    <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-primary-bridge-close" onClick={this.closeModal} >Cancel</button>
                                                <button type="submit" className="btn btn-primary-bridge">Save </button>
                                            </div>
                                    </div>
                                </Modal>
                                </div>

                                <div className="col-lg-11 table-wraper">
                                        <table className="table table-hover">
                                            <thead className="material-table-th">
                                                <tr>
                                                    <th scope="col">Client ID </th>
                                                    <th scope="col">Client Name</th>
                                                    <th scope="col">Client Address</th>
                                                    <th scope="col">Client Contact Details</th>
                                                    <th scope= "col">VAT</th>
                                                    <th scope="col">TIN</th>
                                                    <th scope="col">Business Registraion Number</th>
                                                    <th scope="col">Contact No</th>
                                                    <th scope= "col">Demurrages Category</th>
                                                    <th scope="col">Notification Type</th>
                                                    <th scope="col">Email Alias</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.clientListOptions}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
        );
        }
    }
export default Client;