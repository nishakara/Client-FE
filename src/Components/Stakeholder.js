import React, {Component} from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import { URL_BFF, ENDPOINTS } from './config';


class Stakeholder extends Component {
    constructor (props) {
        super(props);
        this.state = {
            shID:'',
            shStakeholderName:'',
            shStakeholderType:'',
            shAddress:'',
            shClientName:'',
            shBrg:'',
            shTIN:'',
            shSwiftAddress:'',
            shPaymentsDue:'',
            shName:'',
            shDesignation:'',
            shContactNo:'',
            shEmail:'',
            shContact:'',
            shCompanyName:'',
            shSystemAccess:'',
            shSystemUserName:'',
            shAccessType:'',
            fields :{},
            stakeholderTableData : [],
        };
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onEditModeLoadDetail = this.onEditModeLoadDetail.bind(this);
   
    }    
    componentDidMount() {
       fetch(URL_BFF + ENDPOINTS.STAKEHOLDER)
       .then(res => res.json())
       .then((data)=> {
           this.setState({stakeholderTableData : data});
       })
    }
    openModal() {
        this.setState({modalIsOpen : true });

    }
    afterOpenModal(){

    }
    closeModal() {
        this.setState({modalIsOpen : false});
        this.setState ({
            shID:'',
            shStakeholderName:'',
            shStakeholderType:'',
            shAddress:'',
            shClientName:'',
            shBrg:'',
            shTIN:'',
            shSwiftAddress:'',
            shPaymentsDue:'',
            shName:'',
            shDesignation:'',
            shContactNo:'',
            shEmail:'',
            shContact:'',
            shCompanyName:'',
            
        })

    }

    onEditModeLoadDetail(event) {
        var Id = event.target.id;
        this.setState({isEditMode: true});
        let url = URL_BFF + ENDPOINTS.STAKEHOLDER + '/' + Id;
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                if(data.length !== 0) {
                    if (data) {
                        this.setState({
                            shID: data.ID,
                            StakeholderName:data.StakeholderName,
                            shStakeholderType: data.StakeholderType,
                            shAddress: data.Address,
                            shClientName: data.ClientName,
                            shBrg: data.Brg,
                            shTIN:data.TIN,
                            shSwiftAddress:data.SwiftAddress,
                            shPaymentsDue:data.PaymentDue,
                            shName:data.Name,
                            shDesignation:data.Designation,
                            shContactNo:data.ContactNo,
                            shEmail:data.Email,
                            shContact:data.Contact,
                            shCompanyName:data.CompanyName,
                           
                        });
                        this.setState({isEditMode: true});
                        this.openModal();
                    }
                }
            })
            .catch(console.log)
    }

    handleChange(evt) {
        this.setState({[evt.target.name]:evt.target.value});
    }


