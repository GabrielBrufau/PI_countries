import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Countries from './components/countriesCards/countries/Countries.js';
import './cssRoot/App.css';
import Landing from './components/landing/Landing.js';
import DetailCountry from './components/detailCountry/DetailCountry.js';
import Home from './components/home/Home.js';
function App() {
  return (
	  	<BrowserRouter>
       	<div>
	 <Routes>
	  <Route exact path="/" element={<Landing/>} />
	  <Route path="/home" element={<Home/>} />
	  <Route path="/home/:id" element={<DetailCountry/>} />
	 </Routes>
    	</div>
	  	</BrowserRouter>
  );
}

export default App;
