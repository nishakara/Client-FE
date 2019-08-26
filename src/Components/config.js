/**
 * Created by dinanjanag on 5/11/19.
 */

const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  };
  
 const URL_BFF = "http://localhost:8081/"

  const HSCODE = 'HSCODE'
  const REGAPPROVAL = 'regapproval'
  const SUPPLIER = 'supplier'
  const INCOTERM = 'incoterm'
  const BANK = 'bank'
  const PAYMENT_TERM = 'paymentterm'
  const TRADE_AGREEMENT = 'tradeagreement'
  
  const ENDPOINTS = {
    HSCODE,
    REGAPPROVAL,
    SUPPLIER,
    INCOTERM,
    BANK,
    PAYMENT_TERM,
    TRADE_AGREEMENT
  };
  
  module.exports = {
    ENDPOINTS, URL_BFF,HTTP_METHODS
  };