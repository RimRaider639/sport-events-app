import { Flex, Input, Select, Textarea, Text, Button } from '@chakra-ui/react'
import React from 'react'
import axios from 'axios'
import url from '../url'

const initForm = {
  title: "",
  sport: "",
  location: "",
  startTime: "",
  endTime: "",
  description: "",
  playersLimit: 0,
  requirements: [],
}

const CreateEvent = () => {
  const [form, setForm] = React.useState(initForm)
  const [loading, setLoading] = React.useState(false)
  const onChange = (e) => {
    if (e.target.name==="requirements"){
      setForm({...form, requirements: e.target.value.split(", ")})
      return;
    }
    setForm({...form, [e.target.name]:e.target.value})
  }
  const onSubmit = (e) => {
    e.preventDefault()
    for (let key in form){
      if (!form[key]){
        alert(key + " is required!")
        return;
      }
    }
    console.log(form)
    setLoading(true)
    axios.post(url+"events", form, {headers: {token: sessionStorage.getItem("sports-app-token")}})
    .then(res=>alert(res.data.message))
    .catch(err=>console.log(err))
    .finally(()=>setLoading(false))
  }
  return (
    <form onSubmit={onSubmit}>
      <Flex direction={"column"} width={"600px"} margin={"100px auto"} gap={"10px"}>
        <Input name="title" value={form.title} onChange={onChange} placeholder="Title"/>
        <Select placeholder='Select Sport' onChange={onChange} name="sport">
          <option value="Badminton">Badminton</option>
          <option value="Football">Football</option>
          <option value="Cricket">Cricket</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Table Tennis">Table Tennis</option>
          <option value="Lawn Tennis">Lawn Tennis</option>
          <option value="Chess">Chess</option>
          <option value="Carrom">Carrom</option>
        </Select>
        <Input name="location" value={form.location} onChange={onChange} placeholder="Location"/>
        <Input name="startTime" type='datetime-local' value={form.startTime} onChange={onChange} placeholder="Start Time"/>
        <Input name="endTime" type="datetime-local" value={form.endTime} onChange={onChange} placeholder="Expected End Time"/>
        <Flex align={"center"} gap={"30px"}>
          <Text width={"50%"}>Player limit: </Text>
          <Input name="playersLimit" type="number" value={form.playersLimit} onChange={onChange} placeholder="player limit"/>
        </Flex>
        <Textarea name="description" value={form.description} onChange={onChange} placeholder="Description"/>
        <Textarea name="requirements" value={form.requirements.join(", ")} onChange={onChange} placeholder="Requirements (seperated by comma)"/>
        <Button type="submit" isLoading={loading}>Create Event</Button>
      </Flex>
    </form>
  )
}

export default CreateEvent