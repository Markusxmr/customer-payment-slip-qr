"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPaymentSlip = exports.setPartialPaymentSlip = void 0;
function setPartialPaymentSlip(isp) {
    return {
        iban_primatelja: isp.iban,
        ulica_i_broj_primatelja: `${isp === null || isp === void 0 ? void 0 : isp.street}`,
        postanski_i_grad_primatelja: `${isp === null || isp === void 0 ? void 0 : isp.postalCode} ${isp === null || isp === void 0 ? void 0 : isp.city}`,
        naziv_primatelja: isp === null || isp === void 0 ? void 0 : isp.name,
        model_primatelja: '',
        isp_id: isp === null || isp === void 0 ? void 0 : isp.id,
    };
}
exports.setPartialPaymentSlip = setPartialPaymentSlip;
function setPaymentSlip({ isp, customer }) {
    return Object.assign({ iban_platitelja: (customer === null || customer === void 0 ? void 0 : customer.transakcijski_račun) ? `HR${customer === null || customer === void 0 ? void 0 : customer.transakcijski_račun}` : '', sifra_namjene: 'GDSV', datum_izvrsenja: '', valuta_placanja: 'HRK', hitno: '', ime_i_prezime_platitelja: customer === null || customer === void 0 ? void 0 : customer.naziv, ulica_i_broj_platitelja: customer === null || customer === void 0 ? void 0 : customer.adresa, postanski_i_grad_platitelja: `${customer === null || customer === void 0 ? void 0 : customer.pošta} ${customer === null || customer === void 0 ? void 0 : customer.mjesto}`, opis_placanja: '', customer_id: Number(customer.id) }, setPartialPaymentSlip(isp));
}
exports.setPaymentSlip = setPaymentSlip;
//# sourceMappingURL=set-payment-slip.js.map