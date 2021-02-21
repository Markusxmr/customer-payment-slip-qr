export declare function setPartialPaymentSlip(isp: any): {
    iban_primatelja: any;
    ulica_i_broj_primatelja: string;
    postanski_i_grad_primatelja: string;
    naziv_primatelja: any;
    model_primatelja: string;
    isp_id: any;
};
export declare function setPaymentSlip({ isp, customer }: {
    isp: any;
    customer: any;
}): {
    iban_primatelja: any;
    ulica_i_broj_primatelja: string;
    postanski_i_grad_primatelja: string;
    naziv_primatelja: any;
    model_primatelja: string;
    isp_id: any;
    iban_platitelja: string;
    sifra_namjene: string;
    datum_izvrsenja: string;
    valuta_placanja: string;
    hitno: string;
    ime_i_prezime_platitelja: any;
    ulica_i_broj_platitelja: any;
    postanski_i_grad_platitelja: string;
    opis_placanja: string;
    customer_id: number;
};
