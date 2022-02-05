import React from "react";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AppRouter from "./routes";
import NavBar from "./components/NavBar";
import { ToastProvider } from 'react-toast-notifications';

const App = observer(() => {
    return (
        <ToastProvider>
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
            </BrowserRouter>
        </ToastProvider>
    );
});

export default App;
