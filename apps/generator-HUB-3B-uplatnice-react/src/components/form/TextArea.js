import React from "react";
import { connect } from "./ReduxConnector";

const TextArea = (props) => {
  let className =
    "form-field " +
    (props.className ? props.className : "") +
    (props.invalid ? " form-field-invalid" : "");

  return (
    <textarea
      className={className}
      id={props.id}
      cols="33"
      rows="4"
      onChange={props.onChange}
      value={props.value}
      placeholder={props.label}
    />
  );
};

const ConnectedTextArea = connect(TextArea);

export { TextArea, ConnectedTextArea };
