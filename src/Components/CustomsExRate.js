import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
const { URL_BFF, ENDPOINTS } = require('./config');

class CustomsExRate extends Component {
    constructor(props) {

        super(props);
        this.state = {
            cerCustomsExRateID:'',
            cerCurrency:'',
            cerConversationUnit:'',
            cerHouseCurerency:'',
            cerValueInHC:'',
            cerValidFrom:'',
            cerValidTo:'',
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
                            <td>{data[k].CustomsExRateID }</td>
                            <td>{data[k].Currency }</td>
                            <td>{data[k].ConversationUnit}</td>
                            <td>{data[k].HouseCurerency }</td>
                            <td>{data[k].ValueInHC}</td>
                            <td>{data[k].ValidFrom}</td>
                            <td>{data[k].ValidTo}</td>
                            <td> <button type="button" value={data[k].ID} className="btn btn-primary-bridge-close" onClick={this.onEditModeLoadDetail}>Edit</button></td>
                       
                        </tr>)
                    }
                    this.setState({ cerListOptions: arrOptions });
                })
                .catch(console.log)
        }

        componentDidMount() {

            this.loadDropdown(URL_BFF + ENDPOINTS.CUSTOMSEXCRATE)
        }

        openModal() {
            this.setState({ modalIsOpen: true });
        }
    
        afterOpenModal() {
            // references are now sync'd and can be accessed.
            // this.subtitle.style.color = '#f00';
        }
        closeModal() {
            this.setState({modalIsOpen: false});
            this.setState({
                cerCustomsExRateID:'',
                cerCurrency:'',
                cerConversationUnit:'',
                cerHouseCurerency:'',
                cerValueInHC:'',
                cerValidFrom:'',
                cerValidTo:'',
            });
        }

        onEditModeLoadDetail(event) {
            var Id = event.target.value;
    
            this.setState({isEditMode: true});
    
            let url = URL_BFF + ENDPOINTS.CUSTOMSEXCRATE + '/' + Id;
            fetch(url)
                .then(res => res.json())
                .then((data) => {
    
                    if(data.length !==0) {
                        if(data) {
                            this.setState({
                                cerCustomsExRateID:data.CustomsExRateID,
                                cerCurrency:data.Currency,
                                cerConversationUnit:data.ConversationUnit,
                                cerHouseCurerency:data.HouseCurerency,
                                cerValueInHC:data.ValueInHC,
                                cerValidFrom:data.ValidFrom,
                                cerValidTo:data.ValidTo,
                            });
                            this.setState({isEditMode : true});
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
                ID = fields.cerCustomsExRateID;
            }
    
            fetch(URL_BFF + ENDPOINTS.CUSTOMSEXCRATE, {
                method : METHOD,
                body : JSON.stringify({
                    cerCustomsExRateID : fields.CustomsExRateID,
                    cerCurrency:fields.Currency,
                    cerConversationUnit:fields.ConversationUnit,
                    cerHouseCurerency:fields.HouseCurerency,
                    cerValueInHC:fields.ValueInHC,
                    cerValidFrom:fields.ValidFrom,
                    cerValidTo:fields.ValidTo
                }),
                headers : {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
                this.setState({isEditMode : false});
                if(response.status===200 || response.status ===201) {
                    alert('New Customs Exchange Rate added');
    
                }
                else {
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
                <div className="row pl-5 pt-3">
                     <div className="col-11 form-box mt-2 mb-4">
                            <div className="float-right">
                                <button type="button" onClick={this.openModal} className="btn btn-line-primary-bridge " data-toggle="modal" data-target=".bd-example-modal-lg" >Add Customs Exchange Rate</button>
                            </div>
                     </div>
                
                <div>

                <Modal 
                        isOpen = {this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        ariaHideApp={false}
                        contentLabel="CustomsExRate">

                         <Formik
                            enableReinitialize={true}
                            initialValues={{
                                cerCustomsExRateID : this.state.CustomsExRateID,
                                cerCurrency:this.state.cerCurrency,
                                cerConversationUnit:this.state.cerConversationUnit,
                                cerHouseCurerency:this.state.cerHouseCurerency,
                                cerValueInHC:this.state.cerValueInHC,
                                cerValidFrom:this.state.cerValidFrom,
                                cerValidTo:this.state.cerValidTo,
                                    fields:{}
                            }}
                        validationSchema = {Yup.object().shape({
                            cerCurrency : Yup.string()
                            .required('Currency is required'),
                            cerConversationUnit : Yup.string()
                            .required('Conversation Unit is required'),
                            cerHouseCurerency: Yup.string()
                            .required('House Curerency is required'),
                            cerValueInHC: Yup.string()
                            .required('Value In House Currency is required'),
                            cerValidFrom: Yup.string()
                            .required('Valid From is required'),
                            cerValidTo: Yup.string()
                            .required('Valid To is required'),

                        })}
                        onSubmit={fields => {
                            this.onSubmitClick(fields);
                           }}

                           render = {({values, errors, status, touched, handleChange}) => (
                    
                            <Form>
                                <div className = "col-12 form-box mt-4"><h3 className="pb-3">Customs Exchange Rate</h3> </div>
                                    <div className = "row pr-3 pl-3">

                                        <div className="col-6 form-box mt-2">
                                                            <div className="form-group">
                                                                <label htmlFor="cerCurrency">Currency</label>
                                                                    <Field name="cerCurrency" component="select" value={values.cerCurrency} onChange={handleChange} className={'form-control' + (errors.cerCurrency && touched.cerCurrency ? ' is-invalid' : '')} >
                                                                        <option value="-"></option>
                                                                        <option value=">USD">USD</option>
                                                                        <option value="LKR">LKR</option>
                                                                        <option value="AUD">AUD</option>
                                                                    </Field>
                                                                <ErrorMessage name="cerCurrency" component="div" className="invalid-feedback" />
                                                            </div>
                                        </div>
                                    

                                        <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="cerConversationUnit">Conversational Unit</label>
                                                    <Field name="cerConversationUnit" type="text" value={values.cerConversationUnit} onChange={handleChange} className={'form-control' + (errors.cerConversationUnit && touched.cerConversationUnit ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="cerConversationUnit" component="div" className="invalid-feedback" />
                                                </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                                            <div className="form-group">
                                                                <label htmlFor="cerHouseCurerency">House Curerency</label>
                                                                <Field name="cerHouseCurerency" component="select" value={values.cerHouseCurerency} onChange={handleChange} className={'form-control' + (errors.cerHouseCurerency && touched.cerHouseCurerency ? ' is-invalid' : '')} >
                                                                    <option value="-"></option>
                                                                    <option value=">USD">USD</option>
                                                                    <option value="LKR">LKR</option>
                                                                    <option value="AUD">AUD</option>
                                                                </Field>
                                                                <ErrorMessage name="cerHouseCurerency" component="div" className="invalid-feedback" />
                                                            </div>
                                                
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="cerValueInHC">Value in House Currency</label>
                                                    <Field name="cerValueInHC" type="text" value={values.cerValueInHC} onChange={handleChange} className={'form-control' + (errors.cerValueInHC && touched.cerValueInHC ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="cerValueInHC" component="div" className="invalid-feedback" />
                                                </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="cerValidFrom">Valid From</label>
                                                    <Field name="cerValidFrom" type="text" value={values.cerValidFrom} onChange={handleChange} className={'form-control' + (errors.cerValidFrom && touched.cerValidFrom ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="cerValidFrom" component="div" className="invalid-feedback" />
                                                </div>
                                        </div>

                                        <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="cerValidTo">Valid To</label>
                                                    <Field name="cerValidTo" type="text" value={values.cerValidTo} onChange={handleChange} className={'form-control' + (errors.cerValidTo && touched.cerValidTo ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="cerValidTo" component="div" className="invalid-feedback" />
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
                                                
                                                <th scope="col">Currency</th>
                                                <th scope="col">Conversation Unit</th>
                                                <th scope="col">House Currency</th>
                                                <th scope="col">Value in House Currency</th>
                                                <th scope= "col">Valid From</th>
                                                <th scope= "col">Valid To</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.customsExRateListOptions}
                                        </tbody>
                                </table>
                            </div>
                        </div>
            );
        }
    }

    export default CustomsExRate;