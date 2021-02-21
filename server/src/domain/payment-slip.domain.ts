// export let primatelj = {
//   naziv_primatelja: 'TEHNICORE d.o.o.',
//   ulica_i_broj_primatelja: 'Sveti Jakov 116',
//   postanski_i_grad_primatelja: `47300 Ogulin`,
//   iban_primatelja: 'HR1723600001101234565',
// };

export function setIspPaymentSlip(isp) {
  return {
    iban_primatelja: isp?.iban,
    ulica_i_broj_primatelja: `${isp?.street}`,
    postanski_i_grad_primatelja: `${isp?.postalCode} ${isp?.city}`,
    naziv_primatelja: isp?.name,
    model_primatelja: '',
    isp_id: isp?.id,
  };
}

export function setPaymentSlip({ isp, customer }) {
  return {
    // poziv_na_broj_platitelja: '',
    // poziv_na_broj_primatelja: '',
    // iznos: '',
    iban_platitelja: customer?.transakcijski_račun ? `HR${customer?.transakcijski_račun}` : '',
    // model_platitelja: '',
    sifra_namjene: 'GDSV',
    datum_izvrsenja: '',
    valuta_placanja: 'HRK',
    // Samo vrijednost X ili ništa
    hitno: '', // X
    ime_i_prezime_platitelja: customer?.naziv ?? '',
    ulica_i_broj_platitelja: customer?.adresa ?? '',
    postanski_i_grad_platitelja: `${customer?.pošta ?? ''} ${customer?.mjesto ?? ''}`,
    opis_placanja: '',
    // nalog: '-',
    customer_id: Number(customer?.id),
    ...setIspPaymentSlip(isp),
  };
}

export function monthFormater(customer, i: number) {
  let { obveza = null, iznos_opreme = null } = customer;
  let date = new Date();
  let year = date.getFullYear();
  let iznos: string = `0.00`;
  let opis_placanja;
  let formatedMonth = i > 9 ? i : `0${i}`;
  if (i < 4 && i > 0) {
    iznos = obveza && iznos_opreme ? (parseFloat(obveza) + parseFloat(iznos_opreme)).toFixed(2) : `0.00`;
    let val = iznos !== `0.00` ? `${iznos + ' - '}` : '';
    opis_placanja = val + `Internet usluge za ${i}/${year} + oprema ${i}/3`;
  } else {
    iznos = obveza;
    opis_placanja = `${iznos ? iznos + ' - ' : ''}Internet usluge za ${i}/${year}`;
  }

  return {
    iznos,
    opis_placanja,
    formatedMonth,
  };
}

export function buildPaymentSlipDomain() {
  return function buildPaymentSlipDomain({ isp, customer }, i: number) {
    let date = new Date();
    let year = date.getFullYear();
    let newVal = setPaymentSlip({ isp, customer });
    let { formatedMonth, opis_placanja, iznos } = monthFormater(customer, i);
    return {
      ...newVal,
      mjesec: i,
      godina: year,
      iznos,
      datum_izvrsenja: `01${formatedMonth}${year}`,
      opis_placanja,
    };
  };
}

export const paymentSlipDomain = buildPaymentSlipDomain();
