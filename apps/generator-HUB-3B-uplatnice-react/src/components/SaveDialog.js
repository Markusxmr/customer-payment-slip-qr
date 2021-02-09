import React from "react";
import { TextInput } from "./form/TextInput";

const SaveDialog = (props) => {
  function handleClick(ev) {
    ev.preventDefault();

    switch (ev.target.name) {
      case "save":
        props.onSave2BrowserClick();
        break;
      case "download":
        props.onSave2FileClick();
        break;
    }
  }

  function handleNazivChange(ev) {
    props.onNazivChange(ev.target.value);
  }

  return (
    <fieldset className="fieldset-save-dialog">
      <TextInput
        id="naziv_naloga"
        label="Naziv naloga"
        value={props.naziv_naloga}
        onChange={handleNazivChange}
      >
        <button name="save" onClick={handleClick}>
          Spremi u web preglednik
        </button>
        &nbsp;
        <button name="download" onClick={handleClick}>
          Spremi u datoteku
        </button>
      </TextInput>
      <span className="fieldset-save-dialog__hint">
        Ako popunjeni nalog planirate još koji puta koristiti možete ga trajno{" "}
        <strong>spremiti</strong> u memoriju web preglednika ili{" "}
        <strong>preuzeti</strong> u obliku datoteke na lokalno računalo.
      </span>
      <span
        className={
          "fieldset-validation-msg fieldset-validation-msg-" +
          props.validationMsgType
        }
      >
        {props.validationMsg}
      </span>
    </fieldset>
  );
};

export { SaveDialog };
