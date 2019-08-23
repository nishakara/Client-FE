import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BFF_URL = 'http://localhost:8081/';
const END_POINT = 'supplier';

class Supplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplierlID: 'NEW_SUPPLIER',
            supplierName: '',
            supplierlAddress: '',
            supplierNearestSeaPort: '',
            supplierNearestAirport: '',
            supplierSeaFreightTransitTime: 0,
            supplierAirFreightTransitTime: 0,
            supplierWebsite: '',
            supplierLinkCatalouges: '',
            supplierShippingInstruction: '',
            supplierPaymentTerm: '',
            supplierBank: '',
            supplierTransportMode: '',
            ContectPerson: '',
            ContectTelehphone: '',
            ContectMobile: '',
            ContectEmail: '',
            RowsOpetationType: 0,
            SupplierList: [],
            SupplierContacts: [],
            ContectTableRows: '',
            fields: {}
        };

        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onLoadContact = this.onLoadContact.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChangehandler = this.onChangehandler.bind(this);
        this.onOpenSupplier = this.onOpenSupplier.bind(this);
        this.onAddRow = this.onAddRow.bind(this);
        this.onEditSupplier = this.onEditSupplier.bind(this);
        
    }
   

    loadDropdown = (dropDownType, endPointUrl) => {
        fetch(endPointUrl)
            .then(res => res.json())
            .then((data) => {

                var arrOptions = [];
                for (var k = 0; k < data.length; k++) {
                    switch (dropDownType) {
                        case 'supplier':
                            arrOptions.push(<tr key={k}>
                                <td>{data[k].Name}</td>
                                <td>{data[k].NearestSeaPort}</td>
                                <td>{data[k].NearestAirPort}</td>
                                <td>{data[k].SeaFreightTransitTime}</td>
                                <td>{data[k].AirFreightTransitTime}</td>
                                <td> <button type="button" value={data[k].ID} className="btn btn-primary-bridge-close"   onClick={this.onEditSupplier}>Edit</button></td>
                            </tr>);
                            break;
                        case 'incoterm':
                            arrOptions.push(<option value={data[k].ID}> {data[k].Incoterms} </option>);
                            break;
                        case 'paymentterm':
                            arrOptions.push(<option value={data[k].ID}> {data[k].PaymentTerm} </option>);
                            break;
                        case 'bank':
                            arrOptions.push(<option value={data[k].ID}> {data[k].NAME} </option>);
                            break;
                        default:
                        // code block
                    }
                }

                switch (dropDownType) {
                    case 'supplier':
                        this.setState({ supplierListOptions: arrOptions });
                        break;
                    case 'incoterm':
                        this.setState({ supplierIncotermOptions: arrOptions });
                        break;
                    case 'paymentterm':
                        this.setState({ supplierPaymentTermOptions: arrOptions });
                        break;
                    case 'bank':
                        this.setState({ supplierBankOptions: arrOptions });
                        break;
                    default:

                }
            })
            .catch(console.log)
    }

    onEditSupplier(event) {
        var Id = event.target.value;
        this.setState({ isEditMode: true });

        let url = BFF_URL + END_POINT + '/' + Id;
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                if (data.length !== 0) {
                    if (data) {

                        var arrContacts = [];
                        data.ContactPersons.forEach(eachContact);

                        function eachContact(item, index) {
                            arrContacts.push({ ID: item.ID, Name: item.Name , Telephone: item.Telephone, Mobile: item.Mobile, Email: item.Email })
                        }
                        this.setState({
                            supplierlID: data.ID,             
                            supplierName: data.Name,
                            supplierlAddress: data.Address,
                            supplierNearestSeaPort: data.NearestSeaPort,
                            supplierNearestAirport: data.NearestAirPort,
                            supplierSeaFreightTransitTime: data.SeaTransitTime,
                            supplierAirFreightTransitTime: data.AirTransitTime,
                            supplierWebsite: data.SuppliersWebSite,
                            supplierLinkCatalouges: data.LinkToCatalogues,
                            supplierShippingInstruction: data.ShippingInstruction,
                            supplierIncoterm: data.Incoterm_ID,
                            supplierPaymentTerm: data.PaymentTerm_ID,
                            supplierBank: data.BanksName,
                            supplierTransportMode: data.TransportMode,
                            SupplierContacts : arrContacts
                        });
                        this.openModal();
                    }
                }
            })
            .catch(console.log)
    }

     onAddRow (event) {
        const [contectPerson, contectTelehphone, contectMobile, contectEmail] = event.target.value.split(',');

        if (contectPerson.trim() === '') {
            alert(' Contact person name is required.');
        }

        if (contectTelehphone.trim() === '' && contectMobile.trim() === '' && contectEmail.trim() === '') {
            alert(' Contact midia is required.');
        }

       // if (cowsOpetationType === 0) {
            this.state.SupplierContacts.push({ ID: 'New', Name: contectPerson , Telephone: contectTelehphone, Mobile: contectMobile, Email: contectEmail })

       /*} else if (cowsOpetationType === 1) {
            this.state.SupplierContacts[contectIndex] = { ID: 'New', Name: contectPerson, Telephone: contectTelehphone, Mobile: contectMobile, Email: contectEmail }
     }*/

      var rows =   this.state.SupplierContacts.map((Contect, i) => {
            return (
                <tr >
                    <td>{Contect.ID}</td>
                    <td>{Contect.Name}</td>
                    <td>{Contect.Telephone}</td>
                    <td>{Contect.Mobile}</td>
                    <td>{Contect.Email}</td>
                    <td>
                        <button type="button" className="btn btn-primary-bridge-close" value={i} onClick={() => this.onRemoveRow()}>Remove</button>
                    </td>
                </tr>
            );
        })
        this.setState({ ContectTableRows: rows });
      };
   
    onContactReset() {
        this.setState({
            ContectIndex: 0,
            ContectID: '-',
            ContectPerson: '',
            ContectTelehphone: '',
            ContectMobile: '',
            ContectEmail: ''
        })
    }
    
    onRemoveRow(event) {
       var index =  event.target.value
      //  alert(index);
        this.state.SupplierContacts.splice(index, 1);
        this.onLoadContact();
    }


    onLoadContact() {
        var rows = this.state.SupplierContacts.map((Contect, i) => {
            return (
                <tr >
                    <td>{Contect.ID}</td>
                    <td>{Contect.Name}</td>
                    <td>{Contect.Telephone}</td>
                    <td>{Contect.Mobile}</td>
                    <td>{Contect.Email}</td>
                    <td>
                        <button type="button" className="btn btn-primary-bridge-close" onClick={() => this.onEditClick(Contect, i)}>Edit</button>
                        <button type="button" className="btn btn-primary-bridge-close" onClick={() => this.onRemoveRow()}>Remove</button>
                    </td>
                </tr>
            );
        });

        this.setState({ ContectTableRows: rows });
    }

    onOpenSupplier(ID) {
        alert(ID);
    }
    onEditClick(Contect, index) {
        this.state.RowsOpetationType = 1;
        this.setState({
            ContectsIndex: index,
            ContectsID: Contect.ID,
            ContectPerson: Contect.Name,
            ContectTelehphone: Contect.Telephone,
            ContectMobile: Contect.Mobile,
            ContectEmail: Contect.Email,
            ContectsOpetation: 1
        });
    }
    onChangehandler(event) {
        console.log(event.target.name + ' : ' + event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    componentDidMount() {
        this.loadDropdown(END_POINT, BFF_URL + END_POINT)
        this.loadDropdown('incoterm', BFF_URL + 'incoterm')
        this.loadDropdown('paymentterm', BFF_URL + 'paymentterm')
        this.loadDropdown('bank', BFF_URL + 'bank')
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

    onSubmitClick(fields) {
        alert(fields);
        const Supplier_ID = this.state.supplierlID;
        const METHOD = 'POST'
        if (Supplier_ID !== 'NEW_SUPPLIER') {
            METHOD = 'PUT';
        }
        var arrContacts = [];
        for (var k = 0; k < this.state.SupplierContacts.length; k++) {
            var contact = this.state.SupplierContacts[k];
            arrContacts.push({ Name: contact.name, Telephone: contact.Telephone, Mobile: contact.Mobile, Email: contact.Email });
        }

        fetch(BFF_URL + END_POINT, {
            method: METHOD,
            body: JSON.stringify({
                ID: Supplier_ID,
                Name: fields.supplierName,
                Address: fields.supplierlAddress,
                NearestSeaPort: fields.supplierNearestSeaPort,
                NearestAirPort: fields.supplierNearestAirport,
                SeaTransitTime: fields.supplierSeaFreightTransitTime,
                AirTransitTime: fields.supplierAirFreightTransitTime,
                SuppliersWebSite: fields.supplierWebsite,
                LinkToCatalogues: fields.supplierLinkCatalouges,
                Incoterm_ID: fields.supplierIncoterm,
                BanksName: fields.supplierBank,
                PaymentTerm_ID: fields.supplierPaymentTerm,
                TransportMode: fields.supplierTransportMode,
                ContactPersons: arrContacts
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {

            if (response.status === 200 || response.status === 201) {
                alert('Supplier is success fully saved');
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

                                supplierlID: 'NEW_SUPPLIER',
                                supplierName: '',
                                supplierlAddress: this.state.Address,
                                supplierNearestSeaPort: '',
                                supplierNearestAirport: '',
                                supplierSeaFreightTransitTime: 0,
                                supplierAirFreightTransitTime: 0,
                                supplierWebsite: '',
                                supplierLinkCatalouges: '',
                                supplierShippingInstruction: '',
                                supplierPaymentTerm: '',
                                supplierBank: '',
                                supplierTransportMode: '',
                                ContectPerson: '',
                                ContectTelehphone: '',
                                ContectMobile: '',
                                ContectEmail: ''
                            }}
                            validationSchema={Yup.object().shape({
                                supplierlID: Yup.string()
                                    .required('Supplier ID is required'),
                                supplierName: Yup.string()
                                    .required('Name is required.'),
                                supplierlAddress: Yup.string()
                                    .required('Supplier address is required.'),
                                supplierNearestSeaPort: Yup.string()
                                    .required('Nearest sea port is required.'),
                                supplierNearestAirport: Yup.string()
                                    .required('Nearest air port is required.'),
                                supplierSeaFreightTransitTime: Yup.number()
                                    .required()
                                    .positive()
                                    .integer()
                                    .required('Positive integer value is required for sea transit time'),
                                supplierAirFreightTransitTime: Yup.number()
                                    .required()
                                    .positive()
                                    .integer()
                                    .required('Positive integer value is required for air transit time'),
                                supplierWebsite: Yup.string().nullable()
                                    .url('Web site url required.'),
                                supplierLinkCatalouges: Yup.string()
                                    .required('Please select the supplier'),
                                supplierShippingInstruction: Yup.string().nullable(),
                                supplierPaymentTerm: Yup.string().nullable(),
                                supplierBank: Yup.string().nullable(),
                                supplierTransportMode: Yup.string().nullable(),
                                ContectPerson: Yup.string().nullable(),
                                ContectTelehphone: Yup.string().nullable(),
                                ContectMobile: Yup.string().nullable(),
                                ContectEmail: Yup.string().nullable(),
                            })}

                            onSubmit={fields => {

                                this.onSubmitClick(fields);
                            }}

                            render={({ values, errors, status, touched, handleChange }) => (
                                
                                <Form>
                                     {console.log(`EEEEror --> ${JSON.stringify(errors)}`)}
                                    {console.log(`dsdsdsdsd${JSON.stringify(values)}`)}
                                    <div className="row pr-3 pl-3">
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierlID">Supplier ID</label>
                                                <Field name="supplierlID" type="text" value={values.supplierlID} onChange={handleChange} className={'form-control' + (errors.supplierlID && touched.supplierlID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierlID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierName"> Name</label>
                                                <Field name="supplierName" type="text" value={values.supplierName} onChange={handleChange} className={'form-control' + (errors.supplierName && touched.supplierName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierName" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierlAddress"> Address</label>
                                                <Field name="supplierlAddress" type="text" value={values.supplierlAddress} onChange={handleChange} className={'form-control' + (errors.supplierlAddress && touched.supplierlAddress ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierlAddress" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierNearestSeaPort">Nearest Sea Port</label>
                                                <Field name="supplierNearestSeaPort" type="text" value={values.supplierNearestSeaPort} onChange={handleChange} className={'form-control' + (errors.supplierNearestSeaPort && touched.supplierNearestSeaPort ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierNearestSeaPort" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierNearestAirport">Nearest Air port</label>
                                                <Field name="supplierNearestAirport" type="text" value={values.supplierNearestAirport} onChange={handleChange} className={'form-control' + (errors.supplierNearestAirport && touched.supplierNearestAirport ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierNearestAirport" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierSeaFreightTransitTime">Sea Freight Transit Time</label>
                                                <Field name="supplierSeaFreightTransitTime" type="text" value={values.supplierSeaFreightTransitTime} onChange={handleChange} className={'form-control' + (errors.supplierSeaFreightTransitTime && touched.supplierSeaFreightTransitTime ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierSeaFreightTransitTime" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierAirFreightTransitTime">Air Freight Transit Time</label>
                                                <Field name="supplierAirFreightTransitTime" type="text" value={values.supplierAirFreightTransitTime} onChange={handleChange} className={'form-control' + (errors.supplierAirFreightTransitTime && touched.supplierAirFreightTransitTime ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierAirFreightTransitTime" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierWebsite">Web site</label>
                                                <Field name="supplierWebsite" type="text" value={values.supplierWebsite} onChange={handleChange} className={'form-control' + (errors.supplierWebsite && touched.supplierWebsite ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierWebsite" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierLinkCatalouges"> Catalouge Link</label>
                                                <Field name="supplierLinkCatalouges" type="text" value={values.supplierLinkCatalouges} onChange={handleChange} className={'form-control' + (errors.supplierLinkCatalouges && touched.supplierLinkCatalouges ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierLinkCatalouges" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierShippingInstruction">Shipping Instruction</label>
                                                <Field name="supplierShippingInstruction" type="text" value={values.supplierShippingInstruction} onChange={handleChange} className={'form-control' + (errors.supplierShippingInstruction && touched.supplierShippingInstruction ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierShippingInstruction" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierIncoterm">Incoterm</label>
                                                <Field name="supplierIncoterm" component="select" value={values.supplierIncoterm} onChange={handleChange} className={'form-control' + (errors.supplierIncoterm && touched.supplierIncoterm ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    {this.state.supplierIncotermOptions}
                                                </Field>
                                                <ErrorMessage name="supplierIncoterm" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierPaymentTerm">Payment Term</label>
                                                <Field name="supplierPaymentTerm" component="select" value={values.supplierPaymentTerm} onChange={handleChange} className={'form-control' + (errors.supplierPaymentTerm && touched.supplierPaymentTerm ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    {this.state.supplierPaymentTermOptions}
                                                </Field>
                                                <ErrorMessage name="supplierPaymentTerm" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierBank">Bank</label>
                                                <Field name="supplierBank" component="select" value={values.supplierBank} onChange={handleChange} className={'form-control' + (errors.supplierBank && touched.supplierBank ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    {this.state.supplierBankOptions}
                                                </Field>
                                                <ErrorMessage name="supplierBank" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierTransportMode">Default Transport Mode</label>
                                                <Field name="supplierTransportMode" component="select" value={values.supplierTransportMode} onChange={handleChange} className={'form-control' + (errors.supplierTransportMode && touched.supplierTransportMode ? ' is-invalid' : '')} >
                                                    <option value=""></option>
                                                    <option value="FCL">FCL</option>
                                                    <option value="LCL">LCL</option>
                                                    <option value="AIR"> AIR</option>
                                                    <option value="COURIER">COURIER</option>
                                                    <option value="LOCAL">LOCAL</option>
                                                </Field>
                                                <ErrorMessage name="supplierTransportMode" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-2 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ContectPerson">Contact person</label>
                                                <Field name="ContectPerson" id="ContectPerson" type="text" value={values.ContectPerson} onChange={handleChange} className={'form-control' + (errors.ContectPerson && touched.ContectPerson ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ContectPerson" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-2 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ContectTelehphone">Telephone</label>
                                                <Field name="ContectTelehphone" type="text" value={values.ContectTelehphone} onChange={handleChange} className={'form-control' + (errors.ContectTelehphone && touched.ContectTelehphone ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ContectTelehphone" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-2 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ContectMobile">Mobile</label>
                                                <Field name="ContectMobile" type="text" value={values.ContectMobile} onChange={handleChange} className={'form-control' + (errors.ContectMobile && touched.ContectMobile ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ContectMobile" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="ContectEmail">Email</label>
                                                <Field name="ContectEmail" type="text" value={values.ContectEmail} onChange={handleChange} className={'form-control' + (errors.ContectEmail && touched.ContectEmail ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ContectEmail" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label>Action</label> <br></br>
                                                <button type="button" name="ContectActionButton" value={[values.ContectPerson,values.ContectTelehphone,values.ContectMobile,values.ContectEmail]} onClick={this.onAddRow}>Save</button>
                                                <button type="button" name="ContectActionButton" onClick={this.onContactReset.bind()}>Reset</button>
                                          
                                               </div>
                                        </div>
                                        <div className=" col-12 form-box mt-4">
                                            <table className="table table-hover">
                                                <thead className="material-table-th">
                                                    <tr>
                                                        <th scope="col"> Person</th>
                                                        <th scope="col"> Telephone</th>
                                                        <th scope="col"> Mobile </th>
                                                        <th scope="col"> Email </th>
                                                        <th scope="col"> Edit Delete </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.ContectTableRows}
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
                        <thead className="supplier-table-th">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Sea Port</th>
                                <th scope="col">Air Port</th>
                                <th scope="col">Sea Transit Time</th>
                                <th scope="col">Air Transit Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.supplierListOptions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Supplier;