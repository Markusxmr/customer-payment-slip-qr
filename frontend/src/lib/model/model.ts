export const user = {
	// id: "401",
	// šifra: 230,
	naziv: 'Željko 230',
	adresa: 'Puškarići',
	država: null,
	pošta: 47300,
	mjesto: 'Ogulin',
	porezni_obveznik: null,
	oib: null,
	matični_broj: null,
	šifra_djelatnosti: null,
	identifikacijski_broj: null,
	novčana_jedinica: null,
	dani_za_dospijeće: null,
	postotak_rabata: null,
	internet_stranica: null,
	transakcijski_račun: '2340009321325915',
	ime_prezime_kontakta: null,
	telefon: null,
	elektronska_pošta: null,
	naziv_za_slanje: null,
	adresa_za_slanje: null,
	drzava_za_slanje: null,
	posta_za_slanje: null,
	mjesto_pošte_za_slanje: null,
	naziv_primatelja: null,
	adresa_primatelja: null,
	drzava_primatelja: null,
	pošta_primatelja: null,
	mjesto_primatelja: null
};

export const paymentSlip = {
	poziv_na_broj_platitelja: '',
	poziv_na_broj_primatelja: '',
	iznos: 0.0,
	iban_primatelja: '',
	iban_platitelja: '',
	model_primatelja: '',
	model_platitelja: '',
	sifra_namjene: '',
	datum_izvrsenja: '',
	valuta_placanja: 'EUR',
	// Samo vrijednost X ili ništa
	hitno: 'X',
	ime_i_prezime_platitelja: '',
	ulica_i_broj_platitelja: '',
	ulica_i_broj_primatelja: '',
	postanski_i_grad_platitelja: '',
	postanski_i_grad_primatelja: '',
	naziv_primatelja: '',
	opis_placanja: '',
	nalog: '-'
};

export const primatelj = {
	naziv_primatelja: 'Technicore d.o.o.',
	ulica_i_broj_primatelja: 'Zrinski Trg 4',
	postanski_i_grad_primatelja: `47300 Ogulin`,
	iban_primatelja: 'HR1723600001101234565'
};

export const isp = {
	id: undefined,
	name: null,
	street: null,
	postalCode: null,
	city: null,
	oib: null,
	iban: null
};
