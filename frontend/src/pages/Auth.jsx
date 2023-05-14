import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const Auth = () => {
    const [current, setCurrent] = React.useState("login")
  return (
    <Box width={"300px"} margin={"100px auto"}>
        <Flex justify={"space-between"}>
            <Box flex={1} cursor={"pointer"} padding={"5px 10px"} onClick={()=>setCurrent("login")} bgColor={current==="login"?"purple.400":"transparent"} color={current==="login"?"white":"purple.600"}>Login</Box>
            <Box flex={1} cursor={"pointer"} padding={"5px 10px"} onClick={()=>setCurrent("register")} bgColor={current==="register"?"purple.400":"transparent"} color={current==="register"?"white":"purple.600"}>Register</Box>
        </Flex>
        <Box bgColor={"purple.300"}>
            {current==="login"?<Login/>:<Register setCurrent={setCurrent}/>}
        </Box>
    </Box>
  )
}

export default Auth