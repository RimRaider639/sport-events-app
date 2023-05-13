import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <Flex bgColor={"pink.200"} align={"center"} gap={"20px"} padding={"20px"}>
        <Link to={"/"}>Home</Link>
        <Button onClick={()=>navigate("/createEvent")}>Create Event</Button>
        <Link to={"/auth"}>Login/Register</Link>
        <ColorModeSwitcher/>
    </Flex>
  )
}

export default Navbar