import React from "react";
import { SelectBase } from "./SelectBase";
import { connect } from "./ReduxConnector";
import BarcodePayment from "../../lib/BarcodePayment";

const PaymentModels = (props) => {
  return (
    <SelectBase {...props}>
      <option key="" value=""></option>
      {BarcodePayment.PaymentModels.map(({ model }) => (
        <option key={model} value={"HR" + model}>
          {"HR" + model}
        </option>
      ))}
    </SelectBase>
  );
};

const ConnectedPaymentModels = connect(PaymentModels);

export { PaymentModels, ConnectedPaymentModels };
