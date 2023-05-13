import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import PrivateRouter from './PrivateRouter'
import CreateEvent from '../pages/CreateEvent'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<PrivateRouter>
            <Home/>
        </PrivateRouter>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/createEvent" element={<PrivateRouter>
            <CreateEvent/>
        </PrivateRouter>}/>
    </Routes>
  )
}

export default AllRoutes