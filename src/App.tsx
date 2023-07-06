import Router from "./dashboard/components/Router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./dashboard/redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  document.title = "Akalaty";

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
