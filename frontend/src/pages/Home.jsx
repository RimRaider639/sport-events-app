import React from 'react'
import axios from 'axios'
import url from '../url'
import { Box, SimpleGrid } from '@chakra-ui/react'
import EventCard from '../components/EventCard'

const Home = () => {
  const [events, setEvents] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  React.useEffect(()=>{
    setLoading(true)
    axios.get(url+"events", {headers:{token: localStorage.getItem("sports-app-token")}})
    .then(res=>setEvents(res.data))
    .catch(console.log)
    .finally(()=>setLoading(false))
  }, [])
  return (
    <Box width={"80%"} margin={"30px auto"}>
      <SimpleGrid columns={3} gap={"20px"}>
        {events.map(e=><EventCard event={e}/>)}
      </SimpleGrid>
    </Box>
  )
}

export default Home