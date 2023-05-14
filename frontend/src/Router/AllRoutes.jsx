import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import PrivateRouter from './PrivateRouter'
import CreateEvent from '../pages/CreateEvent'
import Event from '../pages/Event'

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
        <Route path="/event/:id" element={<PrivateRouter>
          <Event/>
        </PrivateRouter>}/>
    </Routes>
  )
}

export default AllRoutes