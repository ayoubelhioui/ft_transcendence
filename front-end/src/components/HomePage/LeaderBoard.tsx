import { authContext } from "../context/useContext";


// const TableComponent = () => {

  //   return (
    //     <div className="flex mt-1 items-center justify-between bg-[#3b063b] py-2 px-4 rounded-[10px]">
    //       <div className="w-1/4">1</div>
    //       <div className="flex items-center gap-2 w-full">
    //         <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
    //         <div className="w-1/2">Mouad</div>
    //       </div>
    //       <div className="w-1/4 text-center">42%</div>
    //     </div>
    //   )
    // }
const LeaderBoard = () => {
      
  const authAvatar = authContext();

  return (

    <div className="flex flex-col purple_back mt-[5%] w-[60%] mx-auto h-[60vh] max-md:mt-[3%] max-md:w-[85%]">
      <h1 className="text-white text-2xl mx-5 mt-5">LeaderBoard</h1>
      <div className="flex flex-col w-full pt-8 px-5 overflow-x-scroll">
        <div className="flex items-center justify-between back text-white py-2 px-4">
          <div className="w-1/4">Rank</div>
          <div className="w-[80%]">Name</div>
          <div className="w-1/5 text-center">WinRate</div>
        </div>
        <div className="flex flex-col shadow-md text-white pt-3 ">
          <div className="flex mt-1 items-center justify-between bg-[#3b063b] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">1</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">Mouad</div>
            </div>
            <div className="w-1/4 text-center">42%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#4D194D] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">2</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">John</div>
            </div>
            <div className="w-1/4 text-center">38%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#3b063b] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">3</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">Jane</div>
            </div>
            <div className="w-1/4 text-center">35%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#3b063b] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">1</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">Mouad</div>
            </div>
            <div className="w-1/4 text-center">42%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#4D194D] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">2</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">John</div>
            </div>
            <div className="w-1/4 text-center">38%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#3b063b] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">3</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">Jane</div>
            </div>
            <div className="w-1/4 text-center">35%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#3b063b] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">1</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">Mouad</div>
            </div>
            <div className="w-1/4 text-center">42%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#4D194D] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">2</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">John</div>
            </div>
            <div className="w-1/4 text-center">38%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#3b063b] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">3</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">Jane</div>
            </div>
            <div className="w-1/4 text-center">35%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#3b063b] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">1</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">Mouad</div>
            </div>
            <div className="w-1/4 text-center">42%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#4D194D] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">2</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">John</div>
            </div>
            <div className="w-1/4 text-center">38%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#3b063b] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">3</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">Jane</div>
            </div>
            <div className="w-1/4 text-center">35%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#3b063b] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">1</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">Mouad</div>
            </div>
            <div className="w-1/4 text-center">42%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#4D194D] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">2</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">John</div>
            </div>
            <div className="w-1/4 text-center">38%</div>
          </div>
          <div className="flex mt-1 items-center justify-between bg-[#3b063b] py-2 px-4 rounded-[10px]">
            <div className="w-1/4">3</div>
            <div className="flex items-center gap-2 w-full">
              <img src={authAvatar.user?.avatar} className="w-[30px] h-[30px] rounded-[50%] object-cover" alt="" />
              <div className="w-1/2">Jane</div>
            </div>
            <div className="w-1/4 text-center">35%</div>
          </div>
          
          
        </div>
      </div>
    </div>

    // <div className="flex back mt-[7%] w-[60%] mx-auto h-[60vh]">

    // </div>
    
  );
};

export default LeaderBoard;
