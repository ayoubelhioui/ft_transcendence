import { STATUS_SUCCESS, address } from "../../Const"
import { useAppServiceContext } from "../../Context/Service/AppServiceContext"
import { Avatar } from "@mui/material";

const NoContent = () => {
  return (
    <div className="flex mx-auto h-full my-auto w-full justify-center items-center text-3xl text-gray-400 "> No Achievements </div>
  )
}

const Item = ({ item }: {item : any}) => {
  const link = `http://${address}/users/image/${item.icon}` 
  return (
    <div className="">
        <Avatar src={link} sx={{ width: 120, height: 120 }}></Avatar>
    </div>
  )
}

const List = ({list} : {list : any}) => {
  return (
    <>
      {
        list.map((item : any, index : number) => (            
          <Item key={index} item={item}/>
        ))
      }
    </>
  )
}

const Achievements = ({userInfo} : {userInfo : any}) => {
  const appService = useAppServiceContext()
  const userId = userInfo.user.id
  const response = appService.requestService.getUserAchievementsRequest(userId)
  const results = response.state
  
  //console.log("---->", response)
  response.effect([userInfo])

  if (results.status === STATUS_SUCCESS) {
    return (
      <div className="flex flex-col top_1 ml-2 text-gray-400 max-md:ml-0 overflow-x-scroll h-[250px] max-custom-md:h-[280px] max-m-custom-md:h-[200px]">
        <h1 className="text-2xl p-2">Achievements</h1>
        <div className="flex justify-between gap-4 max-sm:gap-2 max-sm:flex-wrap my-auto items-center mx-4 max-sm:mx-2 overflow-x-scroll">
          <List list={results.data} />
        </div>
      </div>
    )
  } else {
    return (
      <NoContent />
    )
  }
}

export default Achievements
