import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Constent from '../Components/Constant'
const { URL_BFF, ENDPOINTS, HTTP_METHODS } = require('./config');

var material_ID = 'NEW_MATERIAL';

class Material extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            materialID: '',
            materialname: '',
            materialisboi: false,
            materialIsApprovalRequired: '',
            materialApprovals: [],
            materialtype: '',
            materialorigin: '',
            materialmesures: '',
            materialcargo: '',
            materialhscode: '',
            materialClients: '',
            materialSupplier: '',
            materialapproval: '',
            materialagreements: '',
            materialPriority: '',
            addApprovalsSelected:'',
            addApprovalsButtonState:'disabled',
            addApprovalsMessage:'TEST',
            fields: {}
        };
        this.onMaterialClick = this.onMaterialClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.loadAppruals = this.loadAppruals.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.addApprual = this.addApprual.bind(this);
        
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
                                <td>{data[k].Name}</td>
                                <td>{data[k].Origin}</td>
                                <td>{data[k].CargoType}</td>
                                <td>{data[k].HsCodes_ID}</td>
                                <td>{data[k].Measures_ID}</td>
                                <td>
                                    <button type="button" value={data[k].ID} onClick={this.onEditClick.bind(this, data[k].ID)} className="btn btn-primary-bridge-close" >Edit</button>
                                </td>
                            </tr>);
                            break;
                        case 'hscode':
                            arrOptions.push(<option value={data[k].HsCode}> {data[k].Description} </option>);
                            break;
                        case 'mesure':
                            arrOptions.push(<option value={data[k].ID}> {data[k].Measure} </option>);
                            break;
                        case 'regapproval':
                            arrOptions.push(<option value={data[k].ID}> {data[k].TestName} </option>);
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
                        case 'countries':
                            arrOptions.push(<option value={data[k].value}> {data[k].label} </option>);
                            break;
                        default:
                        // code block
                    }
                }

                switch (dropDownType) {
                    case 'material':
                        this.setState({ materialListOptions: arrOptions });
                        break;
                    case 'hscode':
                        this.setState({ hsCodesOptions: arrOptions });
                        break;
                    case 'mesure':
                        this.setState({ mesuresOptions: arrOptions });
                        break;
                    case 'regapproval':
                        this.setState({ approvalsData: data });
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
                    case 'countries':
                        this.setState({ countriesOptions: arrOptions });
                        break;

                    default:

                }
            })
            .catch(console.log)
    }

    componentDidMount() {

        this.loadDropdown(ENDPOINTS.MATERIAL, URL_BFF + ENDPOINTS.MATERIAL)
        this.loadDropdown(ENDPOINTS.HSCODE, URL_BFF + ENDPOINTS.HSCODE)
        this.loadDropdown(ENDPOINTS.MESURE, URL_BFF + ENDPOINTS.MESURE)
        this.loadDropdown(ENDPOINTS.REGAPPROVAL, URL_BFF + ENDPOINTS.REGAPPROVAL)
        this.loadDropdown(ENDPOINTS.TRADE_AGREEMENT, URL_BFF + ENDPOINTS.TRADE_AGREEMENT)
        this.loadDropdown(ENDPOINTS.MATERIAL_TYPE, URL_BFF + ENDPOINTS.MATERIAL_TYPE)
        this.loadDropdown(ENDPOINTS.SUPPLIER, URL_BFF + ENDPOINTS.SUPPLIER)
        this.loadDropdown(ENDPOINTS.COUNTRIES, URL_BFF + ENDPOINTS.COUNTRIES)
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

    handleChangeSelect = (event) => {

        this.setState({ addApprovalsMessage: ''});
        this.setState({ addApprovalsButtonState: 'enabled' });
        for (var k = 0; k < this.state.materialApprovals.length; k++) {
            if(this.state.materialApprovals[k] === event.target.value ){
                this.setState({ addApprovalsMessage: ' this apprual is allready added.'});
                this.setState({ addApprovalsButtonState: 'disabled' });
                return;
            }
        }
        this.setState({ addSelected: event.target.value });
      };
      addApprual = (event) => {
        this.state.materialApprovals.push(this.state.addSelected);
        this.setState({ addSelected: ''});
        this.loadAppruals();
      }
    onEditClick(id) {

        material_ID = id;

        if (material_ID !== 'NEW_MATERIAL') {
            fetch(URL_BFF + ENDPOINTS.MATERIAL + '/' + material_ID)
                .then(res => res.json())
                .then((data) => {
                    this.setState({
                        materialName: data.Name,
                        materialType: data.MaterialType_ID,
                        materialOrigin: data.Origin,
                        materialMesures: data.Measures_ID,
                        materialHSCode: data.HsCodes_ID,
                        materialIsApprovalRequired: data.IsApprovalRequired,
                        materialCargo: data.CargoType,
                        materialIsBoi: data.Priority,
                        materialPriority: data.IsBOI,
                        materialSupplier: data.Supplier_ID,
                        materialClients: data.Client_ID,
                        materialApprovals: data.Approvals,
                        materialAgreements: data.Agreements,
                    });
                    this.loadAppruals();
                    this.setState({ modalIsOpen: true });
                })
                .catch(console.log)
        }
    }
    loadAppruals() {
        var arrOptions = [];
        for (var k = 0; k < this.state.materialApprovals.length; k++) {

            var appruals = this.state.approvalsData;
            for (var i = 0; i < appruals.length; i++) {
                if (appruals[i].ID === this.state.materialApprovals[k]) {
                    arrOptions.push(<tr key={k}>
                        <td>{appruals[i].TestName}</td>
                        <td>{appruals[i].Institute}</td>
                        <td>
                            <button type="button" value={appruals[i]} className="btn btn-primary-bridge-close" >Remove</button>
                        </td>
                    </tr>);
                }
            }
        }
        arrOptions.push(
        <tr key={300}>
            <td>      
            <select onChange={this.handleChangeSelect} value={this.state.addSelected}>
            <option value=""></option>
            {this.state.apprualOptions}
            </select>
            </td>
            <td> {this.state.addApprovalsMessage}</td>
            <td><button type="button" name="addButton" onChange={this.addApprual} disabled={!this.state.addApprovalsButtonState}>Add</button></td>
        </tr>);
        this.setState({ apprualsRows: arrOptions });
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
        fetch(URL_BFF + ENDPOINTS.MATERIAL, {
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
                            enableReinitialize={true}
                            initialValues={{
                                materialID: this.state.materialID,
                                materialName: this.state.materialName,
                                materialIsBoi: false.materialIsBoi,
                                materialType: this.state.materialType,
                                materialOrigin: this.state.materialOrigin,
                                materialMesures: this.state.materialMesures,
                                materialCargo: this.state.materialCargo,
                                materialHSCode: this.state.materialHSCode,
                                materialClients: this.state.materialClients,
                                materialSupplier: this.state.materialSupplier,
                                materialIsApprovalRequired: this.state.materialIsApprovalRequired,
                                materialApproval: this.state.materialApproval,
                                materialAgreements: this.state.materialAgreements,
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
                            render={({ values, errors, status, touched, handleChange }) => (
                                <Form>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialID">Material ID</label>
                                                <Field name="materialID" type="text" value={values.materialID} onChange={handleChange} maxLength={36} className={'form-control' + (errors.materialID && touched.materialID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="materialID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialName">Material Name</label>
                                                <Field name="materialName" type="text" value={values.materialName} onChange={handleChange} maxLength={60} className={'form-control' + (errors.materialName && touched.materialName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="materialName" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="materialType">Material Type</label>
                                                <Field name="materialType" component="select" value={values.materialType} onChange={handleChange} className={'form-control' + (errors.materialType && touched.materialType ? ' is-invalid' : '')} >
                                                    <option value="" defaultValue></option>
                                                    {this.state.materialTypeOptions}
                                                </Field>
                                                <ErrorMessage name="materialType" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">

                                            <div className="form-group">
                                                <label htmlFor="materialOrigin">Material Origin</label>
                                                <Field name="materialOrigin" component="select" value={values.materialOrigin} onChange={handleChange} className={'form-control' + (errors.materialOrigin && touched.materialOrigin ? ' is-invalid' : '')} >
                                                    <option value="" defaultValue></option>
                                                    {this.state.countriesOptions}
                                                </Field>
                                                <ErrorMessage name="materialOrigin" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="materialMesures">Unit of Measure</label>
                                                <Field name="materialMesures" component="select" value={values.materialMesures} onChange={handleChange} className={'form-control' + (errors.materialMesures && touched.materialMesures ? ' is-invalid' : '')} >
                                                    <option value="" defaultValue></option>
                                                    {this.state.mesuresOptions}
                                                </Field>
                                                <ErrorMessage name="materialMesures" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">

                                            <div className="form-group">
                                                <label htmlFor="materialIsApprovalRequired">Is Approval Required</label>
                                                <Field name="materialIsApprovalRequired" component="select" value={values.materialIsApprovalRequired} onChange={handleChange} className={'form-control' + (errors.materialIsApprovalRequired && touched.materialIsApprovalRequired ? ' is-invalid' : '')} >
                                                    <option value=""></option>
                                                    <option value="0">Not Required</option>
                                                    <option value="1">Required</option>
                                                </Field>
                                                <ErrorMessage name="materialIsApprovalRequired" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="materialCargo">Cargo Type </label>
                                                <Field name="materialCargo" component="select" value={values.materialCargo} onChange={handleChange} className={'form-control' + (errors.materialCargo && touched.materialCargo ? ' is-invalid' : '')} >
                                                    <option value="" defaultValue></option>
                                                    <option value="General">General</option>
                                                    <option value="Dangerous Goods">Dangerous Goods</option>
                                                </Field>
                                                <ErrorMessage name="materialCargo" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-3 form-box mt-1">

                                            <div className="form-group">
                                                <label htmlFor="materialIsBoi">Is BOI</label>
                                                <Field name="materialIsBoi" type="checkbox" value={values.materialIsBoi} onChange={handleChange} className={'form-control' + (errors.materialIsBoi && touched.materialIsBoi ? ' is-invalid' : '')} />
                                                <ErrorMessage name="materialIsBoi" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="materialSupplier">Supplier</label>
                                                <Field name="materialSupplier" component="select" value={values.materialSupplier} onChange={handleChange} className={'form-control' + (errors.materialSupplier && touched.materialSupplier ? ' is-invalid' : '')} >
                                                    <option value="" defaultValue></option>
                                                    {this.state.supplierOptions}
                                                </Field>
                                                <ErrorMessage name="materialSupplier" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-3 form-box mt-3">
                                            <div className="form-group">
                                                <label htmlFor="materialHSCode">HS CODE </label>
                                                <Field name="materialHSCode" component="select" value={values.materialHSCode} onChange={handleChange} className={'form-control' + (errors.materialHSCode && touched.materialHSCode ? ' is-invalid' : '')} >
                                                    <option value="" defaultValue></option>
                                                    {this.state.hsCodesOptions}
                                                </Field>
                                                <ErrorMessage name="materialHSCode" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="materialCargo">Priority </label>
                                                <Field name="materialCargo" component="select" value={values.materialCargo} onChange={handleChange} className={'form-control' + (errors.materialCargo && touched.materialCargo ? ' is-invalid' : '')} >
                                                    <option value="" defaultValue></option>
                                                    <option value="High">High</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </Field>
                                                <ErrorMessage name="materialCargo" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-3 form-box mt-1"></div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <table className="table table-hover">
                                                    <thead className="material-table-th">
                                                        <tr>
                                                            <th scope="col">Test Name</th>
                                                            <th scope="col">Institute</th>

                                                            <th scope="col">Action</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.apprualsRows}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <div className="form-group">
                                                    <table className="table table-hover">
                                                        <thead className="material-table-th">
                                                            <tr>
                                                                <th scope="col">Test Name</th>
                                                                <th scope="col">Institute</th>
                                                                <th scope="col">Action</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                        </tbody>
                                                    </table>
                                                </div>
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