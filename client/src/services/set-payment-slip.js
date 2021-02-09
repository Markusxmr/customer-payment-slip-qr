"use strict";
exports.__esModule = true;
exports.setPaymentSlip = void 0;
var model_1 = require("../model");
function setPaymentSlip(user) {
    return {
        id: null,
        poziv_na_broj_platitelja: "",
        poziv_na_broj_primatelja: "",
        iznos: Math.floor(Math.random() * (999999 - 100 + 1)) + 100,
        iban_primatelja: model_1.primatelj.iban_primatelja,
        iban_platitelja: "",
        model_primatelja: "",
        model_platitelja: "",
        sifra_namjene: "",
        datum_izvrsenja: "",
        valuta_placanja: "HRK",
        // Samo vrijednost X ili ništa
        hitno: "X",
        ime_i_prezime_platitelja: user === null || user === void 0 ? void 0 : user.naziv,
        ulica_i_broj_platitelja: user === null || user === void 0 ? void 0 : user.adresa,
        ulica_i_broj_primatelja: model_1.primatelj.ulica_i_broj_primatelja,
        postanski_i_grad_platitelja: (user === null || user === void 0 ? void 0 : user.pošta) + " " + (user === null || user === void 0 ? void 0 : user.adresa),
        postanski_i_grad_primatelja: model_1.primatelj.postanski_i_grad_primatelja,
        naziv_primatelja: model_1.primatelj.naziv_primatelja,
        opis_placanja: "Opis uplate",
        nalog: "-",
        user_id: Number(user.id)
    };
}
exports.setPaymentSlip = setPaymentSlip;
