import React from 'react'
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import axios from "axios"
import url from '../url'
import { useNavigate } from 'react-router'

const initForm = {
    username : "", 
    password : ""
}

const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = React.useState(initForm)
    const [loading, setLoading] = React.useState(false)
    const onChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault()
        for (let key in form){
            if (!form[key]){
                alert(key+" is required!")
                return;
            }
        }
        setLoading(true)
        axios.post(url+"users/login", form)
        .then(res=>{
            sessionStorage.setItem("sports-app-token", res.data.token)
            alert(res.data.message)
            navigate("/")
        })
        .catch(err=>alert(err.response.data.message))
        .finally(()=>setLoading(false))
    }
  return (
    <form onSubmit={onSubmit}>
        <Flex direction={"column"} gap={"20px"} padding={"20px"}>
            <Input name="username" value={form.username} onChange={onChange} placeholder='Username'/>
            <Input name="password" value={form.password} onChange={onChange} placeholder='Password' type="password"/>
            <Button isLoading={loading} type='submit'>Login</Button>
        </Flex>
    </form>
  )
}

export default Login