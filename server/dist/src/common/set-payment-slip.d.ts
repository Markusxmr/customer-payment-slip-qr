export declare let primatelj: {
    naziv_primatelja: string;
    ulica_i_broj_primatelja: string;
    postanski_i_grad_primatelja: string;
    iban_primatelja: string;
};
export declare function setPaymentSlip({ isp, customer }: {
    isp: any;
    customer: any;
}): {
    hitno: string;
    ime_i_prezime_platitelja: any;
    ulica_i_broj_platitelja: any;
    ulica_i_broj_primatelja: string;
    postanski_i_grad_platitelja: string;
    postanski_i_grad_primatelja: string;
    naziv_primatelja: string;
    customer_id: number;
    isp_id: any;
};
