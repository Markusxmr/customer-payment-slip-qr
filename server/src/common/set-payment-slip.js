"use strict";
exports.__esModule = true;
exports.setPaymentSlip = exports.primatelj = void 0;
exports.primatelj = {
    naziv_primatelja: 'TEHNICORE d.o.o.',
    ulica_i_broj_primatelja: 'Sveti Jakov 116',
    postanski_i_grad_primatelja: "47300 Ogulin",
    iban_primatelja: 'HR1723600001101234565'
};
function setPaymentSlip(user) {
    return {
        // poziv_na_broj_platitelja: '',
        // poziv_na_broj_primatelja: '',
        // iznos: '',
        // iban_primatelja: primatelj.iban_primatelja,
        // iban_platitelja: '',
        // model_primatelja: '',
        // model_platitelja: '',
        // sifra_namjene: '',
        // datum_izvrsenja: '',
        // valuta_placanja: 'HRK',
        // Samo vrijednost X ili ništa
        hitno: 'X',
        ime_i_prezime_platitelja: user === null || user === void 0 ? void 0 : user.naziv,
        ulica_i_broj_platitelja: user === null || user === void 0 ? void 0 : user.adresa,
        ulica_i_broj_primatelja: exports.primatelj === null || exports.primatelj === void 0 ? void 0 : exports.primatelj.ulica_i_broj_primatelja,
        postanski_i_grad_platitelja: (user === null || user === void 0 ? void 0 : user.pošta) + " " + (user === null || user === void 0 ? void 0 : user.adresa),
        postanski_i_grad_primatelja: exports.primatelj.postanski_i_grad_primatelja,
        naziv_primatelja: exports.primatelj === null || exports.primatelj === void 0 ? void 0 : exports.primatelj.naziv_primatelja,
        // opis_placanja: '',
        // nalog: '-',
        user_id: Number(user.id)
    };
}
exports.setPaymentSlip = setPaymentSlip;
