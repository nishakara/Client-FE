import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

var urlMaterialService = 'http://localhost:3010/';
var Client_ID = '6e65ad20-d576-43f2-95fa-19daf959070d';

class HSCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hsHsCode: 'NEW_HS_CODE',
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
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    loadDropdown = (endPointUrl) => {
        fetch(endPointUrl)
            .then(res => res.json())
            .then((data) => {

                var arrOptions = [];
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
                    </tr>);

                }
                this.setState({ hsCodeListOptions: arrOptions });
            })
            .catch(console.log)
    }

    componentDidMount() {

        this.loadDropdown(urlMaterialService + Client_ID + '/hs')
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
        console.error(fields);
        alert('1--SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
        var HS_ID = null;
        var METHOD = 'POST'
        if (fields.hsHsCode !== 'NEW_HS_CODE') {
            METHOD = 'PUT';
            HS_ID = fields.hsHsCode;
        }
        fetch(urlMaterialService + Client_ID + '/hs', {
            method: METHOD,
            body: JSON.stringify({
                HsCode: HS_ID,
                Description: fields.hsDescription,
                Unit: fields.hsUnit,
                GenDuty: fields.hsGenDuty,
                VAT: fields.hsVAT,
                PAL: fields.hsPAL,
                NTB: fields.hsNBT,
                Cess: fields.hsCess,
                Excise: fields.hsExcise,
                SCL: fields.hsSCL,
                MType:fields.Radio
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",'InitiatedBy': 'UAT USER','Client_ID': Client_ID
            }
        }).then(response => {

            if (response.status === 200 || response.status === 201) {
                alert('HS code is success fully saved');
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
            <div className="row pr-3 pl-3">
                <div className="col-11 form-box mt-2 mb-4">
                    <div className="float-right">
                        <button type="button" onClick={this.openModal} className="btn btn-line-primary-bridge " data-toggle="modal" data-target=".bd-example-modal-lg" >Add HSCode</button>
                    </div>
                </div>
                <div>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}

                        contentLabel="HS Code">
                        <Formik
                            initialValues={{
                                hsHsCode: 'NEW_HS_CODE',
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
                                hsSCL: ''
                            }}
                            validationSchema={Yup.object().shape({
                                hsHsCode: Yup.string()
                                    .required('HS code is required'),
                                hsDescription: Yup.string()
                                    .required('boolean  is required'),
                                hsUnit: Yup.string()
                                    .required('Unit is required'),
                                hsCountry: Yup.string()
                                    .required('Country is required'),
                                hsDuty: Yup.string()
                                    .required('Duty is required'),
                                hsGenDuty: Yup.string()
                                    .required('Gen Duty is required'),
                                hsVAT: Yup.string()
                                    .required('VAT is required'),
                                hsPAL: Yup.string()
                                    .required('PAL is required'),
                                hsNBT: Yup.string()
                                    .required('NBT is required'),
                                hsCess: Yup.string()
                                    .required('Cess is required'),
                                hsExcise: Yup.string()
                                    .required('Excise is required'),
                                hsSCL: Yup.string()
                                    .required('SCL is required')
                                })}
                                onSubmit={fields => {
                                    this.onSubmitClick(fields);
                                }}
                                render={({ errors, status, touched }) => (
                                <Form>
                                    <div className=" col-12 form-box mt-4">   <h3 className="pb-3">HS Code</h3>  </div>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="hsHsCode">Hs Code</label>
                                                <Field name="hsHsCode" type="text" className={'form-control' + (errors.hsHsCode && touched.hsHsCode ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsHsCode" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-3 form-box mt-1">
                                            <div className="form-group">
                                                <label htmlFor="hsUnit">Unit</label>
                                                <Field name="hsUnit" type="text" className={'form-control' + (errors.hsUnit && touched.hsUnit ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsUnit" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                        <div className="form-group">
                                                <label htmlFor="hsCountry">Country</label>
                                                <Field name="hsCountry" component="select" className={'form-control' + (errors.hsCountry && touched.hsCountry ? ' is-invalid' : '')} >
                                                    <option value="-"></option>
                                                    <option>Afghanistan</option>
                                                    <option>Albania</option>
                                                    <option>Algeria</option>
                                                    <option>American Samoa</option>
                                                    <option>Andorra</option>
                                                    <option>Angola</option>
                                                    <option>Anguilla</option>
                                                    <option>Antigua</option>
                                                    <option>Argentina</option>
                                                    <option>Armenia</option>
                                                    <option>Aruba</option>
                                                    <option>Australia</option>
                                                    <option>Austria</option>
                                                    <option>Bahamas</option>
                                                    <option>Bahrain</option>
                                                    <option>Bangladesh</option>
                                                    <option>Barbados</option>
                                                    <option>Barbuda</option>
                                                    <option>Belarus</option>
                                                    <option>Belgium</option>
                                                    <option>Belize</option>
                                                    <option>Benin</option>
                                                    <option>Bermuda</option>
                                                    <option>Bhutan</option>
                                                    <option>Bolivia</option>
                                                    <option>Bonaire</option>
                                                    <option>Bosnia-Herzegovina</option>
                                                    <option>Botswana</option>
                                                    <option>Brazil</option>
                                                    <option>British Virgin Islands</option>
                                                    <option>Brunei</option>
                                                    <option>Bulgaria</option>
                                                    <option>Burkina Faso</option>
                                                    <option>Burundi</option>
                                                    <option>Cambodia</option>
                                                    <option>Cameroon</option>
                                                    <option>Canada</option>
                                                    <option>Cape Verde</option>
                                                    <option>Cayman Islands</option>
                                                    <option>Central African Republic</option>
                                                    <option>Chad</option>
                                                    <option>Channel Islands</option>
                                                    <option>Chile</option>
                                                    <option>China</option>
                                                    <option>Colombia</option>
                                                    <option>Congo, The Republic of</option>
                                                    <option>Congo - Brazzaville</option>
                                                    <option>Cook Islands</option>
                                                    <option>Costa Rica</option>
                                                    <option>Croatia</option>
                                                    <option>Curacao</option>
                                                    <option>Cyprus</option>
                                                    <option>Czech Republic</option>
                                                    <option>Denmark</option>
                                                    <option>Djibouti</option>
                                                    <option>Dominica</option>
                                                    <option>Dominican Republic</option>
                                                    <option>Ecuador</option>
                                                    <option>Egypt</option>
                                                    <option>El Salvador</option>
                                                    <option>Equatorial Guinea</option>
                                                    <option>Eritrea</option>
                                                    <option>Estonia</option>
                                                    <option>Ethiopia</option>
                                                    <option>Faroe Islands</option>
                                                    <option>Fiji</option>
                                                    <option>Finland</option>
                                                    <option>France</option>
                                                    <option>French Guiana</option>
                                                    <option>French Polynesia</option>
                                                    <option>Gabon</option>
                                                    <option>Gambia</option>
                                                    <option>Georgia</option>
                                                    <option>Germany</option>
                                                    <option>Ghana</option>
                                                    <option>Gibraltar</option>
                                                    <option>Greece</option>
                                                    <option>Greenland</option>
                                                    <option>Grenada</option>
                                                    <option>Guadeloupe</option>
                                                    <option>Guam</option>
                                                    <option>Guatemala</option>
                                                    <option>Guinea</option>
                                                    <option>Guinea-Bissau</option>
                                                    <option>Guyana</option>
                                                    <option>Haiti</option>
                                                    <option>Honduras</option>
                                                    <option>Honduras</option>
                                                    <option>Hong Kong</option>
                                                    <option>Hungary</option>
                                                    <option>Iceland</option>
                                                    <option>India</option>
                                                    <option>Indonesia</option>
                                                    <option>Iran</option>
                                                    <option>Iraq</option>
                                                    <option>Ireland</option>
                                                    <option>Israel</option>
                                                    <option>Italy</option>
                                                    <option>Ivory coast</option>
                                                    <option>Jamaica</option>
                                                    <option>Japan</option>
                                                    <option>Jordan</option>
                                                    <option>Kazakhstan</option>
                                                    <option>Kenya</option>
                                                    <option>Kiribati</option>
                                                    <option>Kuwait</option>
                                                    <option>Kyrgyzstan</option>
                                                    <option>Laos</option>
                                                    <option>Latvia</option>
                                                    <option>Lebanon</option>
                                                    <option>Lesotho</option>
                                                    <option>Liberia</option>
                                                    <option>Libya</option>
                                                    <option>Liechtenstein</option>
                                                    <option>Lithuania</option>
                                                    <option>Luxembourg</option>
                                                    <option>Macau</option>
                                                    <option>Macedonia</option>
                                                    <option>Madagascar</option>
                                                    <option>Malawi</option>
                                                    <option>Malaysia</option>
                                                    <option>Maldives</option>
                                                    <option>Mali</option>
                                                    <option>Marshall Islands</option>
                                                    <option>Martinique</option>
                                                    <option>Mauritius</option>
                                                    <option>Mexico</option>
                                                    <option>Micronesia</option>
                                                    <option>Moldova</option>
                                                    <option>Monaco</option>
                                                    <option>Mongolia</option>
                                                    <option>Montenegro</option>
                                                    <option>Montserrat</option>
                                                    <option>Morocco</option>
                                                    <option>Mozambique</option>
                                                    <option>Myanmar/Burma</option>
                                                    <option>Namibia</option>
                                                    <option>Nauru</option>
                                                    <option>Nepal</option>
                                                    <option>Netherlands</option>
                                                    <option>Netherlands Antilles</option>
                                                    <option>New Caledonia</option>
                                                    <option>New Zealand</option>
                                                    <option>Nicaragua</option>
                                                    <option>Niger</option>
                                                    <option>Nigeria</option>
                                                    <option>Norway</option>
                                                    <option>Nuie</option>
                                                    <option>Oman</option>
                                                    <option>Pakistan</option>
                                                    <option>Palau</option>
                                                    <option>Panama</option>
                                                    <option>Papua New Guinea</option>
                                                    <option>Paraguay</option>
                                                    <option>Philippines</option>
                                                    <option>Poland</option>
                                                    <option>Portugal</option>
                                                    <option>Puerto Rico</option>
                                                    <option>Qatar</option>
                                                    <option>Reunion</option>
                                                    <option>Romania</option>
                                                    <option>Russia</option>
                                                    <option>Rwanda</option>
                                                    <option>Saba</option>
                                                    <option>Saipan</option>
                                                    <option>Samoa</option>
                                                    <option>Samor</option>
                                                    <option>San Marino</option>
                                                    <option>Saudi Arabia</option>
                                                    <option>Senegal</option>
                                                    <option>Serbia</option>
                                                    <option>Seychelles</option>
                                                    <option>Sierra Leone</option>
                                                    <option>Singapore</option>
                                                    <option>Slovak Republic</option>
                                                    <option>Slovenia</option>
                                                    <option>Solomon Islands</option>
                                                    <option>Somalia</option>
                                                    <option>South Africa</option>
                                                    <option>Spain</option>
                                                    <option>Sri Lanka</option>
                                                    <option>St. Barthelemy</option>
                                                    <option>St. Croix</option>
                                                    <option>St. Eustatius</option>
                                                    <option>St. Kitts and Nevis</option>
                                                    <option>St. Lucia</option>
                                                    <option>St. Maarten/St. Martin</option>
                                                    <option>St. Thomas</option>
                                                    <option>St. Vincent</option>
                                                    <option>Sudan</option>
                                                    <option>Suriname</option>
                                                    <option>Syria</option>
                                                    <option>Taiwan</option>
                                                    <option>Tanzania</option>
                                                    <option>Thailand</option>
                                                    <option>Togo</option>
                                                    <option>Tonga</option>
                                                    <option>Tortola</option>
                                                    <option>Trinidad and Tobago</option>
                                                    <option>Tunisia</option>
                                                    <option>Turkey</option>
                                                    <option>Turkmenistan</option>
                                                    <option>Turks and Caicos Islands</option>
                                                    <option>Tuvalu</option>
                                                    <option>United States</option>
                                                    <option>U.S. Virgin Islands</option>
                                                    <option>Uganda</option>
                                                    <option>Ukraine</option>
                                                    <option>United Arab Emirates</option>
                                                    <option>United Kingdom</option>
                                                    <option>Uruguay</option>
                                                    <option>Uzbekistan</option>
                                                    <option>Vanuatu</option>
                                                    <option>Vatican City</option>
                                                    <option>Venezuela</option>
                                                    <option>Vietnam</option>
                                                    <option>Wallis & Futuna</option>
                                                    <option>Yemen</option>
                                                    <option>Zambia</option>
                                                    <option>Zimbabwe</option>
                                                </Field>
                                                <ErrorMessage name="hsCountry" component="div" className="invalid-feedback" />
                                            </div>
                                            </div>
                                        
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsDescription">Description</label>
                                                <Field name="hsDescription" type="text" className={'form-control' + (errors.hsDescription && touched.hsDescription ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsDescription" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                       
                                        <div className="col-6 form-box mt-2">
                                            
                                        </div>
                                        <div className=" col-12 form-box mt-4">   <h6 className="pb-3">Preferencial Duty</h6>  </div>
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsDuty">Duty</label>
                                                <Field name="hsDuty" type="text" className={'form-control' + (errors.hsDuty && touched.hsDuty ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsDuty" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsGenDuty">Gen Duty</label>
                                                <Field name="hsGenDuty" type="text" className={'form-control' + (errors.hsGenDuty && touched.hsGenDuty ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsGenDuty" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsVAT">VAT</label>
                                                <Field name="hsVAT" type="text" className={'form-control' + (errors.hsVAT && touched.hsVAT ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsVAT" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsPAL">PAL</label>
                                                <Field name="hsPAL" type="text" className={'form-control' + (errors.hsPAL && touched.hsPAL ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsPAL" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsNBT">NBT</label>
                                                <Field name="hsNBT" type="text" className={'form-control' + (errors.hsNBT && touched.hsNBT ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsNBT" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsCess">Cess</label>
                                                <Field name="hsCess" type="text" className={'form-control' + (errors.hsCess && touched.hsCess ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hshsCessPAL" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsExcise">Excise</label>
                                                <Field name="hsExcise" type="text" className={'form-control' + (errors.hsExcise && touched.hsExcise ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsExcise" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="hsSCL">SCL</label>
                                                <Field name="hsSCL" type="text" className={'form-control' + (errors.hsSCL && touched.hsSCL ? ' is-invalid' : '')} />
                                                <ErrorMessage name="hsSCL" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>


                                        <div className="col-6 form-box mt-2">
                                            <label for="exampleFormControlSelect1">Type </label>
                                            <table>
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio" name="Radio" id="weight" value="option1" checked></input>
                                                            <label class="form-check-label" for="value"> Weight</label>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio" name="Radio" id="values" value="option2"></input>
                                                            <label class="form-check-label" for="value">Values</label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio" name="Radio" id="both" value="option3"></input>
                                                            <label class="form-check-label" for="both">Both</label>
                                                        </div>
                                                    </td>
                                                </tr>
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