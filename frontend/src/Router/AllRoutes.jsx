import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import PrivateRouter from './PrivateRouter'
import CreateEvent from '../pages/CreateEvent'
import Event from '../pages/Event'
import Requests from '../pages/Requests'
import MyEvents from '../pages/MyEvents'

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
        <Route path="/requests" element={<PrivateRouter>
          <Requests/>
        </PrivateRouter>}/>
        <Route path="/myEvents" element={<PrivateRouter>
          <MyEvents/>
        </PrivateRouter>}/>
    </Routes>
  )
}

export default AllRoutes