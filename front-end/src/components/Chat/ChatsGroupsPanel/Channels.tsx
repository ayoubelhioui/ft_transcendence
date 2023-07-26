import { useAppServiceContext } from "../../../Context/Context"
import ProtectedGroup from "./ProtectedGroup"
import PublicGroup from "./PublicGroup"

const Channels = () => {
  const appService = useAppServiceContext()
  const result = appService.requestService.getChannelsRequest()
  console.log("channel result === " , result);

  return (
    <div className="flex mt-3 flex-col h-[550px] overflow-y-scroll scroll-smooth">
      <div className="flex flex-col">
        <PublicGroup  result={result}/>
        <ProtectedGroup result={result} />
      </div>
    </div>
  )
}

export default Channels
