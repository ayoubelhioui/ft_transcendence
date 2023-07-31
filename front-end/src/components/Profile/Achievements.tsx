import { STATUS_SUCCESS } from "../../Const"
import { useAppServiceContext } from "../../Context/Context"

const NoContent = () => {
  return (
    <div className="flex mx-auto py-2 "> No Lives </div>
  )
}

const Item = ({ item }: {item : any}) => {
  console.log(item)
  return (
    <div className="">
        <div> o </div>
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
  
  response.effect([userInfo])

  if (results.status === STATUS_SUCCESS) {
    return (
      <div className="flex top_1 ml-2 text-gray-400 max-md:ml-0 h-[250px] max-custom-md:h-[280px] max-m-custom-md:h-[200px]">
        <h1 className="text-2xl p-2">Achievements</h1>
        <div className="flex justify-between w-full">
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
