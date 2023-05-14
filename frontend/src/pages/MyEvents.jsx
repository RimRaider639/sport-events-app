import React from 'react'
import axios from 'axios'
import url from '../url'
import { Flex } from '@chakra-ui/react'
import MyEventCard from '../components/MyEventCard'

const MyEvents = () => {
    const [events, setEvents] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    React.useEffect(()=>{
        setLoading(true)
        axios.get(url+"events/personal", {headers:{token: sessionStorage.getItem("sports-app-token")}})
        .then(res=>setEvents(res.data))
        .catch(err=>setError(true))
        .finally(()=>setLoading(false))
    }, [])
    console.log(events)
  return (
    <Flex direction={"column"}>
        {loading?<>Loading...</>:
        error? <>Some error occured, please refresh the page...</>:
        <>
            {events.map((e, i)=><MyEventCard key={i} event={e}/>)}
        </>}
    </Flex>
  )
}

export default MyEvents