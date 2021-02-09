import React from "react";
import { connect } from "react-redux";
import { FormatCurrency } from "../Format";

const Potvrda = (props) => (
  <fieldset className="fieldset-potvrda">
    <div className="potvrda-field potvrda-field--iznos">{props.iznos}</div>
    <div className="potvrda-field potvrda-field--iban-platitelja">
      {props.iban_platitelja}
    </div>
    <div className="potvrda-field potvrda-field--model-i-poziv-na-broj-platitelja">
      {props.model_primatelja} {props.poziv_na_broj_platitelja}
    </div>
    <div className="potvrda-field potvrda-field--iban-primatelja">
      {props.iban_primatelja}
    </div>
    <div className="potvrda-field potvrda-field--model-i-poziv-na-broj-primatelja">
      {props.model_primatelja} {props.poziv_na_broj_platitelja}
    </div>
    <div className="potvrda-field potvrda-field--opis-placanja">
      {props.opis_placanja}
    </div>
  </fieldset>
);

const mapStateToProps = (state, ownProps) => {
  let nalog = state.nalog;

  return {
    iznos: FormatCurrency(nalog.iznos),
    iban_platitelja: nalog.iban_platitelja,
    iban_primatelja: nalog.iban_primatelja,
    model_primatelja: nalog.model_primatelja,
    model_platitelja: nalog.model_platitelja,
    poziv_na_broj_platitelja: nalog.poziv_na_broj_platitelja,
    poziv_na_broj_primatelj: nalog.poziv_na_broj__primatelj,
    opis_placanja: nalog.opis_placanja,

    ...ownProps, // ovo su svi ostali property-i koji mogu biti zadani
  };
};

const ConnectedPotvrda = connect(mapStateToProps)(Potvrda);

export { Potvrda, ConnectedPotvrda };
