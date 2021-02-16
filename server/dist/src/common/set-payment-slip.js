"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPaymentSlip = exports.primatelj = void 0;
exports.primatelj = {
    naziv_primatelja: 'TEHNICORE d.o.o.',
    ulica_i_broj_primatelja: 'Sveti Jakov 116',
    postanski_i_grad_primatelja: `47300 Ogulin`,
    iban_primatelja: 'HR1723600001101234565',
};
function setPaymentSlip({ isp, customer }) {
    var _a;
    return {
        hitno: 'X',
        ime_i_prezime_platitelja: customer === null || customer === void 0 ? void 0 : customer.naziv,
        ulica_i_broj_platitelja: customer === null || customer === void 0 ? void 0 : customer.adresa,
        ulica_i_broj_primatelja: exports.primatelj === null || exports.primatelj === void 0 ? void 0 : exports.primatelj.ulica_i_broj_primatelja,
        postanski_i_grad_platitelja: `${customer === null || customer === void 0 ? void 0 : customer.pošta} ${customer === null || customer === void 0 ? void 0 : customer.adresa}`,
        postanski_i_grad_primatelja: exports.primatelj.postanski_i_grad_primatelja,
        naziv_primatelja: exports.primatelj === null || exports.primatelj === void 0 ? void 0 : exports.primatelj.naziv_primatelja,
        customer_id: Number(customer.id),
        isp_id: (_a = isp === null || isp === void 0 ? void 0 : isp.id) !== null && _a !== void 0 ? _a : 1,
    };
}
exports.setPaymentSlip = setPaymentSlip;
//# sourceMappingURL=set-payment-slip.js.map