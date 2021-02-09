import React from "react";
import { ConnectedPaymentModels } from "./form/PaymentModels";
import { ConnectedIntentCodes } from "./form/IntentCodes";
import { ConnectedTextArea } from "./form/TextArea";
import { ConnectedTextInput } from "./form/TextInput";
import { ConnectedPotvrda } from "./form/Potvrda";
import { ConnectedBarcode } from "./form/Barcode";
import { ConnectedButtonBox } from "./form/ButtonBox";

const Forma = (props) => {
  return (
    <form className="uplatnica">
      <img className="uplatnica__img" src="./img/uplatnica.jpg" />
      <fieldset className="fieldset-platitelj">
        <ConnectedTextInput
          id="ime_i_prezime_platitelja"
          label="ime i prezime / naziv"
        />
        <ConnectedTextInput id="ulica_i_broj_platitelja" label="adresa" />
        <ConnectedTextInput
          id="postanski_i_grad_platitelja"
          label="grad/mjesto"
        />
      </fieldset>
      <fieldset className="fieldset-primatelj">
        <ConnectedTextInput
          id="ime_i_prezime_primatelja"
          label="ime i prezime / naziv"
        />
        <ConnectedTextInput id="ulica_i_broj_primatelja" label="adresa" />
        <ConnectedTextInput
          id="postanski_i_grad_primatelja"
          label="grad/mjesto"
        />
      </fieldset>
      <fieldset className="fieldset-brojke">
        <ConnectedTextInput
          id="iznos"
          label="iznos uplate"
          className="form-field--iznos"
        />
        <ConnectedTextInput
          id="poziv_na_broj_platitelja"
          label="Poziv na br platitelja"
          className="form-field--poziv-na-platitelja"
          maxLength={22}
        />
        <br />
        <ConnectedTextInput
          id="iban_primatelja"
          label="IBAN primatelja"
          className="form-field--iban-primatelja"
          maxLength={21}
        />
        <br />
        <ConnectedPaymentModels
          id="model_primatelja"
          className="form-field--model"
        />
        <ConnectedTextInput
          id="poziv_na_broj_platitelja"
          className="form-field--poziv-na-broj-platitelja"
        />
        <ConnectedIntentCodes
          id="sifra_namjene"
          className="form-field--sifra-namjene"
        />
        <ConnectedTextArea
          id="opis_placanja"
          className="form-field--opis"
          label="opis plaćanja"
        />
      </fieldset>
      <ConnectedBarcode {...props} />
      <ConnectedPotvrda />
      <ConnectedButtonBox />
    </form>
  );
};

export { Forma };
