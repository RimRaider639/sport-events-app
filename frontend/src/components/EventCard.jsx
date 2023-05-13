import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import {HiLocationMarker} from 'react-icons/hi'

const getDate = (time) => {
    const date = new Date(time)
    return date.toDateString()
}
const getTime = (time) => {
    const date = new Date(time)
    return date.getHours()+":"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())
}

const EventCard = ({event}) => {
    const {title, user, sport, location, startTime, endTime} = event
  return (
    <Flex direction={"column"} border={"2px solid purple"} padding={"10px"} borderRadius={"10px"} _hover={{bgColor: "purple.100"}} cursor={"pointer"}>
        <Text fontWeight={600}>{title}</Text>
        <Text fontSize={"14px"} color={"blackAlpha.600"}>Posted by {user.username}</Text>
        <Text>{sport}</Text>
        <Flex align={"center"} gap={"5px"}>
            <HiLocationMarker/>
            <Text>{location}</Text>
        </Flex>
        <Text>{getDate(startTime)}</Text>
        <Text>{getTime(startTime)} to {getTime(endTime)}</Text>
    </Flex>
  )
}

export default EventCard