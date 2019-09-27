import React, {Component} from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage,  } from 'formik';
import * as Yup from 'yup';
const { URL_BFF, ENDPOINTS } = require('./config');

//var BFF_URL = 'http://localhost:8081/';
//let END_POINT = 'blType';

class Bltypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            bltypeID:'',
            bltypeType:'',
            bltypeStrategy:'',
            blDescription:'',
            bltypeStatus:'',
            isEditMode: false,
            fields:{}


        };
        this.onSubmitClick = this.onSubmitClick.bind(this);
       // this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onEditModeLoadDetail = this.onEditModeLoadDetail.bind(this);
        //this.loadAppruals = this.loadAppruals.bind(this);
        //this.handleChangeSelect = this.handleChangeSelect.bind(this);
        //this.addApprual = this.addApprual.bind(this);

    }

    loadDropdown = (endPointUrl) => {
        fetch(endPointUrl)
            .then(res => res.json())
            .then((data) => {
console.log("blaaaaaaaa",data);
                var arrOptions = [];
                for (var k = 0; k < data.length; k++) {
                    arrOptions.push(<tr key = {k}>
                        <td>{data[k].ID}</td>
                        <td>{data[k].BlTypes}</td>
                        <td>{data[k].Strategy}</td>
                        <td>{data[k].Description}</td>
                        <td>{data[k].Status}</td>
                        <td> <button type = "button" value= {data[k].ID} className = "btn btn-primary-bridge-close" onClick = {this.onEditModeLoadDetail}>Edit</button></td>
                    </tr>);
                   // break;
                }
                this.setState({blTypeListOptions: arrOptions});

            

            })
            .catch(console.log)
    }

    componentDidMount() {
          console.log(URL_BFF + ENDPOINTS.BLTYPE)
          console.log("didmout")
       this.loadDropdown(URL_BFF + ENDPOINTS.BLTYPE)

       //console.log(URL_BFF + ENDPOINTS.BLTYPE)

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
            bltypeID:'',
            bltypeBlType:'',
            bltypeStrategy:'',
            bltypeDescription:'',
            bltypeStatus:'',
        });
    }

    onEditModeLoadDetail(event) {

        var Id = event.target.value;
        this.setState({isEditmode : true});
        let url = URL_BFF + ENDPOINTS.BLTYPE + '/' + Id;
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                if (data.length !== 0) {
                    if(data) {
                        this.setState ({
                            bltypeID: data.ID,
                            bltypeBlType: data.BlType,
                            bltypeStrategy: data.Strategy,
                            bltypeDescription:data.Description,
                            bltypeStatus: data.Status
                        });
                        this.setState({isEditMode: true});
                        this.openModal();
                    }
                }
            })
            .catch(console.log)
    }

    /*handleChange(evt) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        //this.setState({ [evt.target.name]: evt.target.value });
    }*/

   /* onMaterialClick(fields) {
        console.error(fields);
        alert('1--SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
        var blID = null;
        var METHOD = 'POST'
        if (fields.blBlTypes !== 'NEW_BL_TYPES') {
            METHOD = 'PUT';
            blID = fields.blBlTypes;
        }
        fetch(urlMaterialService + 'bl', {
            method: METHOD,
            body: JSON.stringify({
                ID: fields.blID,
                BlTypes: fields.BlTypes,
                Strategy: fields.Strategy,
                Description: fields.Description,
                Status: fields.Status
    */
