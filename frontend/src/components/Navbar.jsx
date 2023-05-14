import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

const activeStyle = {
  color: "pink.500",
  textDecoration: "underline"
}

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <Flex bgColor={"purple.400"} align={"center"} justify={"space-between"} padding={"20px"}>
      <Flex gap={"20px"}>
        <NavLink style={({isActive})=>isActive?activeStyle:{color:"white"}} to={"/"}>Home</NavLink>
        <NavLink style={({isActive})=>isActive?activeStyle:{color:"white"}} to={"/requests"}>Requests</NavLink>
        <NavLink style={({isActive})=>isActive?activeStyle:{color:"white"}} to={"/myEvents"}>Your Events</NavLink>
        <NavLink style={({isActive})=>isActive?activeStyle:{color:"white"}} to={"/auth"}>Login/Register</NavLink>
      </Flex>
      <Flex gap={"20px"} align={"center"}>
        <Button onClick={()=>navigate("/createEvent")} size={"sm"}>Create Event</Button>
        <ColorModeSwitcher/>
      </Flex>
        
    </Flex>
  )
}

export default Navbar