onSubmitClick(fields) {
    var ID = null;
    var METHOD = 'POST'

    if (this.state.isEditMode === true) {
        METHOD = 'PUT'
        ID = fields.shID;
    }

    fetch(URL_BFF + ENDPOINTS.STAKEHOLDER, {
        method : METHOD,
        body : JSON.stringify ({
            ID : ID,
            shStakeholderName:'',
            shStakeholderType:'',
            Address:'',
            ClientName:'',
            Brg:'',
            TIN:'',
            SwiftAddress:'',
            PaymentsDue:'',
            Name:'',
            Designation:'',
            ContactNo:'',
            Email:'',
            Contact:'',
            CompanyName:'',

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
            <div className = "row pr-3 pl-3">
                <div className = "col-11 form-box mt-2 mb-4">
                    <div className = "float-right">
                        <button type = "button" onClick = {this.openModal} className="btn btn-line-primary-bridge " data-toggle="modal" data-target=".bd-example-modal-lg" >Add Stakeholder</button>
                    </div>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        ariaHideApp={false}
                        contentLabel="Stakeholder">
                   
                       
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                shStakeholderName:this.state.shStakeholderName,
                                shStakeholderType: this.state.shStakeholderType,
                                shAddress: this.state.shAddress,
                                shClientNames: this.state.shClientName,
                                shBrg: this.state.shBrg,
                                shTIN: this.state.shTIN,
                                shSwiftAddress: this.state.shSwiftAddress,
                                shPaymentsDue: this.state.shPaymentsDue,
                                shName: this.state.shName,
                                shDesignation: this.state.shDesignation,
                                shContactNo:this.state.shContactNo,
                                shEmail: this.state.shEmail,
                                shContact:this.state.shContact,
                                shCompanyName: this.state.shCompanyName,
                               /*
                                shSystemAccess: this.state.SystemAccess,
                                shSystemUserName: this.state.SystemUserName,
                                shAccessType: this.state.AccessType,
                                fields :{}
                                */

                            }}
                            validationSchema={Yup.object().shape({
                                shStakeholderName: Yup.string()
                                .required('Stakeholder Name is required'),
                                shStakeholderType:Yup.string()
                                .required('Stakeholder Type is rquired'),
                                shAddress:Yup.string()
                                .required('Address is required'),
                                shClientName:Yup.string()
                                .required('Client Name is required'),
                                shBrg:Yup.string()
                                .required("Buisness registration Number is required"),
                                shTIN:Yup.string()
                                .required('Tax Identification Number is required'),
                                shSwiftAddress:Yup.string()
                                .required('Swift Address is required'),
                                shPaymentsDue: Yup.string()
                                .required('Payment Due is required'),
                                shName: Yup.string()
                                .required('Name is required'),
                                shDesignation:Yup.string()
                                .required('Designation is required'),
                                shContactNo:Yup.string()
                                .required('Contact No is required'),
                                shEmail:Yup.string()
                                .required('Email Address is required'),
                                shContact:Yup.string()
                                .required('Other contact details is required'),
                                shCompanyName:Yup.string()
                                .required('Company Name is required'),
                               /* shSystemAccess:Yup.string()
                                .required('System Acsess is required'),
                                shSystemUserName:Yup.string()
                                .required('System user name is required'),
                                shAccessType:Yup.string()
                                .required('Access type is required'),
                                */
                            
                            })}
                            onSubmit = {fields => {
                                this.onSubmitClick(fields);
                            }}
                            render = {({values, errors, status, touched, handleChange}) => (
                                <Form>
                                    <div className=" col-12 form-box mt-4">   <h3 className="pb-3">Stakeholder</h3>  </div>
                                    <div className = "row pr-3 pl-3">
                                       
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="shStakeholderName">Stakeholder Name</label>
                                                <Field name="shStakeholderName" type="text" className={'form-control' + (errors.shStakeholderName && touched.shStakeholderName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="shStakeholderName" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className = "col-6 form-box mt-2">
                                            <div className="form-group">
                                                    <label htmlFor="shStakeholderType">Stakeholder Type</label>
                                                    <Field name="shStakeholderType" component="select" className={'form-control' + (errors.shStakeholderType && touched.shStakeholderType ? ' is-invalid' : '')} >
                                                        <option value="-"></option>
                                                        <option value="Shipping Line">Shipping Line</option>
                                                        <option value="Forwarder">Forwarder</option>
                                                        <option value="Customs House Agent">Customs House Agent</option>
                                                        <option value="Bank">Bank</option>
                                                        <option value="Airline">AIrline</option>
                                                    </Field>
                                                    <ErrorMessage name="shStakeholderType" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="shAddress">Address</label>
                                                <Field name="shAddress" type="text" className={'form-control' + (errors.shAddress && touched.shAddress ? ' is-invalid' : '')} />
                                                <ErrorMessage name="shAddress" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="shClientName">Client Name</label>
                                                <Field name="shClientName" type="text" className={'form-control' + (errors.shClientName && touched.shClientName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="shClientName" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="shBrg">Buisness Registration</label>
                                                <Field name="shBrg" type="text" className={'form-control' + (errors.shBrg && touched.shBrg ? ' is-invalid' : '')} />
                                                <ErrorMessage name="shBrg" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="shTIN">TIN</label>
                                                <Field name="shTIN" type="text" className={'form-control' + (errors.shTIN && touched.shTIN ? ' is-invalid' : '')} />
                                                <ErrorMessage name="shTIN" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="shSwiftAddress">Swift Address</label>
                                                <Field name="shSwiftAddress" type="text" className={'form-control' + (errors.shSwiftAddress && touched.shSwiftAddress ? ' is-invalid' : '')} />
                                                <ErrorMessage name="shSwiftAddress" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="shPaymentsDue">Payment Due</label>
                                                <Field name="shPaymentsDue" type="text" className={'form-control' + (errors.shPaymentsDue && touched.shPaymentsDue ? ' is-invalid' : '')} />
                                                <ErrorMessage name="shPaymentsDue" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="shName">Name</label>
                                                <Field name="shName" type="text" className={'form-control' + (errors.shName && touched.shName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="shName" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="shDesignation">Designation</label>
                                                <Field name="shDesignation" type="text" className={'form-control' + (errors.shDesignation && touched.shDesignation ? ' is-invalid' : '')} />
                                                <ErrorMessage name="shDesignation" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="shContactNo">Contact No</label>
                                                <Field name="shContactNo" type="text" className={'form-control' + (errors.shContactNo && touched.shContactNo ? ' is-invalid' : '')} />
                                                <ErrorMessage name="shContactNo" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        

                                        <div className = "col-6 form-box mt-2">
                                            <div className = "form-group">
                                                <label htmlFor = "shEmail">E-mail Address</label>
                                                <Field name = "shEmail" type = "text" className = {'form-control' + (errors.shEmail && touched.shEmail ? ' is-invalid' : '')}/>
                                                <ErrorMessage name = "shEmail" component = "div" className = "invalid-feedback"/>
                                            </div>
                                        </div>

                                        <div className = "col-6 form-box mt-2">
                                            <div className = "form-group">
                                                <label htmlFor = "shContact">Other contact details</label>
                                                <Field name = "shContact" type = "text" className = {'form-control' + (errors.shContact && touched.shContact ? ' is-invalid' : '')}/>
                                                <ErrorMessage name = "shContact" component = "div" className = "invalid-feedback"/>
                                            </div>
                                        </div>

                                        <div className = "col-6 form-box mt-2">
                                            <div className = "form-group">
                                                <label htmlFor = "shCompanyName">Company Name</label>
                                                <Field name = "shCompanyName" type = "text" className = {'form-control' + (errors.shCompanyName && touched.shCompanyName ? ' is-invalid' : '')}/>
                                                <ErrorMessage name = "shCompanyName" component = "div" className = "invalid-feedback"/>
                                            </div>
                                        </div>


                                    </div>
                                </Form>
                            )
                         }
                        />
                                            <div className=" col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <button type="button" className="btn btn-primary-bridge-close" onClick={this.closeModal}>Cancel</button>
                                                    <button type="submit" className="btn btn-primary-bridge">Save </button>
                                                </div>
                                            </div>

                        </Modal>
                     </div> 
                      <div className="col-lg-11 table-wraper">
                      <table className="table table-hover">
                          <thead className="material-table-th">
                              <tr>
                                  <th scope="col">Stakeholder Name</th>
                                  <th scope="col">Stakeholder Type</th>
                                  <th scope="col">Address</th>
                                  <th scope="col">Client Names</th>
                                  <th scope= "col">Buisness Registration</th>
                                  <th scope="col">TIN</th>
                                  <th scope="col">Swift Address</th>
                                  <th scope="col">Payment Due</th>
                              </tr>
                          </thead>
                          <tbody>
                              {this.state.stakeholderTableData.map(tableData => (
                                  <tr>
                                      <td>{tableData.ID}</td>
                                      <td>{tableData.shStakeholderName}</td>
                                      <td>{tableData.shStakeholderType}</td>
                                      <td>{tableData.Address}</td>
                                      <td>{tableData.ClientName}</td>
                                      <td>{tableData.Brg}</td>
                                      <td>{tableData.TIN}</td>
                                      <td>{tableData.SwiftAddress}</td>
                                      <td>{tableData.PaymentsDue}</td>
                                      <td><button type = "button" id={tableData.ID}
                                      className = "btn btn-primary-bridge-close"
                                      onClick = {this.onEditModeLoadDetail}>Edit Stakeholder</button></td>
                                      
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
                     
            </div>
        );
    }
}

export default Stakeholder;