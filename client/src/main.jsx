import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";
import "./index.css";

const root = document.getElementById("root");

createRoot(root).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
);
