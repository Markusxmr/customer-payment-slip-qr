import React from "react";

const SelectBase = (props) => {
  let className = "form-field " + props.className;

  return (
    <div>
      <select
        className={className}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
      >
        {props.children}
      </select>
      {props.buttons}
    </div>
  );
};

export { SelectBase };
