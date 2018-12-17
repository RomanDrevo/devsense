import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import bootstrapper from './bootstrapper';
import {Provider} from "mobx-react";
import 'basscss/css/basscss.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from 'react-router-dom';
import 'basscss/css/basscss.css';

const injectables = bootstrapper()
// console.log('injectables: ', injectables)

ReactDOM.render(<Router>
    <Provider {...injectables}><App /></Provider>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
