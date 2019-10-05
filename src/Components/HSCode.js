import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select'

var BFF_URL = 'http://localhost:8081/';
let END_POINT = 'hscode';

class HSCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
          };
        this.state = {
            hsHsCode: '',
            hsDescription: '',
            hsUnit: '',
            hsCountry: '',
            hsDuty: '',
            hsGenDuty: '',
            hsVAT: '',
            hsPAL: '',
            hsNBT: '',
            hsCess: '',
            hsExcise: '',
            hsSCL: '',
            fields: {}
        };
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onEditModeLoadDetail = this.onEditModeLoadDetail.bind(this);

    }

    loadDropdown = (endPointUrl) => {
        let url = BFF_URL + endPointUrl;
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                var arrOptions = [];
                if (endPointUrl === END_POINT) {
                    for (var k = 0; k < data.length; k++) {
                        arrOptions.push(<tr key={k}>
                            <td>{data[k].HsCode}</td>
                            <td>{data[k].Description}</td>
                            <td>{data[k].Unit}</td>
                            <td>{data[k].GenDuty}</td>
                            <td>{data[k].VAT}</td>
                            <td>{data[k].PAL}</td>
                            <td>{data[k].NTB}</td>
                            <td>{data[k].Cess}</td>
                            <td>{data[k].Excise}</td>
                            <td>{data[k].SCL}</td>
                            <td>{data[k].MType}</td>
                            <td> <button type="button" value={data[k].HsCode} className="btn btn-primary-bridge-close" onClick={this.onEditModeLoadDetail}>Edit</button></td>
                        </tr>);
                    }

                    this.setState({ hsCodeList: data });
                    this.setState({ hsCodeListOptions: arrOptions });
                } else if (endPointUrl === 'countries') {
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            arrOptions.push(<option value={key}> {data[key]} </option>);
                        }
                    }
                    this.setState({ countryCodeOptions: data });
                }
            })
            .catch(console.log)
    }
    handleClick(item) {
    }
    componentDidMount() {
        this.loadDropdown('countries');
        this.loadDropdown(END_POINT);
    }


    onEditModeLoadDetail(event) {
        var Id = event.target.value;

        this.setState({ isEditMode: true });

        var listOfcountries = this.state.countryCodeOptions;
        let url = BFF_URL + END_POINT + '/' + Id;
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                if (data.length !== 0) {
                    if (data) {

                        var arrCountrylist = [];
                        data.Countries.forEach(eachCountry);

                        function eachCountry(item, index) {
                            var code = item;
                            listOfcountries.forEach(eachValue);
                            function eachValue(item, index) {
                                if (code === item.value) {
                                    arrCountrylist.push(item)
                                }
                            }
                        }

                        this.setState({
                            hsHsCode: data.HsCode,
                            hsDescription: data.Description,
                            hsUnit: data.Unit,
                            hsDuty: data.GenDuty,
                            hsGenDuty: data.GenDuty,
                            hsVAT: data.VAT,
                            hsPAL: data.PAL,
                            hsNBT: data.NTB,
                            hsCess: data.Cess,
                            hsExcise: data.Excise,
                            hsSCL: data.SCL,
                            hsCountry: arrCountrylist
                        });
                        this.openModal();
                    }
                }
            })
            .catch(console.log)
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
            hsHsCode: '',
            hsDescription: '',
            hsUnit: '',
            hsCountry: '',
            hsDuty: '',
            hsGenDuty: '',
            hsVAT: '',
            hsPAL: '',
            hsNBT: '',
            hsCess: '',
            hsExcise: '',
            hsSCL: '',
        });
    }

   /* handleChange = hsCountry => {
        this.setState({ hsCountry });
        console.log(`Option selected:`, hsCountry);
    };
    */
    handleChange(event) {
        this.setState({value: event.target.value});
      }

    onSubmitClick(fields) {

        var arrCounties = [];
        var i;
        for (i = 0; i < this.state.hsCountry.length; i++) {
            arrCounties.push(this.state.hsCountry[i].value);
        }

        var METHOD = 'POST'

        if (this.state.isEditMode === true) {
            METHOD = 'PUT'
        }

        fetch(BFF_URL + END_POINT, {
            method: METHOD,
            body: JSON.stringify({
                HsCode: fields.hsHsCode,
                Description: fields.hsDescription,
                Unit: fields.hsUnit,
                GenDuty: fields.hsGenDuty,
                VAT: fields.hsVAT,
                PAL: fields.hsPAL,
                NTB: fields.hsNBT,
                Cess: fields.hsCess,
                Excise: fields.hsExcise,
                SCL: fields.hsSCL,
                MType: fields.Radio,
                Countries: arrCounties
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8", 'InitiatedBy': 'UAT USER'
            }
        }).then(response => {
            this.setState({ isEditMode: false });
            if (response.status === 200 || response.status === 201) {
                alert('HS code is success fully saved');
            } else {
                alert('An error occurred while saving, please try again');
            }
            this.closeModal();
            return;
        }).then(json => {
            this.setState({
                user: json
            });
        });
    }

    render() {

        return (
        <div className="row pr-3 pl-3">
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
                        ariaHideApp={false}
                        contentLabel="HS Code">
                        <Formik
                         enableReinitialize={true}
                             initialValues={{
                                   hsHsCode: this.state.hsHsCode,
                                    hsDescription: this.state.hsDescription,
                                    hsUnit: this.state.hsUnit,
                                    hsCountry: this.state.hsCountry,
                                    hsDuty: this.state.hsDuty,
                                    hsGenDuty: this.state.hsGenDuty,
                                    hsVAT: this.state.hsVAT,
                                    hsPAL: this.state.hsPAL,
                                    hsNBT: this.state.hsNBT,
                                    hsCess: this.state.hsCess,
                                    hsExcise: this.state.hsExcise,
                                    hsSCL: this.state.hsSCL
                                }}
                            validationSchema={Yup.object().shape({
                                hsHsCode: Yup.string()
                                    .required('HS code is required'),
                                hsDescription: Yup.string()
                                    .required('boolean  is required'),
                                hsUnit: Yup.string()
                                    .required('Unit is required'),
                                /* hsCountry: Yup.string()
                                     .required('Country is required'),*/
                                hsDuty: Yup.string()
                                    .required('Duty is required'),
                                hsGenDuty: Yup.number()
                                    .required('Gen Duty is required'),
                                hsVAT: Yup.number()
                                    .required('VAT is required'),
                                hsPAL: Yup.number()
                                    .required('PAL is required'),
                                hsNBT: Yup.number()
                                    .required('NBT is required'),
                                hsCess: Yup.number()
                                    .required('Cess is required'),
                                hsExcise: Yup.number()
                                    .required('Excise is required'),
                                hsSCL: Yup.number()
                                    .required('SCL is required')
                            })}
                            onSubmit={fields => {
                                this.onSubmitClick(fields);
                            }}
                            render={({ values, errors, status, touched, handleChange }) => (

                                <Form>
                                    <div className=" col-12 form-box mt-4">   <h3 className="pb-3">HS Code</h3>  </div>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="hsHsCode">Hs Code</label>
                                                <Field name="hsHsCode" type="text" value={values.hsHsCode} onChange={handleChange} className={'form-control' + (errors.hsHsCode && touched.hsHsCode ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsHsCode" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="hsUnit">Unit</label>
                                                <Field name="hsUnit" type="text" value={values.hsUnit} onChange={handleChange} className={'form-control' + (errors.hsUnit && touched.hsUnit ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsUnit" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsCountry">Country</label>
                                                <Select name="hsCountry" value={values.hsCountry} onChange={handleChange} isMulti={true} options={this.state.countryCodeOptions} />
                                                <ErrorMessage name="hsCountry" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsDescription">Description</label>
                                                <Field name="hsDescription" value={values.hsDescription} onChange={handleChange} type="text" className={'form-control' + (errors.hsDescription && touched.hsDescription ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsDescription" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>


                                        <div className="col-6 form-box mt-2">

                                        </div>
                                        <div className=" col-12 form-box mt-4">   <h6 className="pb-3">Preferencial Duty</h6>  </div>
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsDuty">Duty</label>
                                                <Field name="hsDuty" type="text" value={values.hsDuty} onChange={handleChange} className={'form-control' + (errors.hsDuty && touched.hsDuty ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsDuty" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsGenDuty">Gen Duty</label>
                                                <Field name="hsGenDuty" type="text" value={values.hsGenDuty} onChange={handleChange} className={'form-control' + (errors.hsGenDuty && touched.hsGenDuty ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsGenDuty" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsVAT">VAT</label>
                                                <Field name="hsVAT" type="text" value={values.hsVAT} onChange={handleChange} className={'form-control' + (errors.hsVAT && touched.hsVAT ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsVAT" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsPAL">PAL</label>
                                                <Field name="hsPAL" type="text" value={values.hsPAL} onChange={handleChange} className={'form-control' + (errors.hsPAL && touched.hsPAL ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsPAL" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsNBT">NBT</label>
                                                <Field name="hsNBT" type="text" value={values.hsNBT} onChange={handleChange} className={'form-control' + (errors.hsNBT && touched.hsNBT ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsNBT" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsCess">Cess</label>
                                                <Field name="hsCess" type="text" value={values.hsCess} onChange={handleChange} className={'form-control' + (errors.hsCess && touched.hsCess ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hshsCessPAL" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsExcise">Excise</label>
                                                <Field name="hsExcise" type="text" value={values.hsExcise} onChange={handleChange} className={'form-control' + (errors.hsExcise && touched.hsExcise ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsExcise" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsSCL">SCL</label>
                                                <Field name="hsSCL" type="text" value={values.hsSCL} onChange={handleChange} className={'form-control' + (errors.hsSCL && touched.hsSCL ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsSCL" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>


                                        <div className="col-6 form-box mt-2">
                                            <label htmlFor="exampleFormControlSelect1">Type </label>
                                            <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="Radio" id="weight" value="option1" checked></input>
                                                            <label className="form-check-label" htmlFor="value"> Weight</label>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="Radio" id="values" value="option2"></input>
                                                            <label className="form-check-label" htmlFor="value">Values</label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="Radio" id="both" value="option3"></input>
                                                            <label className="form-check-label" htmlFor="both">Both</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-primary-bridge-close" onClick={this.closeModal} >Close</button>
                                                <button type="submit" className="btn btn-primary-bridge">Save </button>
                                            </div>
                                        </div>

                                    </div>

                                </Form>

                            )
                            }
                        />
                    </Modal>

                </div>
                <div className="col-lg-11 table-wraper">
                    <table className="table table-hover">
                        <thead className="material-table-th">
                            <tr>
                                <th scope="col">Hs Code</th>
                                <th scope="col">Description</th>
                                <th scope="col">Unit</th>
                                <th scope="col">GenDuty</th>
                                <th scope="col">VAT</th>
                                <th scope="col">PAL</th>
                                <th scope="col">NTB</th>
                                <th scope="col">Cess</th>
                                <th scope="col">Excise</th>
                                <th scope="col">SCL</th>
                                <th scope="col">MType</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.hsCodeListOptions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default HSCode;