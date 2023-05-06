import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./redux/store";
import App from "./App";
import "./index.css";
import { SkeletonTheme } from "react-loading-skeleton";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <SkeletonTheme
            baseColor="var(--card-background-color)"
            highlightColor="var(--global-background-color)"
          >
            <App />
          </SkeletonTheme>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
