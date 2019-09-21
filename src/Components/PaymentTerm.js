import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { thisExpression } from '@babel/types';
const { URL_BFF, ENDPOINTS } = require('./config');

class PaymentTerm extends Component {

    

    constructor(props) {
        super(props);
        this.state = {
            payTermID : '',
            payTermPaymentTerms : '',
            payTermDue : '',
            payTermDueBasedOn :'',
            payTermStatus : '',
            payTermPaymentTermType :'',
            payTermClient :'',
            payTermSupplier :'',
            isEditMode: false,
            fields : {}
        };

        this.onSubmitClick = this.onSubmitClick.bind(this);
        //this.handleChange = this.handleChange.bind(this);
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
                        <td>{data[k].PaymentTerms}</td>
                        <td>{data[k].Due}</td>
                        <td>{data[k].DueBasedOn}</td>
                        <td>{data[k].Status}</td>
                        <td>{data[k].PaymentTermType}</td>
                        <td>{data[k].Client}</td>
                        <td>{data[k].Supplier}</td>
                        <td> <button type= "button" value= {data[k].ID} className ="btn btn-primary-bridge-close" onClick = {this.onEditModeLoadDetail}>Edit</button></td>
                    </tr>);

                    //break;
                }
                this.setState({payTermCodeListOptions: arrOptions});
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.loadDropdown(URL_BFF + ENDPOINTS.PAYTERM)
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {

    }

    closeModal() {
        this.setState({ modalIsOpen: false});
        this.setState({
            payTermID: '',
            payTermPaymentTerms:'',
            payTermDue:'',
            payTermDueBasedOn:'',
            payTermStatus:'',
            payTermPaymentTermType:'',
            payTermClient:'',
            payTermSupplier:'',
        });
    }

    onEditModeLoadDetail(event) {
        var Id = event.target.value;
        this.setState({ isEditMode: true });

        let url = URL_BFF + ENDPOINTS.PAYTERM + '/' + Id;
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                if(data.length !== 0) {
                    if(data) {
                        this.setState({
                            payTermID : data.ID,
                            payTermPaymentTerms :data.PaymentTerms,
                            payTermDue : data.Due,
                            payTermDueBasedOn : data.DueBasedOn,
                            payTermStatus : data.Status,
                            payTermPaymentTermType : data.PaymentTermType,
                            payTermClient : data.Client,
                            payTermSupplier : data.Supplier
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

           if(this.state.isEditMode === true) {
               METHOD = 'PUT'
               ID = fields.payTermID;
           }

           fetch(URL_BFF + ENDPOINTS.PAYTERM, {
               method : METHOD,
               body : JSON.stringify ({
                   ID : ID,
                   PaymentTerms : fields.payTermPaymentTerms,
                   Due : fields.payTermDue,
                   DueBasedOn :fields.DueBasedOn,
                   Status : fields.Status,
                   PaymentTermType : fields.PaymentTermType,
                   Client : fields.Client,
                   Supplier : fields.Supplier
               }),

               headers : {
                   "Content-type" : "application/json ; charset=UTF-8"
               }

           }).then(response => {
               this.setState({ isEditMode : false});
               if(response.status === 200 || response.status === 201) {
                   alert('New Payment Term Added');
               }else{
                   alert('An error occured while saving please try again');
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
               <div className = "row pl-5 pt-3">
                   <div className = "col-11 form-box mt-2 mb-4">
                       <div className = "float-right">
                           <button type = "button" onClick = {this.openModal} className = "btn btn-line-primary-bridge" data-toggle = "modal" data-target = ".bd-example-modal-lg">Add Payment Term</button>
                        </div>
                    </div>

                    <div>

                   
                        <Modal
                            isOpen = {this.state.modalIsOpen}
                            onAfterOpen = {this.afterOpenModal}
                            onRequestClose = {this.closeModal}
                            ariaHideApp = {false}
                            contentLabel = "Payment Term">

                                <Formik
                                      enableReinitialize={true}
                                      initialValues={{
                                        payTermID : this.state.payTermID,
                                        payTermPaymentTerms : this.state.payTermPaymentTerms,
                                        payTermDue : this.state.payTermDue,
                                        payTermDueBasedOn: this.state.payTermDueBasedOn,
                                        payTermStatus : this.state.payTermStatus,
                                        payPaymentTermType : this.state.payTermPaymentTermType,
                                        payTermClient : this.state.payTermClient,
                                        payTermSupplier : this.state.payTermSupplier,
                                        fields : {}
                                    }}

                                    validationSchema={Yup.object().shape({
                                            payTermID : Yup.string()
                                                .required('Payment Term ID is required'),
                                            payTermPaymentTerms :Yup.string()
                                                .required('Payment Terms is required'),
                                            payTermDue : Yup.string()
                                                .required('Payment Terms Due is required'),
                                            payTermDueBasedOn : Yup.string()
                                                .required('Payment Term Due Based On is required'),
                                            payPaymentTermType : Yup.string()
                                                .required('Payment Term Type is required'),
                                            payTermStatus : Yup.string()
                                                .required('Payment Term Status is required'),
                                            payTermClient : Yup.string()
                                                .required('Payment Term Clinet is required'),
                                            payTermSupplier : Yup.string()
                                                .required('Payment Term Supplier is required')    
                                    })}
                                    onSubmit = {fields => {
                                        this.onSubmitClick(fields);
                                    }}
                                    render = {({ values, errors, status, touched, handleChange }) => (
                                        <Form>
                                            {console.error(errors)}
                                            <div className = "col-12 form-box mt-4"> <h3 className = "pb-3">Payments Terms</h3> </div>
                                                <div className = "row pr-3 pl-3">

                                                <div className="col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="payTermID">ID</label>
                                                        <Field name="payTermID" type="text" className={'form-control' + (errors.payTermID && touched.payTermID ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="payTermID" component="div" className="invalid-feedback" />
                                                    </div>
                                                 </div>

                                                 <div className="col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="payTermPaymentTerms">Payment Term</label>
                                                        <Field name="payTermPaymentTerms" type="text" className={'form-control' + (errors.payTermPaymentTerms && touched.payTermPaymentTerms ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="payTermPaymentTerms" component="div" className="invalid-feedback" />
                                                    </div>
                                                 </div>

                                                 <div className="col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="payTermDue">Due</label>
                                                        <Field name="payTermDue" type="text" className={'form-control' + (errors.payTermDue && touched.payTermDue ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="payTermDue" component="div" className="invalid-feedback" />
                                                    </div>
                                                 </div>

                                                 <div className="col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="payTermDueBasedOn">Due Based On</label>
                                                        <Field name="payTermDueBasedOn" component="select" value={values.payTermClient} onChange={handleChange} className={'form-control' + (errors.payTermDueBasedOn && touched.payTermDueBasedOn ? ' is-invalid' : '')} >
                                                            <option value="-"></option>
                                                            <option value="Active">Invoice Date</option>
                                                            <option value="Inactive">Shipment Onboard Date</option>
                                                        </Field>
                                                        <ErrorMessage name="payTermDueBasedOn" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                 <div className="col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="payTermStatus">Status</label>
                                                        <Field name="payTermStatus" component="select" value={values.payTermStatus} onChange={handleChange} className={'form-control' + (errors.payTermStatus && touched.payTermStatus ? ' is-invalid' : '')} >
                                                            <option value="-"></option>
                                                            <option value="Active">Actve</option>
                                                            <option value="Inactive">Inactive</option>
                                                        </Field>
                                                        <ErrorMessage name="payTermStatus" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="payPaymentTermType">Payment Term Type</label>
                                                        <Field name="payPaymentTermType" component="select" value={values.payPaymentTermType} onChange={handleChange} className={'form-control' + (errors.payPaymentTermType && touched.payPaymentTermType ? ' is-invalid' : '')} >
                                                            <option value="-"></option>
                                                            <option value="LC">LC</option>
                                                            <option value="LCatSite">LC at Site</option>
                                                            <option value="USANCELC">USANCE LC</option>
                                                            <option value="FreeofCharge">Free of Charge</option>
                                                            <option value="AdvancePayment">Advance Payment</option>
                                                            <option value="Credit">Credit</option>
                                                        </Field>
                                                        <ErrorMessage name="payPaymentTermType" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="payTermClient">Client</label>
                                                        <Field name="payTermClient" component="select" value={values.payTermClient} onChange={handleChange} className={'form-control' + (errors.payTermClient && touched.payTermClient ? ' is-invalid' : '')} >
                                                            <option value="-"></option>
                                                            <option value="Active">CLient1</option>
                                                            <option value="Inactive">CLient2</option>
                                                        </Field>
                                                        <ErrorMessage name="payTermClient" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="payTermSupplier">Supplier</label>
                                                        <Field name="payTermSupplier" component="select" value={values.payTermSupplier} onChange={handleChange} className={'form-control' + (errors.payTermSupplier && touched.payTermSupplier ? ' is-invalid' : '')} >
                                                            <option value="-"></option>
                                                            <option value="Active">Sup1</option>
                                                            <option value="Inactive">Sup2</option>
                                                        </Field>
                                                        <ErrorMessage name="payTermSupplier" component="div" className="invalid-feedback" />
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
                                <th scope="col">Payment Terms</th>
                                <th scope="col">Due</th>
                                <th scope="col">Due Based On</th>
                                <th scope="col">Status</th>
                                <th scope="col">Payment Term Type</th>
                                <th scope="col">Client</th>
                                <th scope="col">Supplier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.payTermCodeListOptions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PaymentTerm;