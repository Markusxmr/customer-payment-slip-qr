import React from "react";
import { SelectBase } from "./SelectBase";

const SpremljeniNaloziSelect = (props) => {
  return (
    <SelectBase label="Šifra namjene" {...props} buttons={props.children}>
      {props.popisNaloga.map((el, ix) => (
        <option key={el.key} value={el.key}>
          {el.naziv || el.key}
        </option>
      ))}
    </SelectBase>
  );
};

export { SpremljeniNaloziSelect };
