import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const Auth = () => {
    const [current, setCurrent] = React.useState("login")
  return (
    <Box width={"300px"} margin={"100px auto"}>
        <Flex justify={"space-between"}>
            <Box flex={1} cursor={"pointer"} padding={"5px 10px"} onClick={()=>setCurrent("login")} bgColor={current==="login"?"blue.200":"white"} color={current==="login"?"white":"black"}>Login</Box>
            <Box flex={1} cursor={"pointer"} padding={"5px 10px"} onClick={()=>setCurrent("register")} bgColor={current==="register"?"blue.200":"white"} color={current==="register"?"white":"black"}>Register</Box>
        </Flex>
        <Box bgColor={"blue.200"}>
            {current==="login"?<Login/>:<Register setCurrent={setCurrent}/>}
        </Box>
    </Box>
  )
}

export default Auth