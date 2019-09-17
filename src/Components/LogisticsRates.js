import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const { URL_BFF, ENDPOINTS } = require('./config');

class LogisticsRates extends Component {
    constructor(props){
    
        super(props);
        this.state = {
            lrRateID :'',
            lrRateRef:'',
            lrDescription:'',
            lrClientName:'',
            lrVendorName:'',
            lrSvsChargesDes:'',
            lrAssignment:'',
            lrCurrency:'',
            lrRate:'',
            lrTAXVAT:'',
            lrTAXNBT:'',
            lrTAXWithTax:'',
            lrTAXOther:'',
            lrFCTarifIndex:'',
            lrFCMode:'',
            lrFCType:'',
            lrFCIncoterm:'',
            lrFCTarrifType:'',
            lrFCParticular:'',
            lrFCFromLocation:'',
            lrFCToLocation:'',
            lrFCurrencey:'',
            lrFCRate:'',
            lrFCTaxVAT:'',
            lrFCTaxNBT:'',
            lrFCTaxWitholding:'',
            lrFCTaxOther:'',
            lrFCTransitTime:'',
            lrFCFrequency:'',
            lrFCEFTimeOrigin:'',
            lrFCEFTimeDestination:'',
            lrFCOTarifIndex : '',
            lrFCODescription : '',
            lrFCOMode : '',
            lrFCOIncoterm : '',
            lrFCOTarrifType : '',
            lrFCOParticular : '',
            lrFCOCurrency : '',
            lrFCORate : '',
            lrFCOTaxVAT : '',
            lrFCOTAXNBT : '',
            lrFCOTAXWithholding : '',
            lrFCOTAXOther : '',
            lrCCITarrifIndex :'',
            lrCCIType :'',
            lrCCIMode :'',
            lrCCIParticular :'',
            lrCCITariffType :'',
            lrCCIAssignment :'',
            lrCCICurrency :'',
            lrCCIRate :'',
            lrCCITaxVAT :'',
            lrCCITaxNBT :'',
            lrCCITaxWitholding :'',
            lrCCITaxOther :'',
            lrCCIVTarrifIndex:'',
            lrCCIVType:'',
            lrCCIVMode:'',
            lrCCIVParticular:'',
            lrCCIVTarifType:'',
            lrCCIVCurrency:'',
            lrCCIVRate:'',
            lrCCIVTaxVAT:'',
            lrCCIVTaxNBT:'',
            lrCCIVTaxWithholdin:'',
            lrCCIVTaxOther:'',

            lrLTCMode:'',
            lrLTCType:'',
            lrLTCParticular:'',
            lrLTCFromLocation:'',
            lrLTCToLocation:'',
            lrLTCCurrency:'',
            lrLTCRate:'',
            lrLTCTaxVAT:'',
            lrLTCTaxNBT:'',
            lrLTCTaxWithholdingTax:'',
            lrLTCTaxOther:'',
            lrLTCDeentionFTHours:'',
            lrLTCDetentionCurrency:'',
            lrLTCDefinitionRate:'',
            lrAttachName:'',
            lrAtatchUploadedData:'',
            lrAttachType:'',
            lrAttachVToDate:'',
            lrAttachFToDate:'',

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
                        <td>{data[k].RateID }</td>
                        <td>{data[k].RateRef}</td>
                        <td>{data[k].Description }</td>
                        <td>{data[k].ClientName}</td>
                        <td>{data[k].VendorName}</td>
                        <td>{data[k].SvsChargesDes}</td>
                        <td>{data[k].Assignment }</td>
                        <td>{data[k].Currency}</td>
                        <td>{data[k].Rate }</td>
                        <td>{data[k].TAXVAT }</td>
                        <td>{data[k].TAXNBT}</td>
                        <td>{data[k].TAXWithTax}</td>
                        <td>{data[k].TAXOther}</td>
                        <td>{data[k].FCTarifIndex}</td>
                        <td>{data[k].FCMode}</td>
                        <td>{data[k].FCType}</td>
                        <td>{data[k].FCIncoterm}</td>
                        <td>{data[k].FCTarrifType}</td>
                        <td>{data[k].FCParticular}</td>
                        <td>{data[k].FCFromLocation}</td>
                        <td>{data[k].FCToLocation}</td>
                        <td>{data[k].FCurrencey}</td>
                        <td>{data[k].FCRate}</td>
                        <td>{data[k].FCTaxVAT}</td>
                        <td>{data[k].FCTaxNBT}</td>
                        <td>{data[k].FCTaxWitholding}</td>
                        <td>{data[k].FCTaxOther}</td>
                        <td>{data[k].FCTransitTime}</td>
                        <td>{data[k].FCFrequency}</td>
                        <td>{data[k].FCEFTimeOrigin }</td>
                        <td>{data[k].FCEFTimeDestination}</td>
                        <td>{data[k].FCOTarifIndex}</td>
                        <td>{data[k].FCODescription}</td>
                        <td>{data[k].FCOMode }</td>
                        <td>{data[k].FCOIncoterm}</td>
                        <td>{data[k].FCOTarrifType }</td>
                        <td>{data[k].FCOParticular }</td>
                        <td>{data[k].FCOCurrency}</td>
                        <td>{data[k].FCORate}</td>
                        <td>{data[k].FCOTaxVAT}</td>
                        <td>{data[k].FCOTAXNBT}</td>
                        <td>{data[k].FCOTAXWithholding}</td>
                        <td>{data[k].FCOTAXOther}</td>
                        <td>{data[k].CCITarrifIndex}</td>
                        <td>{data[k].CCIType}</td>
                        <td>{data[k].CCIMode}</td>
                        <td>{data[k].CCIParticular}</td>
                        <td>{data[k].CCITariffType}</td>
                        <td>{data[k].CCIAssignment}</td>
                        <td>{data[k].CCICurrency}</td>
                        <td>{data[k].CCIRate}</td>
                        <td>{data[k].CCITaxVAT}</td>
                        <td>{data[k].CCITaxNBT}</td>
                        <td>{data[k].CCITaxWitholding}</td>
                        <td>{data[k].CCITaxOther}</td>
                        <td>{data[k].CCIVTarrifIndex}</td>
                        <td>{data[k].CCIVType}</td>
                        <td>{data[k].CCIVMode}</td>
                        <td>{data[k].CCIVParticular}</td>
                        <td>{data[k].CCIVTarifType}</td>
                        <td>{data[k].CCIVCurrency}</td>
                        <td>{data[k].CCIVRate}</td>
                        <td>{data[k].CCIVTaxVAT}</td>
                        <td>{data[k].CCIVTaxNBT}</td>
                        <td>{data[k].CCIVTaxWithholdin}</td>
                        <td>{data[k].CCIVTaxOther}</td>


                        <td>{data[k].lrLTCMode}</td>
                        <td>{data[k].lrLTCType}</td>
                        <td>{data[k].lrLTCParticular}</td>
                        <td>{data[k].lrLTCFromLocation}</td>
                        <td>{data[k].lrLTCToLocation}</td>
                        <td>{data[k].lrLTCCurrency}</td>
                        <td>{data[k].lrLTCRate}</td>
                        <td>{data[k].lrLTCTaxVAT}</td>
                        <td>{data[k].lrLTCTaxNBT}</td>
                        <td>{data[k].lrLTCTaxWithholdingTax}</td>
                        <td>{data[k].lrLTCTaxOther}</td>
                        <td>{data[k].lrLTCDeentionFTHours}</td>
                        <td>{data[k].lrLTCDetentionCurrency}</td>
                        <td>{data[k].lrLTCDefinitionRate}</td>
                        <td>{data[k].lrAttachName}</td>
                        <td>{data[k].lrAtatchUploadedData}</td>
                        <td>{data[k].lrAttachType}</td>
                        <td>{data[k].lrAttachVToDate}</td>
                        <td>{data[k].lrAttachFToDate}</td>

                        


                        <td> <button type="button" value={data[k].ID} className="btn btn-primary-bridge-close" onClick={this.onEditModeLoadDetail}>Edit-X</button></td>
                    </tr>);

                }
                this.setState({ LogisticRatestListOptions: arrOptions });
            })
            .catch(console.log)
        }

        componentDidMount() {

            this.loadDropdown(URL_BFF + ENDPOINTS.LOGISTICSRATES)
    
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
            this.setState ({
                lrRateID :'',
                lrRateRef:'',
                lrDescription:'',
                lrClientName:'',
                lrVendorName:'',
                lrSvsChargesDes:'',
                lrAssignment:'',
                lrCurrency:'',
                lrRate:'',
                lrTAXVAT:'',
                lrTAXNBT:'',
                lrTAXWithTax:'',
                lrTAXOther:'',
                lrFCTarifIndex:'',
                lrFCMode:'',
                lrFCType:'',
                lrFCIncoterm:'',
                lrFCTarrifType:'',
                lrFCParticular:'',
                lrFCFromLocation:'',
                lrFCToLocation:'',
                lrFCurrencey:'',
                lrFCRate:'',
                lrFCTaxVAT:'',
                lrFCTaxNBT:'',
                lrFCTaxWitholding:'',
                lrFCTaxOther:'',
                lrFCTransitTime:'',
                lrFCFrequency:'',
                lrFCEFTimeOrigin:'',
                lrFCEFTimeDestination:'',
                lrFCOTarifIndex : '',
                lrFCODescription : '',
                lrFCOMode : '',
                lrFCOIncoterm : '',
                lrFCOTarrifType : '',
                lrFCOParticular : '',
                lrFCOCurrency : '',
                lrFCORate : '',
                lrFCOTaxVAT : '',
                lrFCOTAXNBT : '',
                lrFCOTAXWithholding : '',
                lrFCOTAXOther : '',
                lrCCITarrifIndex :'',
                lrCCIType :'',
                lrCCIMode :'',
                lrCCIParticular :'',
                lrCCITariffType :'',
                lrCCIAssignment :'',
                lrCCICurrency :'',
                lrCCIRate :'',
                lrCCITaxVAT :'',
                lrCCITaxNBT :'',
                lrCCITaxWitholding :'',
                lrCCITaxOther :'',
                lrCCIVTarrifIndex:'',
                lrCCIVType:'',
                lrCCIVMode:'',
                lrCCIVParticular:'',
                lrCCIVTarifType:'',
                lrCCIVCurrency:'',
                lrCCIVRate:'',
                lrCCIVTaxVAT:'',
                lrCCIVTaxNBT:'',
                lrCCIVTaxWithholdin:'',
                lrCCIVTaxOther:'',
                lrLTCMode:'',
                lrLTCType:'',
                lrLTCParticular:'',
                lrLTCFromLocation:'',
                lrLTCToLocation:'',
                lrLTCCurrency:'',
                lrLTCRate:'',
                lrLTCTaxVAT:'',
                lrLTCTaxNBT:'',
                lrLTCTaxWithholdingTax:'',
                lrLTCTaxOther:'',
                lrLTCDeentionFTHours:'',
                lrLTCDetentionCurrency:'',
                lrLTCDefinitionRate:'',
                lrAttachName:'',
                lrAtatchUploadedData:'',
                lrAttachType:'',
                lrAttachVToDate:'',
            });
        }

        onEditModeLoadDetail(event) {
            var Id = event.target.value;
            this.setState({isEditMode:true});
            let url = URL_BFF + ENDPOINTS.LOGISTICSRATES + '/' + Id;
            fetch(url)
                .then(res => res.json())
                .then((data) => {

                    if (data.length !==0) {
                        if(data) {
                            this.setState({
                                lrRateID : data.RateID,
                                lrRateRef:data.RateRef,
                                lrDescription:data.Description,
                                lrClientName:data.ClientName,
                                lrVendorName:data.VendorName,
                                lrSvsChargesDes:data.SvsChargesDes,
                                lrAssignment:data.Assignment,
                                lrCurrency:data.Currency,
                                lrRate:data.Rate,
                                lrTAXVAT:data.TAXVAT,
                                lrTAXNBT:data.TAXNBT,
                                lrTAXWithTax:data.TAXWithTax,
                                lrTAXOther:data.TAXOther,
                                lrFCTarifIndex:data.FCTarifIndex,
                                lrFCMode:data.FCMode,
                                lrFCType:data.FCType,
                                lrFCIncoterm:data.FCIncoterm,
                                lrFCTarrifType:data.FCTarrifType,
                                lrFCParticular:data.FCParticular,
                                lrFCFromLocation:data.FCFromLocation,
                                lrFCToLocation:data.FCToLocation,
                                lrFCurrencey:data.FCurrencey,
                                lrFCRate:data.FCRate,
                                lrFCTaxVAT:data.FCTaxVAT,
                                lrFCTaxNBT:data.FCTaxNBT,
                                lrFCTaxWitholding:data.FCTaxWitholding,
                                lrFCTaxOther:data.FCTaxOther,
                                lrFCTransitTime:data.FCTransitTime,
                                lrFCFrequency:data.FCFrequency,
                                lrFCEFTimeOrigin:data.FCEFTimeOrigin,
                                lrFCEFTimeDestination:data.FCEFTimeDestination,
                                lrFCOTarifIndex : data.FCOTarifIndex,
                                lrFCODescription : data.FCODescription,
                                lrFCOMode : data.FCOMode,
                                lrFCOIncoterm : data.FCOIncoterm,
                                lrFCOTarrifType : data.FCOTarrifType,
                                lrFCOParticular : data.FCOParticular,
                                lrFCOCurrency : data.FCOCurrency,
                                lrFCORate : data.FCORate,
                                lrFCOTaxVAT : data.FCOTaxVAT,
                                lrFCOTAXNBT : data.FCOTAXNBT,
                                lrFCOTAXWithholding : data.FCOTAXWithholding,
                                lrFCOTAXOther : data.FCOTAXOther,
                                lrCCITarrifIndex :data.CCITarrifIndex,
                                lrCCIType :data.CCIType,
                                lrCCIMode :data.CCIMode,
                                lrCCIParticular :data.CCIParticular,
                                lrCCITariffType :data.CCITariffType,
                                lrCCIAssignment :data.CCIAssignment,
                                lrCCICurrency :data.CCICurrency,
                                lrCCIRate :data.CCIRate,
                                lrCCITaxVAT :data.CCITaxVAT,
                                lrCCITaxNBT :data.CCITaxNBT,
                                lrCCITaxWitholding :data.CCITaxWitholding,
                                lrCCITaxOther :data.CCITaxOther,
                                lrCCIVTarrifIndex:data.CCIVTarrifIndex,
                                lrCCIVType:data.CCIVType,
                                lrCCIVMode:data.CCIVMode,
                                lrCCIVParticular:data.CIVParticular,
                                lrCCIVTarifType:data.CCIVTarifType,
                                lrCCIVCurrency:data.CCIVCurrency,
                                lrCCIVRate:data.CCIVRate,
                                lrCCIVTaxVAT:data.CCIVTaxVAT,
                                lrCCIVTaxNBT:data.CCIVTaxNBT,
                                lrCCIVTaxWithholdin:data.CCIVTaxWithholdin,
                                lrCCIVTaxOther:data.CCIVTaxOther,
                                lrLTCMode:data.LTCMode,
                                lrLTCType:data.LTCType,
                                lrLTCParticular:data.LTCParticular,
                                lrLTCFromLocation:data.LTCFromLocation,
                                lrLTCToLocation:data.LTCToLocation,
                                lrLTCCurrency:data.lrLTCCurrency,
                                lrLTCRate:data.lrLTCRate,
                                lrLTCTaxVAT:data.lrLTCTaxVAT,
                                lrLTCTaxNBT:data.LTCTaxNBT,
                                lrLTCTaxWithholdingTax:data.LTCTaxWithholdingTax,
                                lrLTCTaxOther:data.LTCTaxOther,
                                lrLTCDeentionFTHours:data.LTCDeentionFTHours,
                                lrLTCDetentionCurrency:data.LTCDetentionCurrency,
                                lrLTCDefinitionRate:data.LTCDefinitionRate,
                                lrAttachName:data.AttachName,
                                lrAtatchUploadedData:data.AtatchUploadedData,
                                lrAttachType:data.AttachType,
                                lrAttachVToDate:data.AttachVToDate,
                                lrAttachFToDate:data.AttachFToDate,
                            })
                            this.setState({ isEditMode: true });
                            this.openModal();
                        }

                        }
                    })
                    .catch(console.log)
        }
        onSubmitClick(fields) {
            var ID = null;
            var METHOD = 'POST'
    
            if (this.state.isEditMode === true) {
                METHOD = 'PUT'
                ID = fields.lrRateID;
            }
    
    
            fetch(URL_BFF + ENDPOINTS.LOGISTICSRATES, {
                method: METHOD,
                body: JSON.stringify({
                    RateID : fields.RateID,
                    RateRef:fields.RateRef,
                    Description:fields.Description,
                    ClientName:fields.ClientName,
                    VendorName:fields.VendorName,
                    SvsChargesDes:fields.SvsChargesDes,
                    Assignment:fields.Assignment,
                    Currency:fields.Currency,
                    Rate:fields.Rate,
                    TAXVAT:fields.TAXVAT,
                    AXNBT:fields.TAXNBT,
                    TAXWithTax:fields.TAXWithTax,
                    TAXOther:fields.TAXOther,
                    FCTarifIndex:fields.FCTarifIndex,
                    FCMode:fields.FCMode,
                    FCType:fields.FCType,
                    FCIncoterm:fields.FCIncoterm,
                    FCTarrifType:fields.FCTarrifType,
                    FCParticular:fields.incotermIncorterm,
                    FCFromLocation:fields.FCFromLocation,
                    FCToLocation:fields.FCToLocation,
                    FCurrencey:fields.FCurrencey,
                    FCRate:fields.FCRate,
                    FCTaxVAT:fields.FCTaxVAT,
                    FCTaxNBT:fields.FCTaxNBT,
                    FCTaxWitholding:fields.FCTaxWitholding,
                    FCTaxOther:fields.FCTaxOther,
                    FCTransitTime:fields.FCTransitTime,
                    FCFrequency:fields.FCFrequency,
                    FCEFTimeOrigin:fields.FCEFTimeOrigin,
                    FCEFTimeDestination:fields.FCEFTimeDestination,
                    FCOTarifIndex : fields.FCOTarifIndex,
                    FCODescription : fields.FCODescription,
                    FCOMode : fields.FCOMode,
                    FCOIncoterm : fields.FCOIncoterm,
                    FCOTarrifType : fields.FCOTarrifType,
                    FCOParticular : fields.FCOParticular,
                    FCOCurrency : fields.FCOCurrency,
                    FCORate : fields.FCORate,
                    FCOTaxVAT : fields.FCOTaxVAT,
                    FCOTAXNBT : fields.FCOTAXNBT,
                    FCOTAXWithholding : fields.FCOTAXWithholding,
                    FCOTAXOther : fields.FCOTAXOther,
                    CCITarrifIndex :fields.CCITarrifIndex,
                    CCIType :fields.CCIType,
                    CCIMode :fields.CCIMode,
                    CCIParticular :fields.CCIParticular,
                    CCITariffType :fields.CCITariffType,
                    CCIAssignment :fields.CCIAssignment,
                    CCICurrency :fields.CCICurrency,
                    CCIRate :fields.CCIRate,
                    CCITaxVAT :fields.CCITaxVAT,
                    CCITaxNBT :fields.CCITaxNBT,
                    CCITaxWitholding :fields.CCITaxWitholding,
                    CCITaxOther :fields.CCITaxOther,
                    CCIVTarrifIndex:fields.CCIVTarrifIndex,
                    CCIVType:fields.CCIVType,
                    CCIVMode:fields.CCIVMode,
                    CCIVParticular:fields.CIVParticular,
                    CCIVTarifType:fields.CCIVTarifType,
                    CCIVCurrency:fields.CCIVCurrency,
                    CCIVRate:fields.CCIVRate,
                    CCIVTaxVAT:fields.CCIVTaxVAT,
                    CCIVTaxNBT:fields.CCIVTaxNBT,
                    CCIVTaxWithholdin:fields.CCIVTaxWithholdin,
                    CCIVTaxOther:fields.CCIVTaxOther,
                    LTCMode:fields.LTCMode,
                    LTCType:fields.LTCType,
                    LTCParticular:fields.LTCParticular,
                    LTCFromLocation:fields.LTCFromLocation,
                    LTCToLocation:fields.LTCToLocation,
                    LTCCurrency:fields.LTCCurrency,
                    LTCRate:fields.LTCRate,
                    LTCTaxVAT:fields.LTCTaxVAT,
                    LTCTaxNBT:fields.LTCTaxNBT,
                    LTCTaxWithholdingTax:fields.LTCTaxWithholdingTax,
                    LTCTaxOther:fields.LTCTaxOther,
                    LTCDeentionFTHours:fields.LTCDeentionFTHours,
                    LTCDetentionCurrency:fields.LTCDetentionCurrency,
                    LTCDefinitionRate:fields.LTCDefinitionRate,
                    AttachName:fields.AttachName,
                    AtatchUploadedData:fields.AtatchUploadedData,
                    AttachType:fields.AttachType,
                    AttachVToDate:fields.AttachVToDate,
                    AttachFToDate:fields.AttachFToDate,
    
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
                this.setState({ isEditMode: false });
                if (response.status === 200 || response.status === 201) {
                    alert('Logistics Rates is saved');
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
        render(){
            return(
                <div className = "row pl-5 pt-3">
                    <div className="col-11 form-box mt-2 mb-4">
                        <div className = "float-right">
                            <button type="button" onClick={this.openModal} className="btn btn-line-primary-bridge " data-toggle="modal" data-target=".bd-example-modal-lg" >Logistics Rate</button>
                        </div>
                    </div>
                

                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        ariaHideApp={false}
                        contentLabel="LogisticsRates">
                            
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    lrRateID :  this.state.RateID,
                                    lrRateRef: this.state.RateRef,
                                    lrDescription: this.state.Description,
                                    lrClientName: this.state.ClientName,
                                    lrVendorName: this.state.VendorName,
                                    lrSvsChargesDes: this.state.SvsChargesDes,
                                    lrAssignment: this.state.Assignment,
                                    lrCurrency: this.state.Currency,
                                    lrRate: this.state.Rate,
                                    lrTAXVAT: this.state.TAXVAT,
                                    lrTAXNBT: this.state.TAXNBT,
                                    lrTAXWithTax: this.state.TAXWithTax,
                                    lrTAXOther: this.state.TAXOther,
                                    lrFCTarifIndex: this.state.FCTarifIndex,
                                    lrFCMode: this.state.FCMode,
                                    lrFCType: this.state.FCType,
                                    lrFCIncoterm: this.state.FCIncoterm,
                                    lrFCTarrifType: this.state.FCTarrifType,
                                    lrFCParticular: this.state.FCParticular,
                                    lrFCFromLocation: this.state.FCFromLocation,
                                    lrFCToLocation: this.state.FCToLocation,
                                    lrFCurrencey: this.state.FCurrencey,
                                    lrFCRate: this.state.FCRate,
                                    lrFCTaxVAT: this.state.FCTaxVAT,
                                    lrFCTaxNBT: this.state.FCTaxNBT,
                                    lrFCTaxWitholding: this.state.FCTaxWitholding,
                                    lrFCTaxOther: this.state.FCTaxOther,
                                    lrFCTransitTime: this.state.FCTransitTime,
                                    lrFCFrequency: this.state.FCFrequency,
                                    lrFCEFTimeOrigin: this.state.FCEFTimeOrigin,
                                    lrFCEFTimeDestination: this.state.FCEFTimeDestination,
                                    lrFCOTarifIndex :  this.state.FCOTarifIndex,
                                    lrFCODescription :  this.state.FCODescription,
                                    lrFCOMode :  this.state.FCOMode,
                                    lrFCOIncoterm :  this.state.FCOIncoterm,
                                    lrFCOTarrifType :  this.state.FCOTarrifType,
                                    lrFCOParticular :  this.state.FCOParticular,
                                    lrFCOCurrency :  this.state.FCOCurrency,
                                    lrFCORate :  this.state.FCORate,
                                    lrFCOTaxVAT :  this.state.FCOTaxVAT,
                                    lrFCOTAXNBT :  this.state.FCOTAXNBT,
                                    lrFCOTAXWithholding :  this.state.FCOTAXWithholding,
                                    lrFCOTAXOther :  this.state.FCOTAXOther,
                                    lrCCITarrifIndex : this.state.CCITarrifIndex,
                                    lrCCIType : this.state.CCIType,
                                    lrCCIMode : this.state.CCIMode,
                                    lrCCIParticular : this.state.CCIParticular,
                                    lrCCITariffType : this.state.CCITariffType,
                                    lrCCIAssignment : this.state.CCIAssignment,
                                    lrCCICurrency : this.state.CCICurrency,
                                    lrCCIRate : this.state.CCIRate,
                                    lrCCITaxVAT : this.state.CCITaxVAT,
                                    lrCCITaxNBT : this.state.CCITaxNBT,
                                    lrCCITaxWitholding : this.state.CCITaxWitholding,
                                    lrCCITaxOther : this.state.CCITaxOther,
                                    lrCCIVTarrifIndex: this.state.CCIVTarrifIndex,
                                    lrCCIVType: this.state.CCIVType,
                                    lrCCIVMode: this.state.CCIVMode,
                                    lrCCIVParticular: this.state.CIVParticular,
                                    lrCCIVTarifType: this.state.CCIVTarifType,
                                    lrCCIVCurrency: this.state.CCIVCurrency,
                                    lrCCIVRate: this.state.CCIVRate,
                                    lrCCIVTaxVAT: this.state.CCIVTaxVAT,
                                    lrCCIVTaxNBT: this.state.CCIVTaxNBT,
                                    lrCCIVTaxWithholdin: this.state.CCIVTaxWithholdin,
                                    lrCCIVTaxOther: this.state.CCIVTaxOther,
                                    lrLTCMode:this.state.CCIVTaxOther,
                                    lrLTCType:this.state.CCIVTaxOther,
                                    lrLTCParticular:this.state.CCIVTaxOther,
                                    lrLTCFromLocation:this.state.CCIVTaxOther,
                                    lrLTCToLocation:this.state.CCIVTaxOther,
                                    lrLTCCurrency:this.state.CCIVTaxOther,
                                    lrLTCRate:this.state.CCIVTaxOther,
                                    lrLTCTaxVAT:this.state.LTCTaxVAT,
                                    lrLTCTaxNBT:this.state.LTCTaxNBT,
                                    lrLTCTaxWithholdingTax:this.state.LTCTaxWithholdingTax,
                                    lrLTCTaxOther:this.state.CCIVTaxOther,
                                    lrLTCDeentionFTHours:this.state.LTCDeentionFTHours,
                                    lrLTCDetentionCurrency:this.state.LTCDetentionCurrency,
                                    lrLTCDefinitionRate:this.state.LTCDefinitionRate,
                                    lrAttachName:this.state.AttachName,
                                    lrAtatchUploadedData:this.state.AtatchUploadedData,
                                    lrAttachType:this.state.AttachType,
                                    lrAttachVToDate:this.state.AttachVToDate,
                                    lrAttachFToDate:this.state.AttachFToDate,
                                        fields: {}
                                }}

                                validationSchema = {Yup.object().shape({
                                    lrRateRef: Yup.string()
                                    .required('Rate refernce is required'),
                                    lrDescription: Yup.string()
                                    .required('Description is required'),
                                    lrClientName: Yup.string()
                                    .required('Client Name is required'),
                                    lrVendorName: Yup.string()
                                    .required('Vendor Name is required'),
                                })}

                                onSubmit={fields => {
                                    this.onSubmitClick(fields);
                                }}

                                render = {({values, errors, status, touched, handleChange}) => (
                                    <Form>
                                        <div className=" col-12 form-box mt-4">   <h3 className="pb-3">Logistics Rates</h3>  </div>
                                        <div className="row pr-3 pl-3">

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrRateID">Rate ID</label>
                                                    <Field name="lrRateID" type="text" value={values.lrRateID} onChange={handleChange} className={'form-control' + (errors.lrRateID && touched.lrRateID ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrRateID" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrRateRef">Rate Reference</label>
                                                    <Field name="lrRateRef" type="text" value={values.lrRateRef} onChange={handleChange} className={'form-control' + (errors.lrRateRef && touched.lrRateRef ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrRateRef" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrDescription">Description</label>
                                                    <Field name="lrDescription" type="text" value={values.lrDescription} onChange={handleChange} className={'form-control' + (errors.lrDescription && touched.lrDescription ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrDescription" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label htmlFor="lrClientName">Client Name</label>
                                                        <Field name="lrClientName" component="select" value={values.lrClientName} onChange={handleChange} className={'form-control' + (errors.lrClientName && touched.lrClientName ? ' is-invalid' : '')} >
                                                            <option value="-"></option>
                                                            <option value="Drp1">Drp1</option>
                                                            <option value="Drp2">Drp2</option>
                                                        </Field>
                                                        <ErrorMessage name="lrClientName" component="div" className="invalid-feedback" />
                                                    </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrVendorName">Vendor Name</label>
                                                            <Field name="lrVendorName" component="select" value={values.lrVendorName} onChange={handleChange} className={'form-control' + (errors.lrVendorName && touched.lrVendorName ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value="Port">Port</option>
                                                                <option value="Liner">Liner</option>
                                                            </Field>
                                                            <ErrorMessage name="lrVendorName" component="div" className="invalid-feedback" />
                                                        </div>
                                            </div>
                                    </div><div><hr></hr></div>
                                    <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label><h3>Service Charges</h3></label>
                                                
                                            </div>
                                        </div>
                                            <div className="row pr-3 pl-3">
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrSvsChargesDes">Service Charges - Description</label>
                                                    <Field name="lrSvsChargesDes" type="text" value={values.lrSvsChargesDes} onChange={handleChange} className={'form-control' + (errors.lrSvsChargesDes && touched.lrSvsChargesDes ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrSvsChargesDes" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrAssignment">Assignment</label>
                                                    <Field name="lrAssignment" type="text" value={values.lrAssignment} onChange={handleChange} className={'form-control' + (errors.lrAssignment && touched.lrAssignment ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrAssignment" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCurrency">Currency</label>
                                                    <Field name="lrCurrency" type="text" value={values.lrCurrency} onChange={handleChange} className={'form-control' + (errors.lrCurrency && touched.lrCurrency ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCurrency" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrRate">Rate</label>
                                                    <Field name="lrRate" type="text" value={values.lrRate} onChange={handleChange} className={'form-control' + (errors.lrRate && touched.lrRate ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrRate" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrTAXVAT">Tax- VAT</label>
                                                    <Field name="lrTAXVAT" type="text" value={values.lrTAXVAT} onChange={handleChange} className={'form-control' + (errors.lrTAXVAT && touched.lrTAXVAT ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrTAXVAT" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrTAXNBT">Tax-NBT</label>
                                                    <Field name="lrTAXNBT" type="text" value={values.lrTAXNBT} onChange={handleChange} className={'form-control' + (errors.lrTAXNBT && touched.lrTAXNBT ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrTAXNBT" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrTAXWithTax">Tax- Withholding Tax</label>
                                                    <Field name="lrTAXWithTax" type="text" value={values.lrTAXWithTax} onChange={handleChange} className={'form-control' + (errors.lrTAXWithTax && touched.lrTAXWithTax ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrTAXWithTax" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrTAXOther">Tax- Other</label>
                                                    <Field name="lrTAXOther" type="text" value={values.lrTAXOther} onChange={handleChange} className={'form-control' + (errors.lrTAXOther && touched.lrTAXOther ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrTAXOther" component="div" className="invalid-feedback" />
                                                </div>
                                            
                                            </div>
                                            </div><div><hr></hr></div>

                                          
                                          

                                            <div className="row pr-3 pl-3">

                                                    <div className=" col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label><h3>Freight Charges- Basic Freight</h3></label>
                                                        
                                                    </div>
                                                    </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCTarifIndex">Assignment</label>
                                                    <Field name="lrFCTarifIndex" type="text" value={values.lrFCTarifIndex} onChange={handleChange} className={'form-control' + (errors.lrFCTarifIndex && touched.lrFCTarifIndex ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCTarifIndex" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrFCMode">Mode</label>
                                                            <Field name="lrFCMode" component="select" value={values.lrFCMode} onChange={handleChange} className={'form-control' + (errors.lrFCMode && touched.lrFCMode ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value=">Sea-FCL">Sea-FCL</option>
                                                                <option value="Sea-LCL">Sea-LCL</option>
                                                                <option value="Air">Air</option>
                                                            </Field>
                                                            <ErrorMessage name="lrFCMode" component="div" className="invalid-feedback" />
                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrFCType">Type</label>
                                                            <Field name="lrFCType" component="select" value={values.lrFCType} onChange={handleChange} className={'form-control' + (errors.lrFCType && touched.lrFCType ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value=">Import">Import</option>
                                                                <option value="Export">Export</option>
                                                            </Field>
                                                            <ErrorMessage name="lrFCType" component="div" className="invalid-feedback" />
                                                        </div>
                                            </div>


                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCIncoterm">Incoterm</label>
                                                    <Field name="lrFCIncoterm" type="text" value={values.lrFCIncoterm} onChange={handleChange} className={'form-control' + (errors.lrFCIncoterm && touched.lrFCIncoterm ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCIncoterm" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrFCTarrifType">TarrifType</label>
                                                            <Field name="lrFCTarrifType" component="select" value={values.lrFCTarrifType} onChange={handleChange} className={'form-control' + (errors.lrFCTarrifType && touched.lrFCTarrifType ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value=">AllIn">All In</option>
                                                                <option value="Breakups">Breakups</option>
                                                            </Field>
                                                            <ErrorMessage name="lrFCTarrifType" component="div" className="invalid-feedback" />

                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCParticular">Particular</label>
                                                    <Field name="lrFCParticular" type="text" value={values.lrFCParticular} onChange={handleChange} className={'form-control' + (errors.lrFCParticular && touched.lrFCParticular ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCParticular" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCFromLocation">From Location</label>
                                                    <Field name="lrFCFromLocation" type="text" value={values.lrFCFromLocation} onChange={handleChange} className={'form-control' + (errors.lrFCFromLocation && touched.lrFCFromLocation ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCFromLocation" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCToLocation">To Location</label>
                                                    <Field name="lrFCToLocation" type="text" value={values.lrFCToLocation} onChange={handleChange} className={'form-control' + (errors.lrFCToLocation && touched.lrFCToLocation ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCToLocation" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCurrencey">Currencey</label>
                                                    <Field name="lrFCurrencey" type="text" value={values.lrFCurrencey} onChange={handleChange} className={'form-control' + (errors.lrFCurrencey && touched.lrFCurrencey ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCurrencey" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCRate">Rate</label>
                                                    <Field name="lrFCRate" type="text" value={values.lrFCRate} onChange={handleChange} className={'form-control' + (errors.lrFCRate && touched.lrFCRate ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCRate" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCTaxVAT">Tax VAT</label>
                                                    <Field name="lrFCTaxVAT" type="text" value={values.lrFCTaxVAT} onChange={handleChange} className={'form-control' + (errors.lrFCTaxVAT && touched.lrFCTaxVAT ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCTaxVAT" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>


                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCTaxNBT">Tax NBT</label>
                                                    <Field name="lrFCTaxNBT" type="text" value={values.lrFCTaxNBT} onChange={handleChange} className={'form-control' + (errors.lrFCTaxNBT && touched.lrFCTaxNBT ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCTaxNBT" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCTaxWitholding">Tax Witholding Tax</label>
                                                    <Field name="lrFCTaxWitholding" type="text" value={values.lrFCTaxWitholding} onChange={handleChange} className={'form-control' + (errors.lrFCTaxWitholding && touched.lrFCTaxWitholding ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCTaxWitholding" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCTaxOther">Tax Other</label>
                                                    <Field name="lrFCTaxOther" type="text" value={values.lrFCTaxOther} onChange={handleChange} className={'form-control' + (errors.lrFCTaxOther && touched.lrFCTaxOther ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCTaxOther" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCTransitTime">Transit Time</label>
                                                    <Field name="lrFCTransitTime" type="text" value={values.lrFCTransitTime} onChange={handleChange} className={'form-control' + (errors.lrFCTransitTime && touched.lrFCTransitTime ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCTransitTime" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCFrequency">Frequency</label>
                                                    <Field name="lrFCFrequency" type="text" value={values.lrFCFrequency} onChange={handleChange} className={'form-control' + (errors.lrFCFrequency && touched.lrFCFrequency ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCFrequency" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCEFTimeOrigin">Equipment free time -Origin (days)</label>
                                                    <Field name="lrFCEFTimeOrigin" type="text" value={values.lrFCEFTimeOrigin} onChange={handleChange} className={'form-control' + (errors.lrFCEFTimeOrigin && touched.lrFCEFTimeOrigin ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCEFTimeOrigin" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCEFTimeDestination">Equipment free time -Destination (days)</label>
                                                    <Field name="lrFCEFTimeDestination" type="text" value={values.lrFCEFTimeDestination} onChange={handleChange} className={'form-control' + (errors.lrFCEFTimeDestination && touched.lrFCEFTimeDestination ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCEFTimeDestination" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            </div>
                                            <div><hr></hr></div>

                                            <div className="row pr-3 pl-3">
                                                <div className=" col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label><h3>Freight Charges- Other</h3></label>
                                                    
                                                </div>
                                                </div>
                                            

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCOTarifIndex">TarifIndex</label>
                                                    <Field name="lrFCOTarifIndex" type="text" value={values.lrFCOTarifIndex} onChange={handleChange} className={'form-control' + (errors.lrFCOTarifIndex && touched.lrFCOTarifIndex ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCOTarifIndex" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCODescription">Description</label>
                                                    <Field name="lrFCODescription" type="text" value={values.lrFCODescription} onChange={handleChange} className={'form-control' + (errors.lrFCODescription && touched.lrFCODescription ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCODescription" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrFCOMode">Mode</label>
                                                            <Field name="lrFCOMode" component="select" value={values.lrFCOMode} onChange={handleChange} className={'form-control' + (errors.lrFCOMode && touched.lrFCOMode ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value=">Sea-FCL">Sea-FCL</option>
                                                                <option value="Sea-LCL">Sea-LCL</option>
                                                                <option value="Air">Air</option>
                                                            </Field>
                                                            <ErrorMessage name="lrFCOMode" component="div" className="invalid-feedback" />
                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCOIncoterm">Incoterm</label>
                                                    <Field name="lrFCOIncoterm" type="text" value={values.lrFCOIncoterm} onChange={handleChange} className={'form-control' + (errors.lrFCOIncoterm && touched.lrFCOIncoterm ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCOIncoterm" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrFCOTarrifType">TarrifType</label>
                                                            <Field name="lrFCOTarrifType" component="select" value={values.lrFCOTarrifType} onChange={handleChange} className={'form-control' + (errors.lrFCOTarrifType && touched.lrFCOTarrifType ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value=">AllIn">All In</option>
                                                                <option value="Breakups">Breakups</option>
                                                            </Field>
                                                            <ErrorMessage name="lrFCOTarrifType" component="div" className="invalid-feedback" />

                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCOParticular">Particular</label>
                                                    <Field name="lrFCOParticular" type="text" value={values.lrFCOParticular} onChange={handleChange} className={'form-control' + (errors.lrFCOParticular && touched.lrFCOParticular ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCOParticular" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCOCurrency">Currency</label>
                                                    <Field name="lrFCOCurrency" type="text" value={values.lrFCOCurrency} onChange={handleChange} className={'form-control' + (errors.lrFCOCurrency && touched.lrFCOCurrency ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCOCurrency" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCORate">Rate</label>
                                                    <Field name="lrFCORate" type="text" value={values.lrFCORate} onChange={handleChange} className={'form-control' + (errors.lrFCORate && touched.lrFCORate ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCORate" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCOTaxVAT">Tax VAT</label>
                                                    <Field name="lrFCOTaxVAT" type="text" value={values.lrFCOTaxVAT} onChange={handleChange} className={'form-control' + (errors.lrFCOTaxVAT && touched.lrFCOTaxVAT ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCOTaxVAT" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCOTAXNBT">TAX NBT</label>
                                                    <Field name="lrFCOTAXNBT" type="text" value={values.lrFCOTAXNBT} onChange={handleChange} className={'form-control' + (errors.lrFCOTAXNBT && touched.lrFCOTAXNBT ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCOTAXNBT" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCOTAXWithholding">Tax- Withdrawing Tax</label>
                                                    <Field name="lrFCOTAXWithholding" type="text" value={values.lrFCOTAXWithholding} onChange={handleChange} className={'form-control' + (errors.lrFCOTAXWithholding && touched.lrFCOTAXWithholding ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCOTAXWithholding" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrFCOTAXOther">TAX Other</label>
                                                    <Field name="lrFCOTAXOther" type="text" value={values.lrFCOTAXOther} onChange={handleChange} className={'form-control' + (errors.lrFCOTAXOther && touched.lrFCOTAXOther ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrFCOTAXOther" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            </div><div><hr></hr></div>

                                            <div className="row pr-3 pl-3">
                                                    <div className=" col-6 form-box mt-2">
                                                    <div className="form-group">
                                                        <label><h3>Customs Clrearences- Import </h3></label>
                                                        
                                                    </div>
                                                    </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCITarrifIndex">Tarrif Index</label>
                                                    <Field name="lrCCITarrifIndex" type="text" value={values.lrCCITarrifIndex} onChange={handleChange} className={'form-control' + (errors.lrCCITarrifIndex && touched.lrCCITarrifIndex ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCITarrifIndex" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrCCIType">Type</label>
                                                            <Field name="lrCCIType" component="select" value={values.lrCCIType} onChange={handleChange} className={'form-control' + (errors.lrCCIType && touched.lrCCIType ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value=">Import">Import</option>
                                                                <option value="Export">Export</option>
                                                            </Field>
                                                            <ErrorMessage name="lrCCIType" component="div" className="invalid-feedback" />

                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrCCIMode">Mode</label>
                                                            <Field name="lrCCIMode" component="select" value={values.lrCCIMode} onChange={handleChange} className={'form-control' + (errors.lrCCIMode && touched.lrCCIMode ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value=">SeaFCL">SeaFCL</option>
                                                                <option value="Sea">Sea</option>
                                                            </Field>
                                                            <ErrorMessage name="lrCCIMode" component="div" className="invalid-feedback" />

                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCIParticular">Particular</label>
                                                    <Field name="lrCCIParticular" type="text" value={values.lrCCIParticular} onChange={handleChange} className={'form-control' + (errors.lrCCIParticular && touched.lrCCIParticular ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCIParticular" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrCCITariffType">TariffType</label>
                                                            <Field name="lrCCITariffType" component="select" value={values.lrCCITariffType} onChange={handleChange} className={'form-control' + (errors.lrCCITariffType && touched.lrCCITariffType ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value=">AllIn">All In</option>
                                                                <option value="Breakups">Breakups</option>
                                                            </Field>
                                                            <ErrorMessage name="lrCCITariffType" component="div" className="invalid-feedback" />

                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrCCIAssignment">Assignment</label>
                                                            <Field name="lrCCIAssignment" component="select" value={values.lrCCIAssignment} onChange={handleChange} className={'form-control' + (errors.lrCCIAssignment && touched.lrCCIAssignment ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value="Fixed">Fixed</option>
                                                                <option value="Breakups">Breakups</option>
                                                            </Field>
                                                            <ErrorMessage name="lrCCIAssignment" component="div" className="invalid-feedback" />

                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCICurrency">Currency</label>
                                                    <Field name="lrCCICurrency" type="text" value={values.lrCCICurrency} onChange={handleChange} className={'form-control' + (errors.lrCCICurrency && touched.lrCCICurrency ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCICurrency" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCIRate">Rate</label>
                                                    <Field name="lrCCIRate" type="text" value={values.lrCCIRate} onChange={handleChange} className={'form-control' + (errors.lrCCIRate && touched.lrCCIRate ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCIRate" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCITaxVAT">Tax VAT</label>
                                                    <Field name="lrCCITaxVAT" type="text" value={values.lrCCITaxVAT} onChange={handleChange} className={'form-control' + (errors.lrCCITaxVAT && touched.lrCCITaxVAT ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCITaxVAT" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCITaxNBT">Tax NBT</label>
                                                    <Field name="lrCCITaxNBT" type="text" value={values.lrCCITaxNBT} onChange={handleChange} className={'form-control' + (errors.lrCCITaxNBT && touched.lrCCITaxNBT ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCITaxNBT" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCITaxWitholding">Tax- Witholding Tax</label>
                                                    <Field name="lrCCITaxWitholding" type="text" value={values.lrCCITaxWitholding} onChange={handleChange} className={'form-control' + (errors.lrCCITaxWitholding && touched.lrCCITaxWitholding ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCITaxWitholding" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCITaxOther">Tax Other</label>
                                                    <Field name="lrCCITaxOther" type="text" value={values.lrCCITaxOther} onChange={handleChange} className={'form-control' + (errors.lrCCITaxOther && touched.lrCCITaxOther ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCITaxOther" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            </div><div><hr></hr></div>

                                            <div className="row pr-3 pl-3">
                                                                 <div className=" col-6 form-box mt-2">
                                                                    <div className="form-group">
                                                                        <label><h3>Customs Clrearences- if (variable)</h3></label>
                                                                        
                                                                    </div>
                                                                </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCIVTarrifIndex">TarrifIndex</label>
                                                    <Field name="lrCCIVTarrifIndex" type="text" value={values.lrCCIVTarrifIndex} onChange={handleChange} className={'form-control' + (errors.lrCCIVTarrifIndex && touched.lrCCIVTarrifIndex ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCIVTarrifIndex" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrCCIVType">Type</label>
                                                            <Field name="lrCCIVType" component="select" value={values.lrCCIVType} onChange={handleChange} className={'form-control' + (errors.lrCCIVType && touched.lrCCIVType ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value=">Import">Import</option>
                                                                <option value=">Export">Export</option>
                                                            </Field>
                                                            <ErrorMessage name="lrCCIVType" component="div" className="invalid-feedback" />

                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrCCIVMode">Mode</label>
                                                            <Field name="lrCCIVMode" component="select" value={values.lrCCIVMode} onChange={handleChange} className={'form-control' + (errors.lrCCIVMode && touched.lrCCIVMode ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value=">SeaFCL">SeaFCL</option>
                                                                <option value="Sea">Sea</option>
                                                            </Field>
                                                            <ErrorMessage name="lrCCIVMode" component="div" className="invalid-feedback" />

                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCIVParticular">Particular</label>
                                                    <Field name="lrCCIVParticular" type="text" value={values.lrCCIVParticular} onChange={handleChange} className={'form-control' + (errors.lrCCIVParticular && touched.lrCCIVParticular ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCIVParticular" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrCCIVTarifType">Tariff Type</label>
                                                            <Field name="lrCCIVTarifType" component="select" value={values.lrCCIVTarifType} onChange={handleChange} className={'form-control' + (errors.lrCCIVTarifType && touched.lrCCIVTarifType ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value="AllIn">All In</option>
                                                                <option value="Breakups">Breakups</option>
                                                            </Field>
                                                            <ErrorMessage name="lrCCIVTarifType" component="div" className="invalid-feedback" />

                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCIVCurrency">lrAssignment</label>
                                                    <Field name="lrCCIVCurrency" type="text" value={values.lrCCIVCurrency} onChange={handleChange} className={'form-control' + (errors.lrCCIVCurrency && touched.lrCCIVCurrency ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCIVCurrency" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCIVRate">Rate</label>
                                                    <Field name="lrCCIVRate" type="text" value={values.lrCCIVRate} onChange={handleChange} className={'form-control' + (errors.lrCCIVRate && touched.lrCCIVRate ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCIVRate" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCIVTaxVAT">Tax VAT</label>
                                                    <Field name="lrCCIVTaxVAT" type="text" value={values.lrCCIVTaxVAT} onChange={handleChange} className={'form-control' + (errors.lrCCIVTaxVAT && touched.lrCCIVTaxVAT ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCIVTaxVAT" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCIVTaxNBT">Tax NBT</label>
                                                    <Field name="lrCCIVTaxNBT" type="text" value={values.lrCCIVTaxNBT} onChange={handleChange} className={'form-control' + (errors.lrCCIVTaxNBT && touched.lrCCIVTaxNBT ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCIVTaxNBT" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCIVTaxWithholdin">Tax- Withholdin Tax</label>
                                                    <Field name="lrCCIVTaxWithholdin" type="text" value={values.lrCCIVTaxWithholdin} onChange={handleChange} className={'form-control' + (errors.lrCCIVTaxWithholdin && touched.lrCCIVTaxWithholdin ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCIVTaxWithholdin" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrCCIVTaxOther">Tax Other</label>
                                                    <Field name="lrCCIVTaxOther" type="text" value={values.lrCCIVTaxOther} onChange={handleChange} className={'form-control' + (errors.lrCCIVTaxOther && touched.lrCCIVTaxOther ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrCCIVTaxOther" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                        </div>
                                        <div><hr></hr></div>

                                        <div className="row pr-3 pl-3">
                                            <div className=" col-6 form-box mt-2">
                                                <div className="form-group">
                                                        <label><h3>Local Transport Charge</h3></label>
                                                                        
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrLTCMode">Mode</label>
                                                            <Field name="lrLTCMode" component="select" value={values.lrLTCMode} onChange={handleChange} className={'form-control' + (errors.lrLTCMode && touched.lrLTCMode ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value="SeaFCL">Sea-FCL</option>
                                                                <option value="Sea-LCL">Sea-LCL</option>
                                                                <option value="Air">Air</option>
                                                            </Field>
                                                            <ErrorMessage name="lrLTCMode" component="div" className="invalid-feedback" />

                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrLTCType">Type</label>
                                                            <Field name="lrLTCType" component="select" value={values.lrLTCType} onChange={handleChange} className={'form-control' + (errors.lrLTCType && touched.lrLTCType ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value="AllIn">All In</option>
                                                                <option value="Breakups">Breakups</option>
                                                            </Field>
                                                            <ErrorMessage name="lrLTCType" component="div" className="invalid-feedback" />

                                                        </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrLTCParticular">Particular</label>
                                                    <Field name="lrLTCParticular" type="text" value={values.lrLTCParticular} onChange={handleChange} className={'form-control' + (errors.lrLTCParticular && touched.lrLTCParticular ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrLTCParticular" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrLTCFromLocation">FromLocation</label>
                                                    <Field name="lrLTCFromLocation" type="text" value={values.lrLTCFromLocation} onChange={handleChange} className={'form-control' + (errors.lrLTCFromLocation && touched.lrLTCFromLocation ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrLTCFromLocation" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrLTCRate">Rate</label>
                                                    <Field name="lrLTCRate" type="text" value={values.lrLTCRate} onChange={handleChange} className={'form-control' + (errors.lrLTCRate && touched.lrLTCRate ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrLTCRate" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrLTCTaxVAT">Tax VAT</label>
                                                    <Field name="lrLTCTaxVAT" type="text" value={values.lrLTCTaxVAT} onChange={handleChange} className={'form-control' + (errors.lrLTCTaxVAT && touched.lrLTCTaxVAT ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrLTCTaxVAT" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrLTCTaxNBT">Tax NBT</label>
                                                    <Field name="lrLTCTaxNBT" type="text" value={values.lrLTCTaxNBT} onChange={handleChange} className={'form-control' + (errors.lrLTCTaxNBT && touched.lrLTCTaxNBT ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrLTCTaxNBT" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrLTCTaxWithholdingTax">Tax-Withholding Tax</label>
                                                    <Field name="lrLTCTaxWithholdingTax" type="text" value={values.lrLTCTaxWithholdingTax} onChange={handleChange} className={'form-control' + (errors.lrLTCTaxWithholdingTax && touched.lrLTCTaxWithholdingTax ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrLTCTaxWithholdingTax" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrLTCTaxOther">Tax Other</label>
                                                    <Field name="lrLTCTaxOther" type="text" value={values.lrLTCTaxOther} onChange={handleChange} className={'form-control' + (errors.lrLTCTaxOther && touched.lrLTCTaxOther ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrLTCTaxOther" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrLTCDeentionFTHours">Deention Free Time Hours</label>
                                                    <Field name="lrLTCDeentionFTHours" type="text" value={values.lrLTCDeentionFTHours} onChange={handleChange} className={'form-control' + (errors.lrLTCDeentionFTHours && touched.lrLTCDeentionFTHours ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrLTCDeentionFTHours" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrLTCDetentionCurrency">Detention Currency</label>
                                                    <Field name="lrLTCDetentionCurrency" type="text" value={values.lrLTCDetentionCurrency} onChange={handleChange} className={'form-control' + (errors.lrLTCDetentionCurrency && touched.lrLTCDetentionCurrency ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrLTCDetentionCurrency" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrLTCDefinitionRate">Definition Rate</label>
                                                    <Field name="lrLTCDefinitionRate" type="text" value={values.lrLTCDefinitionRate} onChange={handleChange} className={'form-control' + (errors.lrLTCDefinitionRate && touched.lrLTCDefinitionRate ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrLTCDefinitionRate" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                        </div>

                                        <div><hr></hr></div>

                                            <div className="row pr-3 pl-3">
                                                <div className=" col-6 form-box mt-2">
                                                    <div className="form-group">
                                                            <label><h3>Attachments</h3></label>
                                                                            
                                                    </div>
                                                </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrAttachName">Attach Name</label>
                                                    <Field name="lrAttachName" type="text" value={values.lrAttachName} onChange={handleChange} className={'form-control' + (errors.lrAttachName && touched.lrAttachName ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrAttachName" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrAtatchUploadedData">Uploaded Data</label>
                                                    <Field name="lrAtatchUploadedData" type="text" value={values.lrAtatchUploadedData} onChange={handleChange} className={'form-control' + (errors.lrAtatchUploadedData && touched.lrAtatchUploadedData ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrAtatchUploadedData" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                        <div className="form-group">
                                                            <label htmlFor="lrAttachType">Type</label>
                                                            <Field name="lrAttachType" component="select" value={values.lrAttachType} onChange={handleChange} className={'form-control' + (errors.lrAttachType && touched.lrAttachType ? ' is-invalid' : '')} >
                                                                <option value="-"></option>
                                                                <option value="PeriodicalAgreement">PeriodicalAgreement</option>
                                                                <option value="Amendment">Amendment</option>
                                                                <option value="OneOffAgreement">OneOffAgreement</option>
                                                                <option value="Other">Other</option>
                                                            </Field>
                                                            <ErrorMessage name="lrAttachType" component="div" className="invalid-feedback" />

                                                        </div>
                                            </div>

                                           

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrAttachFToDate">Validity From Date</label>
                                                    <Field name="lrAttachFToDate" type="text" value={values.lrAttachFToDate} onChange={handleChange} className={'form-control' + (errors.lrAttachFToDate && touched.lrAttachFToDate ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrAttachFToDate" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-6 form-box mt-2">
                                                <div className="form-group">
                                                    <label htmlFor="lrAttachVToDate">Validity To Date</label>
                                                    <Field name="lrAttachVToDate" type="text" value={values.lrAttachVToDate} onChange={handleChange} className={'form-control' + (errors.lrAttachVToDate && touched.lrAttachVToDate ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="lrAttachVToDate" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                        </div>

                                    </Form>

                                )}/>

                                
                                <div className="row pr-3 pl-3">
                                    <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-primary-bridge-close" onClick={this.closeModal} >Cancel</button>
                                                <button type="submit" className="btn btn-primary-bridge">Save </button>
                                            </div>
                                    </div>
                                </div>
                                
                            </Modal>
                            
                        </div>

                        <div className="col-lg-11 table-wraper">
                             <table className="table table-hover">
                                            <thead className="material-table-th">
                                                <tr>
                                                    <th scope="col">Rate ID </th>
                                                    <th scope="col">RateRef</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">ClientName</th>
                                                    <th scope= "col">VendorName</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.LogisticRatestListOptions}
                                            </tbody>
                                        </table>
                        </div>
                    </div>
                    
            );
        }
}

export default LogisticsRates