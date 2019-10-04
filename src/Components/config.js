/**
 * Created by dinanjanag on 5/11/19.
 */

const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  };
  
 const URL_BFF = "http://localhost:8081/";

  const HSCODE = 'hscode';
  const REGAPPROVAL = 'regapproval';
  const SUPPLIER = 'supplier';
  const INCOTERM = 'incoterm';
  const BANK = 'bank';
  const PAYMENT_TERM = 'paymentsTerm';
  const TRADE_AGREEMENT = 'tradeagreement';
  const MATERIAL = 'material';
  const MESURE = 'mesure';
  const MATERIAL_TYPE = 'materialtype';
  const COUNTRIES = 'countries';
  const BL = 'blType';
  const STAKEHOLDER = 'stakeHolder'

  const ENDPOINTS = {
    HSCODE,
    REGAPPROVAL,
    SUPPLIER,
    INCOTERM,
    BANK,
    PAYMENT_TERM,
    TRADE_AGREEMENT,
    MATERIAL,
    MESURE,
    MATERIAL_TYPE,
    COUNTRIES,
    BL,
    STAKEHOLDER
  };
  
  module.exports = {
    ENDPOINTS, URL_BFF,HTTP_METHODS
  };