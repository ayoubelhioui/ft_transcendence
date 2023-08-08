import { STATUS_SUCCESS } from "../../Const"
import { useAppServiceContext } from "../../Context/Context"
import three_image from '../../assets/table3d.png'
import classic_image from '../../assets/classic-game.png'

const NoContent = () => {
  return (
    <div className="flex m-auto w-full h-[50vh] justify-center items-center text-4xl text-gray-400"> No Results Yet! </div>
  )
}

const Item = ({ item }: {item : any}) => {
  // const isClassic : boolean = payload.isClassic
  const player1 = item.player1
  const player2 = item.player2

  const imagePath = !item.type ? three_image : classic_image
  
  return (
      <div className="flex flex-col h-[190px] w-[230px] max-md:w-[170px] max-md:h-[150px] max-sm:w-[70%] max-sm:mx-auto gap-4">
            <div className={`flex w-[230px] h-[130px] max-sm:w-full max-md:h-[110px] rounded-[16px] bg-cover`} >
              <img src={imagePath} alt="Image_Type" className="w-full  h-full"/>
            </div>
            <div className="flex justify-between px-2 max-md:h-[30px] items-center w-full back h-[40px]">
                <div className="flex flex-col items-center">
                    {/* <Avatar alt="Avatar" src={`http://${address}/users/image/` + player1.id} sx={{ width: 30, height: 30 }}/> */}
                    <span className="text-white text-base max-md:text-sm">{player1.username}</span>

                </div>
                <div className="flex flex-col items-center">
                     {/* <Avatar alt="Avatar" src={`http://${address}/users/image/` + player2.id} sx={{ width: 30, height: 30 }}/> */}
                    <span className="text-white text-base max-md:text-sm">{player2.username}</span>
                </div>
            </div>
      </div>
  )
}

const List = ({list} : {list : any}) => {
  console.log(list)
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
      <div className="flex flex-col top_1 h-[300px] max-custom-md:h-[350px] max-md:pb-2 max-m-custom-md:h-[220px] ml-2 text-gray-400 max-md:ml-0">
        <h1 className="text-2xl p-2">Match Results</h1>
        <div className="flex gap-16 max-md:gap-4 max-sm:gap-2 max-sm:flex-wrap pl-6 pt-6 max-md:pl-2 my-auto overflow-x-auto">
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
