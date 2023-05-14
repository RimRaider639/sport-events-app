import { Box, Button, Flex, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router'
import url from '../url'
import { getDate, getTime, checkElapsed } from '../utils/date-time'
import {HiLocationMarker} from 'react-icons/hi'

const Event = () => {
    const {id} = useParams()
    const [event, setEvent] = React.useState(null)
    const [eventLoading, setEventLoading] = React.useState(false)
    const [eventError, setEventError] = React.useState(false)
    const [requested, setRequested] = React.useState(false)
    const onJoin = () => {
        axios.post(url+"requests/create", {
            event: id,
        }, {
            headers: {token: localStorage.getItem("sports-app-token")}
        })
        .then(res=>setRequested(true))
        .catch(err=>console.log(err))
    }
    React.useEffect(()=>{
        setEventLoading(true)
        axios.get(url+`events/${id}`, {headers: {token: localStorage.getItem("sports-app-token")}})
        .then(res=>setEvent(res.data))
        .catch(err=>setEventError(true))
        .finally(()=>setEventLoading(false))
    }, [])
    React.useEffect(()=>{
        axios.get(url+`requests/hasRequested/${id}`, {headers: {token: localStorage.getItem("sports-app-token")}})
        .then(res=>setRequested(res.data.hasRequested))
        .catch(err=>console.log(err))
    }, [])
  return (
    <Box>
        <Flex width={"100%"}>
            <Flex direction={"column"} padding={"30px"} gap={"20px"} w={"70%"}>
                {eventLoading?<>Loading...</>:
                eventError?<>Error occured, please refresh the page...</>:
                event?<>
                    <Flex direction={"column"}>
                        <Heading size={"lg"}>{event.title}</Heading>
                        <Text fontSize={"14px"} color={"blackAlpha.600"}>Posted by {event.user.username}</Text>
                        <Text>{event.sport}</Text>
                        <Text>Players Limit: {event.playersLimit}</Text>
                    </Flex>
                    <Flex direction={"column"} gap={"5px"}>
                        <Heading size={"xs"}>Location</Heading>
                        <Flex align={"center"} gap={"5px"}>
                                <HiLocationMarker/>
                                <Text fontSize={"14px"}>{event.location}</Text>
                        </Flex>
                    </Flex>
                    <Flex direction={"column"} gap={"5px"}>
                        <Heading size={"xs"}>Description</Heading>
                        <Text fontSize={"14px"}>{event.description}</Text>
                    </Flex>
                    <Flex direction={"column"} gap={"5px"}>
                        <Heading size={"xs"}>Timings</Heading>
                        <Text fontSize={"14px"}>{getDate(event.startTime)}</Text>
                        <Text fontSize={"14px"}>{getTime(event.startTime)} to {getTime(event.endTime)}</Text>
                    </Flex>
                    <Flex direction={"column"} gap={"5px"}>
                        <Heading size={"xs"}>Requirements</Heading>
                        <UnorderedList>
                            {event.requirements.map((r, i)=><ListItem key={i} fontSize={"14px"}>{r}</ListItem>)}
                        </UnorderedList>
                        
                    </Flex>
                    <Flex>
                        <Button onClick={onJoin} colorScheme='pink' isDisabled={checkElapsed(event.startTime) || requested}>{checkElapsed(event.startTime)?"Started":checkElapsed(event.endTime)?"Ended":requested?"Requested":"Join"}</Button>
                    </Flex>
                </>:
                <>Event doesn't exist.</>}
            </Flex>
            <Flex direction={"column"} padding={"30px"} gap={"20px"}>
                <Heading size={"md"}>Joiners</Heading>
                <Flex direction={"column"} gap={"5px"}>
                    {event?.joiners?<>
                        {event.joiners.length?event.joiners.map((j, i)=><Text key={i}>{j.username}</Text>):
                        <>No participants yet</>}
                    </>:
                    <>Only participants can see other joiners.</>}
                </Flex>
            </Flex>
        </Flex>
    </Box>
  )
}

export default Event