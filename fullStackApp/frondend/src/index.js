//react
import React from 'react';
import ReactDOM from 'react-dom';
//redux
import {Provider} from 'react-redux'; //esencial sin esto no funciona redux
import {store} from './redux/store.js'//esencial sin esto no funciona redux
//dir
import './cssRoot/index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  			<React.StrictMode>
				<Provider store={store}>
		<App />
				</Provider>
  			</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
