import React from 'react'
import axios from 'axios'
import url from '../url'
import { Tag, TagLabel, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import {HiLocationMarker} from 'react-icons/hi'
import {AiOutlineCheck} from 'react-icons/ai'
import {MdClose} from 'react-icons/md'
import {getDate, getTime, checkElapsed} from '../utils/date-time'

const MyEventCard = ({event}) => {
    const {_id, title, location, startTime, endTime, joiners:initJoiners, playersLimit, sport} = event
    const [requests, setRequests] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [joiners, setJoiners] = React.useState(initJoiners)
    const onAccept = (user, id) => {
        axios.get(url+`requests/${id}/accept`, {headers: {token: sessionStorage.getItem("sports-app-token")}})
        .then(res=>{
            alert(res.data.message)
            setJoiners([...joiners, user])
            fetchRequests()
        })
        .catch(err=>console.log(error))
    }
    const onReject = (user, id) => {
        axios.get(url+`requests/${id}/reject`, {headers: {token: sessionStorage.getItem("sports-app-token")}})
        .then(res=>{
            alert(res.data.message)
            fetchRequests()
        })
        .catch(err=>console.log(error))
    }
    const fetchRequests = () => {
        setLoading(true)
        axios.get(url+`requests/${_id}`, {
            headers: {token: sessionStorage.getItem("sports-app-token")},
            params: {
                status: "Pending"
            }
        })
        .then(res=>setRequests(res.data))
        .catch(err=>setError(true))
        .finally(()=>setLoading(false))
    }
    React.useEffect(()=>{
        fetchRequests()
    }, [])
  return (
    <Flex padding={"20px"} fontSize={"14px"} gap={"20px"} width={"100%"}>
        <Flex direction={"column"} flex={2}>
            <Text fontWeight={600}>{title}</Text>
            <Flex>
                <Tag colorScheme='purple'>
                    <TagLabel>{sport}</TagLabel>
                </Tag>
            </Flex>
            <Flex align={"center"} gap={"5px"}>
                <HiLocationMarker/>
                <Text>{location}</Text>
            </Flex>
            <Text>Players limit: {playersLimit}</Text>
            <Text>Avalaible space: {playersLimit-joiners.length}</Text>
            <Flex>
                <Tag colorScheme='purple'>
                    <TagLabel>{checkElapsed(startTime)?"Started":checkElapsed(endTime)?"Ended":getDate(startTime) + " " + getTime(startTime) + "-" + getTime(endTime)}</TagLabel>
                </Tag>
            </Flex>
        </Flex>
        <Flex direction={"column"} flex={1} gap={"5px"}>
            <Heading size={"xs"}>Joiners</Heading>
            {
                joiners.map((j, i)=><Text key={i}>{j.username}</Text>)
            }
        </Flex>
        <Flex direction={"column"} flex={2} gap={"5px"}>
            <Heading size={"xs"}>Requests</Heading>
            {loading?<>Loading...</>:
            error?<>Error occured, please refresh</>:
            <>
                {requests.map((r, i)=>{
                return <>
                {(r.status==="Pending" && checkElapsed(r.expireAt))?<></>:<Flex key={i} gap={"5px"}>
                    <Text flex={2}>{r.user.username}</Text>
                    <IconButton onClick={()=>onAccept(r.user, r._id)} colorScheme='green' icon={<AiOutlineCheck/>} flex={0.5} size={"xs"}>Accept</IconButton>
                    <IconButton onClick={()=>onReject(r.user, r._id)} colorScheme='red' icon={<MdClose/>} flex={0.5} size={"xs"}>Reject</IconButton>
                </Flex>}
                </>})}
            </>}
        </Flex>
    </Flex>
  )
}

export default MyEventCard