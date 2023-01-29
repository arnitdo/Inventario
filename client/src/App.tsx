import React, {createContext, useState} from 'react';
import { Features } from './components/Features';
import {BrowserRouter , Routes ,Route} from 'react-router-dom';
import {Login} from './components/Login'
import {Dashboard} from './components/Dashboard'
import { SignUpPage } from './components/SignUpPage';

export type UserRole = 'ADMINISTRATOR' | 'EMPLOYEE'

export type AuthContextType = {
  isAuthenticated: boolean,
  authenticatedOrg?: string
  authenticatedRole?: UserRole
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false, authenticatedOrg: undefined, authenticatedRole: undefined
})

function App() {

  const [authState, setAuthState] = useState<AuthContextType>({
    isAuthenticated: false,
    authenticatedOrg: undefined,
    authenticatedRole: undefined
  })

  return (
    <>
      <AuthContext.Provider value={authState}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Features/>}/>
            <Route path='/login' element={<Login setAuthState={setAuthState} />}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/onboarding' element={<SignUpPage/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export {
  App
}
