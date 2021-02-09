import React from "react";
import { SpremljeniNaloziSelect } from "./form/SpremljeniNaloziSelect";

const LoadDialog = (props) => {
  const loadFileRef = React.useRef();
  const popisNaloga = props.popisNaloga;

  function handleInputChange(event) {
    props.onNalogSelected(event.target.value);
  }

  function handleClick(ev) {
    ev.preventDefault();

    switch (ev.target.id) {
      case "fieldset-load-dialog__load":
        props.onNalogUcitaj();
        break;
      case "fieldset-load-dialog__delete":
        props.onNalogBrisi();
        break;
      case "fieldset-load-dialog__load-file-button":
        // simuliram klik na skrivenu tipku
        loadFileRef.current.click();
        break;
    }
  }

  // source: https://www.html5rocks.com/en/tutorials/file/dndfiles/
  function handleFileSelected(ev) {
    props.onFileSelected(ev.target.files[0]);
    // resetiran sadržaj inputa tako da ako korisnik
    // još jednom odabere istu datoteku stvar generira `change` događaj
    ev.target.value = null;
  }

  return (
    <fieldset className="fieldset-load-dialog">
      <SpremljeniNaloziSelect
        popisNaloga={popisNaloga}
        value={props.selectedKey}
        onChange={handleInputChange}
      >
        <button
          id="fieldset-load-dialog__load"
          onClick={handleClick}
          disabled={popisNaloga.length == 0}
        >
          Učitaj odabrani nalog
        </button>
        <button
          id="fieldset-load-dialog__delete"
          onClick={handleClick}
          disabled={popisNaloga.length == 0}
        >
          Obriši odabrani nalog
        </button>
        <input
          className="fieldset-load-dialog__load-file"
          type="file"
          id="load-file"
          name="load-file"
          onChange={handleFileSelected}
          accept=".json"
          ref={loadFileRef}
        />
        <button
          className="fieldset-load-dialog__load-file-button"
          id="fieldset-load-dialog__load-file-button"
          onClick={handleClick}
        >
          Učitaj nalog iz datoteke
        </button>
      </SpremljeniNaloziSelect>
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

export { LoadDialog };
