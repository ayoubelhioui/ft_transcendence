import { motion } from 'framer-motion'
import { useAppServiceContext } from "../../Context/Service/AppServiceContext";
import { STATUS_SUCCESS } from "../../Const";
import { useNavigate } from "react-router-dom";
import { GameParamsCollect } from '../Game/PingPongGames/interfaces/interface.game.params';
import { Triggers } from '../../Context/Service/UtilService';

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
  blocked? : User
  blockedBy? : User
}

const InviteToGame = ({relation, isClassic} : {relation : Relation, isClassic : boolean}) => {
  const navigate = useNavigate()
  const appService = useAppServiceContext()
  const title = isClassic ? "Invite to classic game" : "Invite to 3d game"

  const sendRequest = () => {
    const bodyData : GameParamsCollect = {
      isWatchMode : false,
      isClassic : isClassic,
      isBotMode : false,
      userId : appService.authService.user?.id,
      userToInvite : relation.targetUserId
    };
  
    appService.utilService.gameParams = bodyData
    navigate("/Play")
  }
  
  return (
    <>
      <motion.button 
      type='button'
      whileTap={{scale: 0.955}}
      onClick={sendRequest}
      className='flex items-center bg-[#4D194D] py-2 px-6 mx-auto text-xs outline-none ml-2'
      > 
          {title}
      </motion.button>
    </>
  )
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
      className='flex items-center bg-[#4D194D] py-2 px-6 mx-auto text-xs outline-none ml-2'
      > 
        Chat
      </motion.button>
    </>
  )
}


const BlockRequest = ({relation} : {relation : Relation}) => {
  const appService = useAppServiceContext()
  let blockStatus = relation.blockedBy?.id === relation.userId
  let title = !blockStatus ? "Block" : "Unblock"

  const request = async () => {
    //console.log("=>", relation.blockedBy)
    if (blockStatus) {
      //console.log("unblock")
      return await appService.requestService.deleteUnblockFriend(relation.targetUserId)
    }
    //console.log("block")
    return await appService.requestService.deleteBlockFriend(relation.targetUserId)
  }

  const handleSubmit = async () => {    
    const res = await request()
    if (res.status === STATUS_SUCCESS) {
      appService.utilService.trigger(Triggers.RefreshProfile)
    }
    else {
      //console.log("Error")
      //!popup
    }
  }

  return (
    <>
      <motion.button
      onClick={handleSubmit}
      type='button'
      whileTap={{scale: 0.955}}
      className='flex items-center bg-[#4D194D] py-2 px-6 mx-auto text-xs outline-none ml-2'
      >  
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
      //console.log("refuse friend")
      return await appService.requestService.deleteRefuseFriend(relation.targetUserId)
    }
    if (relation.status === friendRequestStatus.pending && !twoButtons) {
      //console.log("cancel friend")
      return await appService.requestService.deleteCancelFriendRequest(relation.targetUserId)
    }
    if (relation.status === friendRequestStatus.accepted) {
      //console.log("delete friend")
      return await appService.requestService.deleteFriend(relation.targetUserId)
    }
    if (twoButtons) {
      //console.log("accept friend")
      return await appService.requestService.putAcceptFriend(relation.targetUserId)
    }
    //console.log("post friend")
    return await appService.requestService.postRequestFriend(relation.targetUserId)
  }

  const handleSubmit = async (rejectRequest : boolean) => {    
    const res = await request(rejectRequest)
    if (res.status === STATUS_SUCCESS) {
      appService.utilService.trigger(Triggers.RefreshProfile)
    }
    else {
      //console.log("Error")
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
        {title}
    </motion.button>
    { twoButtons && 
      <motion.button
      onClick={() => handleSubmit(true)}
      type='button'
      whileTap={{scale: 0.955}}
      className='flex items-center bg-[#4D194D] py-2 px-6 mx-auto text-xs outline-none'
      > 
          Reject
      </motion.button>
    }
    </>
  )
}

const Relation = ({relation} : {relation : Relation}) => {
  if (relation.status === friendRequestStatus.accepted) {
    return (
      <>
        <FriendsRequest relation={relation} />
        <BlockRequest relation={relation} />
        <GoToChat relation={relation}/>
        <InviteToGame relation={relation} isClassic={false} />
        <InviteToGame relation={relation} isClassic={true} />
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
        <InviteToGame relation={relation} isClassic={false} />
        <InviteToGame relation={relation} isClassic={true} />
      </>
    }
  }
}

export default Relation
