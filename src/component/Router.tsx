import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Join from '../screen/Join';
import Login from '../screen/Login';
import NotiList from '../screen/NotiList';
import NotiReg from '../screen/NotiReg';
import PrivateRoute from '../screen/PrivateRoute';
import Test from './Test';
import Logout from '../screen/Logout';

const Router = () => {
    return (
        <>
            <Routes>
                {/* 회원 전용 */}
                <Route element={<PrivateRoute />}>
                    <Route path='/noti/reg' element={<NotiReg />}/>
                    <Route path='/noti/list' element={<NotiList />}/>
                </Route>

                {/* 누구나 */}
                <Route path='/test' element={<Test />}/>

                <Route path='/login' element={<Login />}/>
                <Route path='/auth/join' element={<Join />}/>
                <Route path='/logout' element={<Logout />}/>
            </Routes>
        </>
    );
};

export default Router;