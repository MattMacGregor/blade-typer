import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./home";
import Typer from "./typer";
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import toTypeReducer from "./reducers/toTypeReducer";
import {useEffect} from "react";

const store = configureStore( {
    reducer: {
        toType: toTypeReducer,
    }
});

function App() {
  useEffect(() => {
      document.body.id = "crt"
  }, [])

  return (
    <Provider store={store}>
      <div className="scanline"></div>
      <BrowserRouter>
            <Routes>
                <Route index path="/*" element={<Home/>} />
                <Route path="/typer" element={<Typer/>} />
            </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
