import React from "react";
import {Routes, Route} from 'react-router-dom';
import {GROUPS_ROUTE, USERS_ROUTE} from "./utils/consts";
import { Groups, Users } from './pages';

const AppRouter = () => {
    return (
        <Routes>
            <Route path={ GROUPS_ROUTE } element={<Groups/>}/>
            <Route path={ USERS_ROUTE } element={<Users/>}/>

            <Route path='*' element={<Users/>}/>
        </Routes>
    )
}

export default AppRouter;
