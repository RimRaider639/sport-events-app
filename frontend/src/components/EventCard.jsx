import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import {HiLocationMarker} from 'react-icons/hi'
import { useNavigate } from 'react-router'
import {getDate, getTime, checkElapsed} from '../utils/date-time'


const EventCard = ({event}) => {
    const {title, user, sport, location, startTime, endTime, _id} = event
    const navigate = useNavigate()
    const redirect = () => {
        navigate(`/event/${_id}`)
    }
  return (
    <Flex onClick={redirect} direction={"column"} border={"2px solid purple"} padding={"10px"} borderRadius={"10px"} _hover={{bgColor: "purple.100"}} cursor={"pointer"} boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
        <Text fontWeight={600}>{title}</Text>
        <Text fontSize={"14px"} color={"blackAlpha.600"}>Posted by {user.username}</Text>
        <Text>{sport}</Text>
        <Flex align={"center"} gap={"5px"}>
            <HiLocationMarker/>
            <Text>{location}</Text>
        </Flex>
        <Text>{getDate(startTime)}</Text>
        <Text>{checkElapsed(startTime)?"Started":checkElapsed(endTime)?"Ended":getTime(startTime) + "to" + getTime(endTime)}</Text>
    </Flex>
  )
}

export default EventCard