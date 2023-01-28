import React from 'react';
import { Features } from './components/Features';
import {BrowserRouter , Routes ,Route} from 'react-router-dom';
import {Login} from './components/Login'
import {Dashboard} from './components/Dashboard'
import {Sidebar} from './components/Sidebar'
import { SignUpPage } from './components/SignUpPage';
function App() {
  return (
   	<>
	<BrowserRouter>
	<Routes>
		<Route path='/' element={<Features/>}/>
		<Route path='/login' element={<Login/>}/>
		<Route path='/dashboard' element={<Dashboard/>}/>
		<Route path='/onboarding' element={<SignUpPage/>}/>
	</Routes>
	</BrowserRouter>
	</>
  );
}

export {
	App
}
