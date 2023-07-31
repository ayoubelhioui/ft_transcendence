import { STATUS_SUCCESS } from "../../Const"
import { useAppServiceContext } from "../../Context/Context"

const NoContent = () => {
  return (
    <div className="flex mx-auto py-2 "> No Lives </div>
  )
}

const Item = ({ item }: {item : any}) => {
  // const isClassic : boolean = payload.isClassic
  const player1 = item.player1
  const player2 = item.player2

  return (
      <div className="flex flex-col h-[190px] w-[230px] max-md:w-[170px] max-md:h-[150px] cursor-pointer gap-4">
            <div className={`flex bg-[url('/src/assets/classic-game.png')] w-full h-[130px] max-md:h-[110px] rounded-[16px] bg-cover`} >
                {/* <img src={imagePath} alt="Image_Type" className="w-[300px] object-cover h-[120px]"/> */}
            </div>
            <div className="flex justify-between px-2 max-md:h-[30px] items-center w-full back h-[40px]">
                <div className="flex flex-col items-center">
                    {/* <Avatar alt="Avatar" src={`http://${address}/users/image/` + player1.IntraId} sx={{ width: 30, height: 30 }}/> */}
                    <span className="text-white text-base max-md:text-sm">{player1.username}</span>

                </div>
                <div className="flex flex-col items-center">
                     {/* <Avatar alt="Avatar" src={`http://${address}/users/image/` + player2.IntraId} sx={{ width: 30, height: 30 }}/> */}
                    <span className="text-white text-base max-md:text-sm">{player2.username}</span>
                </div>
            </div>
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

const ResultsMatch = ({userInfo} : {userInfo : any}) => {
  const appService = useAppServiceContext()
  const userId = userInfo.user.id
  const response = appService.requestService.getUserMatchHistoryRequest(userId)
  const results = response.state

  response.effect([userInfo])

  if (results.status === STATUS_SUCCESS) {
    return (
      <div className="flex flex-col top_1 h-[300px] max-custom-md:h-[350px] max-md:pb-2 max-m-custom-md:h-[220px] ml-2 text-gray-400 max-md:ml-0 overflow-x-scroll">
        <h1 className="text-2xl p-2">Match Results</h1>
        <div className="flex gap-10 max-md:gap-4 pl-6 pt-6 max-md:pl-2 my-auto overflow-x-scroll">
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

export default ResultsMatch
