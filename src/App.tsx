import React, {Component} from 'react';
import './App.css';

import {Provider} from "react-redux";
import {store} from "./Bll/store";

import Main from "./UI/Main";



const App =() =>{
        return (
            <Provider store={store}>
                <div className="App">
                   <Main/>
                </div>
            </Provider>
        );
    }

export default App;
