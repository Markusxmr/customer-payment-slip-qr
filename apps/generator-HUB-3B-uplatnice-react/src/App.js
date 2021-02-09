import React from "react";
import { ConnectedLoadDialog } from "./components/LoadDialogContainer";
import { ConnectedSaveDialog } from "./components/SaveDialogContainer";
import { Forma } from "./components/Forma";
import { reducer } from "./redux/reducers";
import BarcodePayment from "./lib/BarcodePayment";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(reducer);
class App extends React.Component {
  constructor(props) {
    super(props);

    BarcodePayment.Init({
      ValidateIBAN: false, // Validation is not yet implemented
      ValidateModelPozivNaBroj: true, // Validation is not yet implemented
    });
  }

  render() {
    return (
      <div>
        <Provider store={store}>
          <div>
            <ConnectedSaveDialog />
            <ConnectedLoadDialog />
            <Forma />
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