/////--
    onSubmitClick(fields) {
        var ID = null;
        var METHOD = 'POST'

        if (this.state.isEditMode === true) {
            METHOD= 'PUT'
            ID = fields.bltypeID;
        }

        fetch(URL_BFF + ENDPOINTS.BLTYPE, {
            method: METHOD,
            body:JSON.stringify({
                ID: ID,
                BlTypes: fields.bltypeBlType,
                Strategy: fields.bltypeStrategy,
                Description: fields.bltypeDescription,
                Status: fields.bltypeStatus

            }),
            headers : {
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then(response => {
            this.setState({ isEditMode : false });
            if (response.status === 200 || response.status === 201) {
                alert('B/L Types is successfully saved');
            }else {
                alert('An error occured while saving please try');
            }
            return;

        } ).then(json=> {
            this.setState({
                user: json
            });
        });
    }

/*
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        
        }).then(response => {
            this.setState({isEditMode : false });
            if (response.status === 200 || response.status === 201) {
                alert('Bl Types is success fully saved');
            }else{
                alert('An error occurred while saving please try again');
            }
            return response.json()
        }).then(json => {
            this.setState({
                user :json
            });
        });

}

*/

render() {
    return(
        <div className= "row pl-5 pt-3">
            <div className = "col-11 form-box mt-2 mb-4">
                <div className = "float-right">
                    <button type = "button" onClick = {this.openModal} className="btn btn-line-primary-bridge " data-toggle="modal" data-target=".bd-example-modal-lg">Add Bl Types</button>
                </div>
            </div>

            <div>
                <Modal
                    isOpen = {this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose = {this.closeModal}
                    ariaHideApp = {false}
                    contentLabel = "Example Modal BL">

                    <Formik 
                        enableReinitialize={true}
                        initialValues = {{
                            bltypeID: this.state.bltypeID,
                            bltypeBlType: this.state.bltypeBlType,
                            bltypeStrategy: this.state.bltypeStrategy,
                            bltypeDescription: this.state.bltypeDescription,
                            bltypeStatus: this.state.bltypeStatus,
                            fields:{}
                        }}
                        validationSchema = {Yup.object().shape({
                            bltypeID:Yup.string()
                            .required('ID code is required'),
                            bltypeBlType:Yup.string()
                            .required('Bl type is required'),
                            bltypeStrategy:Yup.string()
                            .required('Strategy field is required'),
                            bltypeDescription:Yup.string()
                            .required("Description is required"),
                            bltypeStatus:Yup.string()
                            .required("Status is required"),
                        })}
                        onSubmit = {fields => {
                                this.onSubmitClick(fields);
                        }}
                        render = {({ values, errors, status, touched, handleChange }) => (
                            <Form>
                                <div className=" col-12 form-box mt-4">   <h3 className="pb-3">B/L Types</h3>  </div>
                                <div className = "row pr-3 pl-3">

                                    <div className = "col-6 form-box mt-2">
                                        <div className = "form-group">
                                            <label for="bltypeID">ID</label>
                                            <input type="name" class="form-control readonly " id="" placeholder="Bl Types ID" readOnly ></input>
                                         </div>
                                    </div>

                                    <div className = "col-6 form-box mt-2">
                                        <div className = "form-group">
                                            <label htmlFor = "bltypeBlType">B/L Types</label>
                                            <Field name = "bltypeBlType" type = "text" className = {'form-control' + (errors.bltypeBlType && touched.bltypeBlType?' is-invalid':'')}/>
                                            <ErrorMessage name = "bltypeBlType" component = "div" className = "invalid-feedback"/>
                                        </div>
                                    </div>
                                     
                                     
                                     
                                    <div className = "col-6 form-box mt-2">
                                        <div className = "form-group">
                                            <label htmlFor = "bltypeStrategy">Strategy</label>
                                            <Field name = "bltypeStrategy" type = "text" className = {'form-control' + (errors.bltypeStrategy && touched.bltypeStrategy?' is-invalid':'')}/>
                                            <ErrorMessage name = "bltypeStrategy" component = "div" className = "invalid-feedback"/>
                                        </div>
                                    </div>

                                    <div className = "col-6 form-box mt-2">
                                        <div className = "form-group">
                                            <label htmlFor = "bltypeDescription">Description</label>
                                            <Field name = "bltypeDescription" type = "text" className = {'form-control' + (errors.bltypeDescription && touched.bltypeDescription?' is-invalid':'')}/>
                                            <ErrorMessage name = "bltypeDescription" component = "div" className = "invalid-feedback"/>
                                        </div>
                                    </div>
                                    <div className = "col-6 form-box mt-2">
                                        <div className="form-group">
                                                <label htmlFor="bltypeStatus">Status</label>
                                                        <Field name="bltypeStatus" component="select" className={'form-control' + (errors.bltypeStatus && touched.bltypeStatus ? ' is-invalid' : '')} >
                                                            <option value="-"></option>
                                                            <option value="Yes">Active</option>
                                                            <option value="No">Inactive</option>
                                                        </Field>
                                                        <ErrorMessage name="bltypeStatus" component="div" className="invalid-feedback" />
                                        </div>
                                    </div>
                                    </div>
                                </Form>
                                )}
                                />
                                    <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                    <button type="button" className="btn btn-primary-bridge-close" onClick={this.closeModal} >Cancel</button>
                                                    <button type="submit" className="btn btn-primary-bridge">Save </button>
                                            </div>
                                    </div>
                               
                                
                                </Modal>

                            </div>

                            <div className = "col-lg-11 table-wrapper">
                                <table className = "table table-hover">
                                    <thead className = "material-table-th">
                                        <tr>
                                            <th scope = "col">ID</th>
                                            <th scope = "col">B/L Types</th>
                                            <th scope = "col">Release Strategy</th>
                                            <th scope = "col">Description</th>
                                            <th scope = "col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.blTypeListoptions}
                                    </tbody>
                                </table>       
            </div>
        </div>
    );
    }
}

export default Bltypes;