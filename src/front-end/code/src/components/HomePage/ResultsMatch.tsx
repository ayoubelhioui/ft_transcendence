import { Avatar } from "@mui/material";
import { ReactNode} from "react";
import { useAppServiceContext } from "../../Context/Service/AppServiceContext";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED, address } from "../../Const";

const Wrapper = ( {children} : {children : ReactNode} ) =>  {
    return (
		<div className="flex flex-col purple_back mt-[4%] w-[70%] mx-auto h-[60vh] max-md:mt-[3%] max-md:w-[85%] pb-5 max-sm:pb-4 max-custom-md:w-[85%] max-custom-md:h-[75vh] max-sm:h-[95vh] max-sm:w-[95%]">
			<h1 className="text-white text-3xl text-center mx-5 mt-5">Latest Results</h1>
			<div className="flex flex-wrap items-center justify-center mt-12 mx-5 gap-12 overflow-x-scroll">
                {children}
            </div>
        </div>
    )
}

const Item = ({payload} : {payload : any}) => {
	return (
		<div className="flex flex-wrap back h-[120px] w-[290px] hover:scale-105 transition-all duration-300">
			<div className="flex flex-col my-3 gap-4 w-full text-white px-4 ">
				<div className="flex gap-2 items-center justify-between">
					<div className="flex items-center gap-2">
						<Avatar alt="Avatar" src={`http://${address}/users/image/` + payload.player1.id} />
						<span className="text-gray-400">{payload.player1.username}</span>
					</div>
					<span>{payload.player1_score}</span>
				</div>
				<div className="flex gap-2 items-center w-full justify-between">
					<div className="flex items-center gap-2">
						<Avatar alt="Avatar" src={`http://${address}/users/image/` + payload.player2.id} />
						<span className="text-gray-400">{payload.player2.username}</span>
					</div>
					<span>{payload.player2_score}</span>
				</div>
			</div>
		</div>
	);
}

const NoContent = () => {
    return (
        <Wrapper>
            <div className="flex mx-auto h-screen my-auto w-full justify-center items-center text-4xl text-white"> There Is No Matches Playing! </div>
        </Wrapper>
    )
}


const List = ({list} : {list : any}) => {
    return (
        <Wrapper>
            {
                list.map((item : any, index : number) => (            
                    <Item key={index} payload={item}/>
                ))
            }
        </Wrapper>
    )
}

const ResultsLatestHome = () => {
    const appService = useAppServiceContext()
    const response = appService.requestService.getResultsRequest()
    const result = response.state

    response.effect()
        
    if (result.status === STATUS_UNDEFINED) {
      return <div>Loading ...</div>
    } else if (result.status === STATUS_ERROR) {
      return (
        <>
        <div> Popup Error </div>
        <NoContent></NoContent>
        </>
      )
    } else if (result.status === STATUS_SUCCESS) {
        if (result.data.length === 0) {
            return <NoContent></NoContent>
        } else {
            return <List list={result.data}></List>
        }
    } else {
        throw Error("Unhandled status")
    }
}


export default ResultsLatestHome;



