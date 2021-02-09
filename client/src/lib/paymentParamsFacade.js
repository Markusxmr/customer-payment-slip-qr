import BarcodePayment from "./BarcodePayment";

export const reduxID = {
  Iznos: "iznos",
  ImePlatitelja: "ime_i_prezime_platitelja",
  AdresaPlatitelja: "ulica_i_broj_platitelja",
  SjedistePlatitelja: "postanski_i_grad_platitelja",
  Primatelj: "ime_i_prezime_primatelja",
  AdresaPrimatelja: "ulica_i_broj_primatelja",
  SjedistePrimatelja: "postanski_i_grad_primatelja",
  IBAN: "iban_primatelja",
  ModelPlacanja: "model_primatelja",
  PozivNaBroj: "poziv_na_broj_platitelja",
  SifraNamjene: "sifra_namjene",
  OpisPlacanja: "opis_placanja",
};

export const paramName = {
  iznos: "Iznos",
  ime_i_prezime_platitelja: "ImePlatitelja",
  ulica_i_broj_platitelja: "AdresaPlatitelja",
  postanski_i_grad_platitelja: "SjedistePlatitelja",
  ime_i_prezime_primatelja: "Primatelj",
  ulica_i_broj_primatelja: "AdresaPrimatelja",
  postanski_i_grad_primatelja: "SjedistePrimatelja",
  iban_primatelja: "IBAN",
  model_primatelja: "ModelPlacanja",
  poziv_na_broj_platitelja: "PozivNaBroj",
  sifra_namjene: "SifraNamjene",
  opis_placanja: "OpisPlacanja",
};

export const nalog2params = (nalog) => {
  const paymentParams = new BarcodePayment.PaymentParams();

  // prepisujem payment params iz
  for (var key in nalog) {
    if (nalog.hasOwnProperty(key) && paramName.hasOwnProperty(key)) {
      paymentParams[paramName[key]] = nalog[key];
    }
  }

  return paymentParams;
};
