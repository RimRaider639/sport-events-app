import axios from 'axios'
import React from 'react'
import url from '../url'
import { Badge, Flex, Text } from '@chakra-ui/react'
import { getTime, getDate, checkElapsed } from '../utils/date-time'
import {HiLocationMarker} from 'react-icons/hi'
import { useNavigate } from 'react-router'

const Requests = () => {
    const [requests, setRequests] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const navigate = useNavigate()
    React.useEffect(()=>{
        setLoading(true)
        axios.get(url+"requests", {headers: {token: sessionStorage.getItem("sports-app-token")}})
        .then(res=>setRequests(res.data))
        .catch(err=>setError(true))
        .finally(()=>setLoading(false))
    }, [])
  return (
    <Flex direction={"column-reverse"}  width={"70%"} margin={"20px auto"} gap={"10px"}>
        {
            loading? <>Loading...</>:
            error? <>Some error occurred, please refresh the page...</>:
            <>
                {requests.map((r, i)=>{
                    const {event, status} = r
                    return <>
                        {(r.status==="Pending" && checkElapsed(r.expireAt))?<></>:
                        <Flex cursor={"pointer"} _hover={{bgColor: "purple.100"}} onClick={()=>navigate(`/event/${event._id}`)} key={i} justify={"space-between"} border={"1px solid purple"} borderRadius={"10px"} padding={"20px"}>
                            <Flex direction={"column"}>
                                <Text fontWeight={600}>{event.title}</Text>
                                <Text>{event.sport}</Text>
                                <Flex align={"center"} gap={"5px"}>
                                    <HiLocationMarker/>
                                    <Text>{event.location}</Text>
                                </Flex>
                                <Text>{getDate(event.startTime)}</Text>
                                <Text>{checkElapsed(event.endTime)?"Ended":checkElapsed(event.startTime)?"Started":getTime(event.startTime) + " to " + getTime(event.endTime)}</Text>
                            </Flex>
                            <Flex align={"center"}>
                                <Badge variant="outline" colorScheme={status==="Pending"?"orange":status==="Accepted"?"green":"red"}>{status}</Badge>
                            </Flex>
                        </Flex>}
                    </>
                })}
            </>
        }
    </Flex>
  )
}

export default Requests