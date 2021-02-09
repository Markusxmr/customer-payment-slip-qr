import React from "react";
import { SelectBase } from "./SelectBase";
import { connect } from "./ReduxConnector";
import BarcodePayment from "../../lib/BarcodePayment";

const IntentCodes = (props) => {
  return (
    <SelectBase {...props}>
      <option key="" value=""></option>
      {BarcodePayment.IntentCodes.map((el) => (
        <option key={el.code} value={el.code}>
          {el.code + " -  " + el.title}
        </option>
      ))}
    </SelectBase>
  );
};

const ConnectedIntentCodes = connect(IntentCodes);

export { IntentCodes, ConnectedIntentCodes };
