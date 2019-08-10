import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Constent from '../Components/Constant'

var urlMaterialService = Constent.SERVICE_URLS_MATERIAL;
var urlCompanyService = Constent.SERVICE_URLS_COMPANY;
var material_ID = 'NEW_MATERIAL';


class Material extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            materialID: '',
            materialname: '',
            materialisboi: false,
            materialtype: '',
            materialorigin: '',
            materialmesures: '',
            materialcargo: '',
            materialhscode: '',
            materialClients: '',
            materialSupplier: '',
            materialapproval: '',
            materialagreements: '',
            fields: {}
        };
        this.onMaterialClick = this.onMaterialClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    loadDropdown = (dropDownType, endPointUrl) => {
        fetch(endPointUrl)
            .then(res => res.json())
            .then((data) => {

                var arrOptions = [];
                for (var k = 0; k < data.length; k++) {
                    switch (dropDownType) {
                        case 'material':
                            arrOptions.push(<tr key={k}>
                                <td>{data[k].ItemName}</td>
                                <td>{data[k].ItemType}</td>
                                <td>{data[k].ItemOrigin}</td>
                                <td>{data[k].HS_HsCode}</td>
                                <td>{data[k].CargoType}</td>
                                <td>
                                <button type="button"  value={data[k].ID} onClick={this.onEditClick.bind(this, data[k].ID)}  className="btn btn-primary-bridge-close" >Edit</button>
                                </td>
                            </tr>);
                            break;
                        case 'HS':
                            arrOptions.push(<option value={data[k].HsCode}> {data[k].Description} </option>);
                            break;
                        case 'mesure':
                            arrOptions.push(<option value={data[k].ID}> {data[k].Measure} </option>);
                            break;
                        case 'regapproval':
                            arrOptions.push(<option value={data[k].ID}> {data[k].Reference} </option>);
                            break;
                        case 'tradeagreement':
                            arrOptions.push(<option value={data[k].ID}> {data[k].AgreementType} </option>);
                            break;
                        case 'client':
                            arrOptions.push(<option value={data[k].ID}> {data[k].Client} </option>);
                            break;
                        case 'materialtype':
                            arrOptions.push(<option value={data[k].ID}> {data[k].MaterialType} </option>);
                            break;
                        case 'supplier':
                            arrOptions.push(<option value={data[k].ID}> {data[k].Name} </option>);
                            break;

                        default:
                        // code block
                    }
                }

                switch (dropDownType) {
                    case 'material':
                        this.setState({ materialListOptions: arrOptions });
                        break;
                    case 'HS':
                        this.setState({ hsCodesOptions: arrOptions });
                        break;
                    case 'mesure':
                        this.setState({ mesuresOptions: arrOptions });
                        break;
                    case 'regapproval':
                        this.setState({ apprualOptions: arrOptions });
                        break;
                    case 'tradeagreement':
                        this.setState({ agreementOptions: arrOptions });
                        break;
                    case 'client':
                        this.setState({ clientOptions: arrOptions });
                        break;
                    case 'materialtype':
                        this.setState({ materialTypeOptions: arrOptions });
                        break;
                    case 'supplier':
                        this.setState({ supplierOptions: arrOptions });
                        break;
                    default:

                }
            })
            .catch(console.log)
    }

    componentDidMount() {

        this.loadDropdown('material', urlMaterialService + 'material')
        this.loadDropdown('HS', urlMaterialService + 'HS')
        this.loadDropdown('mesure', urlMaterialService + 'mesure')
        this.loadDropdown('regapproval', urlMaterialService + 'regapproval')
        this.loadDropdown('tradeagreement', urlMaterialService + 'tradeagreement')
        this.loadDropdown('client', urlCompanyService + 'client')
        this.loadDropdown('materialtype', urlMaterialService + 'materialtype')
        this.loadDropdown('supplier', urlMaterialService + 'supplier')
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

    onEditClick(id) {
        alert(id);
        material_ID = id;

        if (material_ID !== 'NEW_MATERIAL') {
            fetch(urlMaterialService + 'material/' + material_ID)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                materialName: data.ItemName,
                materialType: data.ItemType,
                materialOrigin: data.ItemOrigin,
                materialMesures: data.UnitOfMeasure_ID,
                materialHSCode: data.HS_HsCode,
                materialApproval: data.RequiredApprovalTypes,
                materialCargo: data.CargoType,
                materialAgreements: data.Trade_Agreement_Type_ID,
                materialIsBoi: data.IsBOI ,
                materialSupplier: data.Supplier_ID,
                materialClients: data.Client_ID
            });
            this.setState({ modalIsOpen: true });
        })
            .catch(console.log)
        }
    }


    handleChange(evt) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }

    onMaterialClick(fields) {
        console.error(fields);
        alert('1--SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
       
        var METHOD = 'POST'
        if (fields.materialID !== 'NEW_MATERIAL') {
            METHOD = 'PUT';
            material_ID = fields.materialID;
        }
        fetch(urlMaterialService + 'material', {
            method: METHOD,
            body: JSON.stringify({
                ID: material_ID,
                ItemName: fields.materialName,
                ItemType: fields.materialType,
                ItemOrigin: fields.materialOrigin,
                UnitOfMeasure_ID: fields.materialMesures,
                HS_HsCode: fields.materialHSCode,
                RequiredApprovalTypes: fields.materialApproval,
                CargoType: fields.materialCargo,
                Trade_Agreement_Type_ID: fields.materialAgreements,
                IsBOI: fields.materialIsBoi,
                IsDeleted: 0,
                IsActive: 1,
                Supplier_ID: fields.materialSupplier,
                Parent_ID: "",
                Client_ID: fields.materialClients,
                CreatedBy: 'TEST USER'
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {

            if (response.status === 200 || response.status === 201) {
                alert('Material is success fully saved');
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
                                materialID: '',
                                materialName: '',
                                materialIsBoi: false,
                                materialType: '',
                                materialOrigin: '',
                                materialMesures: '',
                                materialCargo: '',
                                materialHSCode: '',
                                materialClients: '',
                                materialSupplier: '',
                                materialApproval: '',
                                materialAgreements: ''
                            }}
                            validationSchema={Yup.object().shape({

                                materialName: Yup.string()
                                    .min(6, 'Material name must be at least 6 characters')
                                    .required('Material name is required'),
                                materialType: Yup.string()
                                    .required('Please select the material type.'),
                                materialOrigin: Yup.string()
                                    .required('Please select the country of origin'),
                                materialMesures: Yup.string()
                                    .required('Please select the unit of measure'),
                                materialCargo: Yup.string()
                                    .required('Please select the type of cargo'),
                                materialHSCode: Yup.string()
                                    .required('Please select the HS Code'),
                                materialClients: Yup.string()
                                    .required('Please select the client(s)'),
                                materialSupplier: Yup.string()
                                    .required('Please select the supplier'),
                                materialApproval: Yup.string()
                                    .required('Please select the regulatory approval(s)'),
                                materialAgreements: Yup.string()
                                    .required('Please select the trade agreement(s)')
                            })}
                            onSubmit={fields => {

                                this.onMaterialClick(fields);

                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialID">Material ID</label>
                                                <Field name="materialID" type="text" className={'form-control' + (errors.materialID && touched.materialID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="materialID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialName">Material Name</label>
                                                <Field name="materialName" type="text" className={'form-control' + (errors.materialName && touched.materialName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="materialName" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">

                                            <div className="form-group">
                                                <label htmlFor="materialIsBoi">Is BOI</label>
                                                <Field name="materialIsBoi" type="checkbox" className={'form-control' + (errors.materialIsBoi && touched.materialIsBoi ? ' is-invalid' : '')} />
                                                <ErrorMessage name="materialIsBoi" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialType">Material Type</label>
                                                <Field name="materialType" component="select" className={'form-control' + (errors.materialType && touched.materialType ? ' is-invalid' : '')} >
                                                    {this.state.materialTypeOptions}
                                                </Field>
                                                <ErrorMessage name="materialType" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-6 form-box mt-2">

                                            <div className="form-group">
                                                <label htmlFor="materialOrigin">Material Origin</label>
                                                <Field name="materialOrigin" component="select" className={'form-control' + (errors.materialOrigin && touched.materialOrigin ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    <option value="India">India</option>
                                                    <option value="Germeny">Germeny</option>
                                                    <option value="USA">USA</option>
                                                    <option value="UK">UK</option>
                                                </Field>
                                                <ErrorMessage name="materialOrigin" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialMesures">Unit of Measure</label>
                                                <Field name="materialMesures" component="select" className={'form-control' + (errors.materialMesures && touched.materialMesures ? ' is-invalid' : '')} >
                                                    {this.state.mesuresOptions}
                                                </Field>
                                                <ErrorMessage name="materialMesures" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialCargo">Cargo Type </label>
                                                <Field name="materialCargo" component="select" className={'form-control' + (errors.materialCargo && touched.materialCargo ? ' is-invalid' : '')} >
                                                    <option value="-" defaultValue></option>
                                                    <option value="General">General</option>
                                                    <option value="Dangerous Goods">Dangerous Goods</option>
                                                </Field>
                                                <ErrorMessage name="materialCargo" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialHSCode">HS CODE </label>
                                                <Field name="materialHSCode" component="select" className={'form-control' + (errors.materialHSCode && touched.materialHSCode ? ' is-invalid' : '')} >
                                                    {this.state.hsCodesOptions}
                                                </Field>
                                                <ErrorMessage name="materialHSCode" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialClients">Clients</label>
                                                <Field name="materialClients" component="select" className={'form-control' + (errors.materialClients && touched.materialClients ? ' is-invalid' : '')} >
                                                    {this.state.clientOptions}
                                                </Field>
                                                <ErrorMessage name="materialClients" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialSupplier">Supplier</label>
                                                <Field name="materialSupplier" component="select" className={'form-control' + (errors.materialSupplier && touched.materialSupplier ? ' is-invalid' : '')} >
                                                    {this.state.supplierOptions}
                                                </Field>
                                                <ErrorMessage name="materialSupplier" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialApproval">Regulatory Approval </label>
                                                <Field name="materialApproval" component="select"  className={'form-control' + (errors.materialApproval && touched.materialApproval ? ' is-invalid' : '')} >
                                                    {this.state.apprualOptions}
                                                </Field>
                                                <ErrorMessage name="materialApproval" component="div" className="invalid-feedback" />

                                            </div>
                                        </div>


                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialAgreements">Trade Agreements</label>
                                                <Field name="materialAgreements" component="select" className={'form-control' + (errors.materialAgreements && touched.materialAgreements ? ' is-invalid' : '')} >
                                                    {this.state.agreementOptions}
                                                </Field>
                                                <ErrorMessage name="materialAgreements" component="div" className="invalid-feedback" />
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
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Origin</th>
                                <th scope="col">Hs Code</th>
                                <th scope="col">Cargo Type</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.materialListOptions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Material;