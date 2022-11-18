import { GlobalContext } from './GlobalContext';
import { useContext } from 'react';
import { NativeRouter, Route, Routes } from "react-router-native";
import { Todo } from './Todo';
import { Login } from './Login'
import { Register } from './Register'
import { Forgot } from './Forgot';

export function Router() {

    const { isLogin } = useContext(GlobalContext);

    return (
        <NativeRouter>
            <Routes>
                <Route exact path="/" element={isLogin ? <Todo /> : <Login />}></Route>
                <Route exact path="/register" element={isLogin ? <Todo /> : <Register />}></Route>
                <Route exact path="/forgot" element={isLogin ? <Todo /> : <Forgot />}></Route>
            </Routes>
        </NativeRouter>
    );
}