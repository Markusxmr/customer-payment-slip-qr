import { UPDATE_VALUE, CLEAR_FORM, LOAD_NALOG } from "./actions";

const _defaultState = {
  nalog: {
    poziv_na_broj_platitelja: "",
    poziv_na_broj_primatelja: "",
    iznos: "",
    iban_primatelja: "",
    iban_platitelja: "",
    model_primatelja: "",
    model_platitelja: "HR05",
    sifra_namjene: "",
    datum_izvrsenja: "10022016",
    valuta_placanja: "HRK",
    hitno: "X",
    ime_i_prezime_platitelja: "",
    ime_i_prezime_primatelja: "",
    ulica_i_broj_platitelja: "",
    ulica_i_broj_primatelja: "",
    postanski_i_grad_platitelja: "",
    postanski_i_grad_primatelja: "",
    naziv_primatelja: "",
    opis_placanja: "",
    naziv: "",
  },
};

const nalog = (state, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return Object.assign({}, state, { [action.id]: action.value });
    case CLEAR_FORM:
      return Object.assign({}, state, _defaultState.nalog);
    case LOAD_NALOG:
      return Object.assign({}, state, action.nalog);
  }

  return state;
};

const reducer = (state = _defaultState, action) => {
  return {
    nalog: nalog(state.nalog, action),
  };
};

export { reducer };
