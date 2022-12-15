import { controlNumber } from './control-number';

export function setIspPaymentSlip(isp) {
  return {
    iban_primatelja: isp?.iban,
    ulica_i_broj_primatelja: `${isp?.street}`,
    postanski_i_grad_primatelja: `${isp?.postalCode} ${isp?.city}`,
    naziv_primatelja: isp?.name,
    model_primatelja: 'HR01',
    isp_id: isp?.id,
  };
}

export function setPaymentSlip({ isp, customer }) {
  return {
    // poziv_na_broj_platitelja: '',
    // iznos: '',
    iban_platitelja: customer?.transakcijski_račun ? `HR${customer?.transakcijski_račun}` : '',
    // model_platitelja: '',
    sifra_namjene: 'GDSV',
    datum_izvrsenja: '',
    valuta_placanja: 'EUR',
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
  obveza = Number(obveza);
  iznos_opreme = Number(iznos_opreme);
  let date = new Date();
  let year = date.getFullYear();
  let iznos = obveza && iznos_opreme ? obveza + iznos_opreme : 0.0;
  let opis_placanja;
  let formatedMonth = i > 9 ? i : `0${i}`;
  let šifra = `${customer?.šifra} - ` ?? '';

  if (i < 4 && i > 0) {
    iznos = obveza && iznos_opreme ? obveza + iznos_opreme : 0.0;
    opis_placanja = šifra + `Internet usluge za ${i}/${year} + oprema ${i}/3`;
  } else {
    iznos = obveza;
    opis_placanja = šifra + `Internet usluge za ${i}/${year}`;
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
    let šifra = `${customer?.šifra}-` ?? '';
    let { formatedMonth, opis_placanja, iznos } = monthFormater(customer, i);

    return {
      ...newVal,
      poziv_na_broj_primatelja: `${šifra}${controlNumber(customer?.šifra)}`,
      mjesec: i,
      godina: year,
      iznos,
      // datum_izvrsenja: `01${formatedMonth}${year}`,
      datum_izvrsenja: '',
      opis_placanja,
    };
  };
}

export const paymentSlipDomain = buildPaymentSlipDomain();
