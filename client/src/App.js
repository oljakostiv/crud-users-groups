import React from "react";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AppRouter from "./routes";
import NavBar from "./components/NavBar";

const App = observer(() => {
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
