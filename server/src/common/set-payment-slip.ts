export let primatelj = {
  naziv_primatelja: 'TEHNICORE d.o.o.',
  ulica_i_broj_primatelja: 'Sveti Jakov 116',
  postanski_i_grad_primatelja: `47300 Ogulin`,
  iban_primatelja: 'HR1723600001101234565',
};

export function setPaymentSlip(customer) {
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
    ime_i_prezime_platitelja: customer?.naziv,
    ulica_i_broj_platitelja: customer?.adresa,
    ulica_i_broj_primatelja: primatelj?.ulica_i_broj_primatelja,
    postanski_i_grad_platitelja: `${customer?.pošta} ${customer?.adresa}`,
    postanski_i_grad_primatelja: primatelj.postanski_i_grad_primatelja,
    naziv_primatelja: primatelj?.naziv_primatelja,
    // opis_placanja: '',
    // nalog: '-',
    customer_id: Number(customer.id),
  };
}
