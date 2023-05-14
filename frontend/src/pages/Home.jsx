import React from 'react'
import axios from 'axios'
import url from '../url'
import { Box, Select, SimpleGrid, Flex, Text, Input } from '@chakra-ui/react'
import EventCard from '../components/EventCard'

const initParams = {
  sport: undefined,
  location: "",
}

const Home = () => {
  const [events, setEvents] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [params, setParams] = React.useState(initParams)
  const onFilter = (e) => {
    if (e.target.value==="All") {
      setParams({...initParams})
      return
    }
    setParams({...params, [e.target.name]: e.target.value})
  }
  React.useEffect(()=>{
    setLoading(true)
    setError(false)
    axios.get(url+"events", {
      headers:{token: sessionStorage.getItem("sports-app-token")},
      params
    })
    .then(res=>setEvents(res.data))
    .catch(err=>setError(true))
    .finally(()=>setLoading(false))
  }, [params])
  return (
    <Box width={"80%"} margin={"30px auto"}>
      <Flex align={"center"} marginBottom={"30px"}>
        <Flex flex={1} gap={"30px"} align={"center"}>
          <Text>Filter by Sport</Text>
          <Select width={"50%"} defaultValue={"All"} onChange={onFilter} name="sport">
            <option value="All">All</option>
            <option value="Badminton">Badminton</option>
            <option value="Football">Football</option>
            <option value="Cricket">Cricket</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Table Tennis">Table Tennis</option>
            <option value="Lawn Tennis">Lawn Tennis</option>
            <option value="Chess">Chess</option>
            <option value="Carrom">Carrom</option>
          </Select>
        </Flex>
        <Flex flex={1}>
          <Input name="location" value={params.location} placeholder='Search by location' onChange={onFilter}/>
        </Flex>
      </Flex>
      {loading?<>Loading...</>:
      error?<>Error Occured</>:
      <SimpleGrid columns={3} gap={"20px"}>
      {events.map(e=><EventCard event={e}/>)}
    </SimpleGrid>}
    </Box>
  )
}

export default Home