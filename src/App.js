import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import {useEffect} from "react";
import {Container} from "react-bootstrap";
import toTypeReducer from "./reducers/toTypeReducer";
import userReducer from "./reducers/user-reducer";
import uiReducer from "./reducers/ui-reducer"
import searchReducer from "./reducers/search-reducer"
import AppIndex from "./AppIndex.js"

const store = configureStore( {
    reducer: {
        toType: toTypeReducer,
        users: userReducer,
        ui: uiReducer, 
        search: searchReducer,
    }
});

function App() {
  useEffect(() => {
      document.body.classList.add("crt");
  }, [])
    return (
        <Provider store={store}>
            <div className="scanline"></div>
            <Container>
                <AppIndex/>
            </Container>
        </Provider>
    );
}

export default App;
