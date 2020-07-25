import React, {Component} from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage,  } from 'formik';
import * as Yup from 'yup';
import { URL_BFF, ENDPOINTS } from './config';


class BlTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {

            blID:'',
            blBlType:'',
            blStrategy:'',
            blDescription:'',
            blStatus:'',
            fields:{},
            blTypesTableData: [],


        };
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onEditModeLoadDetail = this.onEditModeLoadDetail.bind(this);

    }
    componentDidMount() {
        fetch(URL_BFF + ENDPOINTS.BL)
        .then(res => res.json())
        .then((data)=> {
            const tableData = data.reduce((acc, cur) => ({ ...acc, [cur.ID]: cur }), {});
            this.setState({blTypesTableData: tableData});
        })
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
            blID:'',
            blBlType:'',
            blStrategy:'',
            blDescription:'',
            blStatus:'',
        });
    }

    onEditModeLoadDetail(event) {
        var Id = event.target.id;
        this.setState({isEditmode : true});
        let url = URL_BFF + ENDPOINTS.BL + '/' + Id;
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                if (data.length !== 0) {
                    if(data) {
                        this.setState ({
                            blID: data.ID,
                            blBlType: data.BlType,
                            blStrategy: data.Strategy,
                            blDescription:data.Description,
                            blStatus: data.Status
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
            METHOD= 'PUT'
            ID = fields.blID;
        }

        fetch(URL_BFF + ENDPOINTS.BL, {
            method: METHOD,
            body:JSON.stringify({
                ID: ID,
                BlTypes: fields.blBlType,
                Strategy: fields.blStrategy,
                Description: fields.blDescription,
                Status: fields.blStatus

            }),
            headers : {
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then(response => {
            this.setState({ isEditmode : false });
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
                            blID: this.state.blID,
                            blBlType: this.state.blBlType,
                            blStrategy: this.state.blStrategy,
                            blDescription: this.state.blDescription,
                            blStatus: this.state.blStatus,
                            //fields:{}
                        }}
                        validationSchema = {Yup.object().shape({
                            blID:Yup.string()
                            .required('ID code is required'),
                            blBlType:Yup.string()
                            .required('Bl type is required'),
                            blStrategy:Yup.string()
                            .required('Strategy field is required'),
                            blDescription:Yup.string()
                            .required("Description is required"),
                            blStatus:Yup.string()
                            .required("Status is required"),
                        })}
                        onSubmit = {fields => {
                                this.onMaterialClick(fields);
                        }}
                        render = {({ values, errors, status, touched, handleChange }) => (
                            <Form>
                                <div className=" col-12 form-box mt-4">   <h3 className="pb-3">B/L Types</h3> </div>
                                <div className = "row pr-3 pl-3">

                                    <div className = "col-6 form-box mt-2">
                                        <div className = "form-group">
                                            <label for="blID">ID</label>
                                            <input type="name" class="form-control readonly " id="" placeholder="Bl Types ID" readOnly ></input>
                                         </div>
                                    </div>

                                    <div className = "col-6 form-box mt-2">
                                        <div className = "form-group">
                                            <label htmlFor = "blBlType">B/L Types</label>
                                            <Field name = "blBlType" type = "text" className = {'form-control' + (errors.blBlType && touched.blBlType?' is-invalid':'')}/>
                                            <ErrorMessage name = "blBlType" component = "div" className = "invalid-feedback"/>
                                        </div>
                                    </div>
                                     
                                     
                                     
                                    <div className = "col-6 form-box mt-2">
                                        <div className = "form-group">
                                            <label htmlFor = "blStrategy">Strategy</label>
                                            <Field name = "blStrategy" type = "text" className = {'form-control' + (errors.blStrategy && touched.blStrategy?' is-invalid':'')}/>
                                            <ErrorMessage name = "blStrategy" component = "div" className = "invalid-feedback"/>
                                        </div>
                                    </div>

                                    <div className = "col-6 form-box mt-2">
                                        <div className = "form-group">
                                            <label htmlFor = "blDescription">Description</label>
                                            <Field name = "blDescription" type = "text" className = {'form-control' + (errors.blDescription && touched.blDescription?' is-invalid':'')}/>
                                            <ErrorMessage name = "blDescription" component = "div" className = "invalid-feedback"/>
                                        </div>
                                    </div>
                                    <div className = "col-6 form-box mt-2">
                                        <div className="form-group">
                                                <label htmlFor="blStatus">Status</label>
                                                        <Field name="blStatus" component="select" className={'form-control' + (errors.blStatus && touched.blStatus ? ' is-invalid' : '')} >
                                                            <option value="-"></option>
                                                            <option value="Yes">Active</option>
                                                            <option value="No">Inactive</option>
                                                        </Field>
                                                        <ErrorMessage name="blStatus" component="div" className="invalid-feedback" />
                                        </div>
                                    </div>
                                    </div>
                                </Form>
                                )}
                                />
                                    <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                    <button type="button" className="btn btn-primary-bridge-close" onClick={this.closeModal}>Cancel</button>
                                                    <button type="submit" className="btn btn-primary-bridge">Save </button>
                                            </div>
                                    </div>
                               
                                
                                </Modal>

                            </div>

                            <div className = "col-lg-11 table-wraper">
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
                                     
                                        {
                                            Object.keys(this.state.blTypesTableData).map(key => (
                                              <tr>
                                                  <td>{key}</td>
                                                  <td>{this.state.blTypesTableData[key].BlTypes}</td>
                                                  <td>{this.state.blTypesTableData[key].Strategy}</td>
                                                  <td>{this.state.blTypesTableData[key].Description}</td>
                                                  <td>{this.state.blTypesTableData[key].Status}</td>
                                                  <td> <button type = "button" id={key}
                                                               className = "btn btn-primary-bridge-close"
                                                               onClick = {this.onEditModeLoadDetail}>Edit B/l Types
                                                  </button></td>
                                              </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>       
            </div>
        </div>
    );
    }
}

export default BlTypes;