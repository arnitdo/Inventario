import React from 'react';
import { Features } from './components/Features';
import {BrowserRouter , Routes ,Route} from 'react-router-dom';
import {Sidebar} from './components/Sidebar';
import {Login} from './components/Login'
import {Side} from './components/Side';
function App() {
  return (
   	<>
	<BrowserRouter>
	<Side />
	<Routes>
		<Route path='/' element={<Features/>}/>
		<Route path='/login' element={<Login/>}/>
	</Routes>
	</BrowserRouter>
	</>
  );
}

export {
	App
}
