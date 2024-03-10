import { request } from "@/service/AxiosService.js";
// GET PAYMENT METHOD
export function getPaymentMethod() {
  const url = `/api/warehouse/v1/paymentmethod`;
  return request("get", url, {}, true);
}

// SUPPLIER ID
export function getSupplierAll() {
  const url = `/api/warehouse/v1/supplier`;
  return request("get", url, {}, true);
}

// GET PO PAYMENT
export function getPoPayment(data) {
  const url = `/api/warehouse/v1/popayments/get-po-payment`;
  return request("post", url, data, true);
}

// GET Invoice Installments
export function getInvoiceInstallments(data) {
  const url = `/api/warehouse/v1/invoiceinstallments/get-advance-search`;
  return request("post", url, data, true);
}

export function getPoById(id) {
  const url = `/api/warehouse/v1/po/${id}`;
  return request("get", url, {}, true);
}

export function approvedConfirm(data) {
  const url = `/api/warehouse/v1/popayments`;
  return request("post", url, data, true);
}

export function getFinance() {
  const url = `/api/warehouse/v1/invoiceinstallments`;
  return request("get", url, {}, true);
}

export function getFinanceByid(id) {
  const url = `/api/warehouse/v1/invoiceinstallments/get-finance/${id}`;
  return request("get", url, {}, true);
}
