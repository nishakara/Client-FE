import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

var urlMaterialService = 'http://localhost:3010/';
var urlCompanyService = 'http://localhost:3020/';
var Client_ID = '6e65ad20-d576-43f2-95fa-19daf959070d';

class Supplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplierID: '',
            supplierName: '',
            supplierNearestSeaPort: '',
            supplierNearestAirport: '',
            supplierSeaFreightTransitTime: '',
            supplierAirFreightTransitTime: '',
            supplierWebsite: '',
            supplierLinkCatalouges: '',
            supplierShippingInstruction: '',
            fields: {}
        };
        this.onMaterialClick = this.onMaterialClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    loadDropdown = (dropDownType, endPointUrl) => {
        alert(endPointUrl)
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

    componentDidMount() {
        this.loadDropdown('supplier',urlCompanyService + Client_ID + '/supplier')
        this.loadDropdown('incoterm',urlCompanyService + Client_ID + '/incoterm')
        this.loadDropdown('paymentterm',urlCompanyService + Client_ID + '/paymentterm')
        this.loadDropdown('bank',urlCompanyService + Client_ID + '/bank')
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
        if (fields.materialID !== 'NEW_SUPPLIER') {
            METHOD = 'PUT';
            mtID = fields.materialID;
        }
        fetch(urlMaterialService + 'supplier', {
            method: METHOD,
            body: JSON.stringify({
                
                ID: fields.supplierID,
                Name: fields.supplierName,
                NearestSeaPort:  fields.supplierNearestSeaPort,
                NearestAirport:  fields.supplierNearestAirport,
                SeaFreightTransitTime:  fields.supplierSeaFreightTransitTime,
                AirFreightTransitTime:  fields.supplierAirFreightTransitTime,
                Website:  fields.supplierWebsite,
                LinkCatalouges:  fields.supplierLinkCatalouges,

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
                
                                supplierID: '',
                                supplierName: '',
                                supplierlAddress: '',
                                supplierNearestSeaPort: '',
                                supplierNearestAirport: '',
                                supplierSeaFreightTransitTime: 0,
                                supplierAirFreightTransitTime: 0,
                                supplierWebsite: '',
                                supplierLinkCatalouges: '',
                            }}
                            validationSchema={Yup.object().shape({
                                supplierID: Yup.string()
                                    .required('Supplier ID is required'),
                                supplierName: Yup.string()
                                    .required('Supplier name is required.'),
                                supplierlAddress: Yup.string()
                                    .required('Supplier address is required.'),
                                supplierNearestSeaPort: Yup.string()
                                    .required('Supplier nearest sea port is required.'),
                                supplierNearestAirport: Yup.string()
                                    .required('Supplier nearest air port is required.'),
                                supplierSeaFreightTransitTime: Yup.string()
                                    .required('Supplier sea freight transit Time required.'),
                                supplierAirFreightTransitTime: Yup.string()
                                    .required('Supplier air freight transit time'),
                                supplierWebsite: Yup.string()
                                    .required('Please select the client(s)'),
                                supplierLinkCatalouges: Yup.string()
                                    .required('Please select the supplier')
                            })}
                            onSubmit={fields => {
                                this.onMaterialClick(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierlID">Supplier ID</label>
                                                <Field name="supplierlID" type="text" className={'form-control' + (errors.supplierlID && touched.supplierlID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierlID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierlName"> Name</label>
                                                <Field name="supplierlName" type="text" className={'form-control' + (errors.supplierlName && touched.supplierlName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierlName" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierlAddress"> Address</label>
                                                <Field name="supplierlAddress" type="text" className={'form-control' + (errors.supplierlAddress && touched.supplierlAddress ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierlAddress" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierNearestSeaPort">Nearest Sea Port</label>
                                                <Field name="supplierNearestSeaPort" type="text" className={'form-control' + (errors.supplierNearestSeaPort && touched.supplierNearestSeaPort ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierNearestSeaPort" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierNearestAirport">Nearest Air port</label>
                                                <Field name="supplierNearestAirport" type="text" className={'form-control' + (errors.supplierNearestAirport && touched.supplierNearestAirport ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierNearestAirport" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierSeaFreightTransitTime">Sea Freight Transit Time</label>
                                                <Field name="supplierSeaFreightTransitTime" type="text" className={'form-control' + (errors.supplierSeaFreightTransitTime && touched.supplierSeaFreightTransitTime ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierSeaFreightTransitTime" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierAirFreightTransitTime">Air Freight Transit Time</label>
                                                <Field name="supplierAirFreightTransitTime" type="text" className={'form-control' + (errors.supplierAirFreightTransitTime && touched.supplierAirFreightTransitTime ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierAirFreightTransitTime" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierWebsite">Web site</label>
                                                <Field name="supplierWebsite" type="text" className={'form-control' + (errors.supplierWebsite && touched.supplierWebsite ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierWebsite" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierLinkCatalouges"> Catalouge Link</label>
                                                <Field name="supplierLinkCatalouges" type="text" className={'form-control' + (errors.supplierLinkCatalouges && touched.supplierLinkCatalouges ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierLinkCatalouges" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierShippingInstruction">Shipping Instruction</label>
                                                <Field name="supplierShippingInstruction" type="text" className={'form-control' + (errors.supplierShippingInstruction && touched.supplierShippingInstruction ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierShippingInstruction" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierIncoterm">Incoterm</label>
                                                <Field name="supplierIncoterm" component="select" className={'form-control' + (errors.supplierIncoterm && touched.supplierIncoterm ? ' is-invalid' : '')} >
                                                <option value="-"></option>
                                                    {this.state.supplierIncotermOptions}
                                                </Field>
                                                <ErrorMessage name="supplierIncoterm" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierPaymentTerm">Payment Term</label>
                                                <Field name="supplierPaymentTerm" component="select" className={'form-control' + (errors.supplierPaymentTerm && touched.supplierPaymentTerm ? ' is-invalid' : '')} >
                                                <option value="-"></option>
                                                    {this.state.supplierPaymentTermOptions}
                                                </Field>
                                                <ErrorMessage name="supplierPaymentTerm" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierBank">Bank</label>
                                                <Field name="supplierBank" component="select" className={'form-control' + (errors.supplierBank && touched.supplierBank ? ' is-invalid' : '')} >
                                                <option value="-"></option>
                                                    {this.state.supplierBankOptions}
                                                </Field>
                                                <ErrorMessage name="supplierBank" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierTransportMode">Default Transport Mode</label>
                                                <Field name="supplierTransportMode" component="select" className={'form-control' + (errors.supplierTransportMode && touched.supplierTransportMode ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    <option value="FCL">FCL</option>
                                                    <option value="LCL">LCL</option>
                                                    <option value="AIR"> AIR</option>
                                                    <option value="COURIER">COURIER</option>
                                                    <option value="LOCAL">LOCAL</option>
                                                </Field>
                                                <ErrorMessage name="supplierTransportMode" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierTelephone">Telephone</label>
                                                <Field name="supplierTelephone" type="text" className={'form-control' + (errors.supplierTelephone && touched.supplierTelephone ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierTelephone" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierMobile">Mobile</label>
                                                <Field name="supplierMobile" type="text" className={'form-control' + (errors.supplierMobile && touched.supplierMobile ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierMobile" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="supplierEmail">Email</label>
                                                <Field name="supplierEmail" type="text" className={'form-control' + (errors.supplierEmail && touched.supplierEmail ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierEmail" component="div" className="invalid-feedback" />
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