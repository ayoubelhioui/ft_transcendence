import React, { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion'
import { MdEdit } from 'react-icons/md'
import QRCode from 'qrcode.react';
import * as otplib from 'otplib';

// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppServiceContext } from "../../Context/Context";
import { STATUS_SUCCESS } from "../../Const";
import { useNavigate } from "react-router-dom";

enum friendRequestStatus{
  unspecified = -1,
	pending = 0,
	accepted = 1,
}


interface Channel {
  id : number
}

interface User {
  id : number
}

interface Relation {
  userId : number
  targetUserId : number
  status : number
  sender? : User
  receiver? : User
  channel? : Channel
  affect : any
  blocked? : User
  blockedBy? : User
}

const GoToChat = ({relation} : {relation : Relation}) => {
  const navigate = useNavigate()
  const appService = useAppServiceContext()

  const sendRequest = async () => {
    const bodyData = {
      name: "dm Channel",
      isGroup: false,
      targetUserId: relation.targetUserId,
      visibility: "private"
    };

    const res = await appService.requestService.postCreateNewChannel(bodyData)
    if (res.status === STATUS_SUCCESS){
      navigate(`/Chat/${res.data.id}`)
    } else {
      //!error
    }
  }
  
  return (
    <>
      <motion.button 
      type='button'
      whileTap={{scale: 0.955}}
      onClick={sendRequest}
      className='flex items-center bg-[#4D194D] py-2 px-6 mx-auto text-xs outline-none'
      > 
          <MdEdit size={15} className='mr-1'/> 
          Chat
      </motion.button>
    </>
  )
}

const BlockRequest = ({relation} : {relation : Relation}) => {
  const appService = useAppServiceContext()
  let blockStatus = relation.blockedBy?.id === relation.userId
  let title = !blockStatus ? "Block Friend" : "Unblock Friend"

  const request = async () => {
    console.log("=>", relation.blockedBy)
    if (blockStatus) {
      console.log("unblock friend")
      return await appService.requestService.deleteUnblockFriend(relation.targetUserId)
    }
    console.log("block friend")
    return await appService.requestService.deleteBlockFriend(relation.targetUserId)
  }

  const handleSubmit = async () => {    
    const res = await request()
    if (res.status === STATUS_SUCCESS) {
      relation.affect((value : any) => !value)
    }
    else {
      console.log("Error")
      //!popup
    }
  }

  return (
    <>
      <motion.button
      onClick={handleSubmit}
      type='button'
      whileTap={{scale: 0.955}}
      className='flex items-center bg-[#4D194D] py-2 px-6 mx-auto text-xs outline-none'
      > 
      <MdEdit size={15} className='mr-1'/> 
          {title}
      </motion.button>
    </>
  )
}

const FriendsRequest = ({relation} : {relation : Relation}) => {
  const appService = useAppServiceContext()
  let title = relation.status ===  friendRequestStatus.unspecified ? "Send Friend Request" : "Unfriend"
  let twoButtons = false
  if (relation.status === friendRequestStatus.pending) {
    if (appService.authService.user?.id === relation.sender?.id) {
      title = "Cancel friend request"
    } else {      
      title = "Accept"
      twoButtons = true
    }
  }


  const request = async (rejectRequest : boolean) => {
    if (rejectRequest) {
      console.log("refuse friend")
      return await appService.requestService.deleteRefuseFriend(relation.targetUserId)
    }
    if (relation.status === friendRequestStatus.pending && !twoButtons) {
      console.log("cancel friend")
      return await appService.requestService.deleteCancelFriendRequest(relation.targetUserId)
    }
    if (relation.status === friendRequestStatus.accepted) {
      console.log("delete friend")
      return await appService.requestService.deleteFriend(relation.targetUserId)
    }
    if (twoButtons) {
      console.log("accept friend")
      return await appService.requestService.putAcceptFriend(relation.targetUserId)
    }
    console.log("post friend")
    return await appService.requestService.postRequestFriend(relation.targetUserId)
  }

  const handleSubmit = async (rejectRequest : boolean) => {    
    const res = await request(rejectRequest)
    if (res.status === STATUS_SUCCESS) {
      relation.affect((value : any) => !value)
    }
    else {
      console.log("Error")
      //!popup
    }
  }

  return (
    <>
    <motion.button
    onClick={() => handleSubmit(false)}
    type='button'
    whileTap={{scale: 0.955}}
    className='flex items-center bg-[#4D194D] py-2 px-6 mx-auto text-xs outline-none'
    > 
        <MdEdit size={15} className='mr-1'/> 
        {title}
    </motion.button>
    { twoButtons && 
      <motion.button
      onClick={() => handleSubmit(true)}
      type='button'
      whileTap={{scale: 0.955}}
      className='flex items-center bg-[#4D194D] py-2 px-6 mx-auto text-xs outline-none'
      > 
          <MdEdit size={15} className='mr-1'/> 
          Reject
      </motion.button>
    }
    </>
  )
}

const Relation = ({relation} : {relation : Relation}) => {

  console.log("R: ", relation)
  if (relation.status === friendRequestStatus.accepted) {
    return (
      <>
        <FriendsRequest relation={relation} />
        <BlockRequest relation={relation} />
        <GoToChat relation={relation}/>
      </>
    )
  } else {
    if (relation.blockedBy?.id === relation.userId) {
      return (
        <>
          <BlockRequest relation={relation} />
        </>
      )
    } else {
      return <>
        <FriendsRequest relation={relation} />
        <BlockRequest relation={relation} />
        <GoToChat relation={relation}/>
      </>
    }
  }
}

export default Relation
