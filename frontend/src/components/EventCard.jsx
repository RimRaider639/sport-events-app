import { Flex, Tag, TagLabel, Text } from '@chakra-ui/react'
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
        <Flex>
            <Tag colorScheme='purple'>
                <TagLabel>{sport}</TagLabel>
            </Tag>
        </Flex>
        
        <Flex align={"center"} gap={"5px"}>
            <HiLocationMarker/>
            <Text>{location}</Text>
        </Flex>
        <Text>{getDate(startTime)}</Text>
        <Flex>
            <Tag colorScheme='purple'>
                <TagLabel>{checkElapsed(endTime)?"Ended":checkElapsed(startTime)?"Started":getTime(startTime) + " to " + getTime(endTime)}</TagLabel>
            </Tag>
        </Flex>
    </Flex>
  )
}

export default EventCard