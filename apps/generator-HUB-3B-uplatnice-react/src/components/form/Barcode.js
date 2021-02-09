import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { nalog2params } from "../../lib/paymentParamsFacade";
import BarcodePayment from "../../lib/BarcodePayment";
import PDF417 from "../../lib/pdf417";

const Barcode = (props) => {
  const canvasRef = React.useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [currentProps, setCurrentProps] = useState({});

  useEffect(() => {
    if (props !== currentProps) {
      setCurrentProps(props);
      updateCanvas();
    }
  });

  // shouldComponentUpdate(newProps, newState) {
  //   return JSON.stringify(newProps) !== JSON.stringify(props);
  // }

  function updateCanvas() {
    const encodedText = props.encodedText;

    if (encodedText == BarcodePayment.ResultCode.InvalidContent) {
      showError(
        "Sadržaj forme nije ispravan!",
        "2D kod ne može biti generiran!"
      );
      return;
    } else if (
      encodedText == BarcodePayment.ResultCode.InvalidObject ||
      stringNotDefinedOrEmpty(encodedText)
    ) {
      showError("Pri generiranju 2D koda", "došlo je do tehničke greške!");
      return;
    }

    // Barcode generation sample copied from library sample
    PDF417.init(encodedText);
    let barcode = PDF417.getBarcodeArray();

    // block sizes (width and height) in pixels
    let bw = 2;
    let bh = 2;

    const canvas = canvasRef.current;
    canvas.width = bw * barcode["num_cols"];
    canvas.height = bh * barcode["num_rows"];

    let ctx = canvas.getContext("2d");
    // graph barcode elements
    let y = 0;
    // for each row
    for (let r = 0; r < barcode["num_rows"]; ++r) {
      let x = 0;
      // for each column
      for (let c = 0; c < barcode["num_cols"]; ++c) {
        if (barcode["bcode"][r][c] == 1) {
          ctx.fillRect(x, y, bw, bh);
        }
        x += bw;
      }
      y += bh;
    }
  }

  function stringNotDefinedOrEmpty(str) {
    return str == undefined || str == null || str.length == 0;
  }

  function showError(errorText1, errorText2) {
    const canvas = canvasRef.current;
    canvas.width = 238;
    canvas.height = 100;

    const ctx = canvas.getContext("2d");

    ctx.font = "14px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(errorText1, 30, 35);
    ctx.fillText(errorText2, 30, 55);
  }

  return <canvas className="uplatnica__barcode" ref={canvasRef} />;
};

const mapStateToProps = (state, ownProps) => {
  return {
    encodedText: BarcodePayment.GetEncodedText(nalog2params(state.nalog)),
    ...ownProps, // ovo su svi ostali property-i koji mogu biti zadani
  };
};

const ConnectedBarcode = connect(mapStateToProps)(Barcode);

export { Barcode, ConnectedBarcode };
