import { RiArrowDropDownLine } from "react-icons/ri";
import { authContext } from "../context/useContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { address } from "../../Const";

import { VscSettings } from "react-icons/vsc";
import { Console } from "console";

interface GroupTypes {
  data: any;
}

const PublicGroup = ({ data }: GroupTypes) => {
  const auth = authContext();

  const joinToChannel = async (groupId: number) => {
    try {
      const res = await axios.post(
        `http://${import.meta.env.VITE_HOST}:3000/channels/${groupId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      // I need to check if there is a way to remove the given Group from the array or just change the state of the given array
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-2 overflow-x-scroll min-h-[160px]">
      <div className="flex justify-between px-2 py-1  items-center w-full text-blue-950 bg-white opacity-30 cursor-pointer">
        <span className="text-sm">Public Groups</span>
        <RiArrowDropDownLine size={25} />
      </div>

      {data.map((group: any) => (
        <div
          key={group.id}
          className="flex mt-2 items-center justify-between mx-6"
        >
          <div className="flex items-center gap-4 ml-6 cursor-pointer">
            <img
              src={`http://${address}/users/image/` + group.avatar}
              alt="avatar"
              className=" object-cover rounded-full w-[45px] h-[45px] cursor-pointer"
            />

            <h2 className="text-white">{group.name}</h2>
          </div>
          <button
            type="button"
            className="text-white bg-purple-950 p-2 text-sm "
            onClick={() => joinToChannel(group.id)}
          >
            Join Now
          </button>
        </div>
      ))}
    </div>
  );
};

const ProtectedGroup = ({ data }: GroupTypes) => {

  const auth = authContext();

  const [password, setPassword] = useState<string>("");

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const joinToChannel = async (groupId: number) => {
    try {
      const res = await axios.post(
        `http://${import.meta.env.VITE_HOST}:3000/channels/${groupId}/join`,
        {password: password},
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      // I need to check if there is a way to remove the given Group from the array or just change the state of the given array
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-2 overflow-x-scroll min-h-[260px]">
      <div className="flex justify-between px-2 py-1  items-center w-full text-blue-950 bg-white opacity-30 cursor-pointer">
        <span className="text-sm">Protected Groups</span>
        <RiArrowDropDownLine size={25} />
      </div>

      {data.map((group: any) => (
        <div
          key={group.id}
          className="flex mt-2 items-center justify-between mx-6 relative"
        >
          <div className="flex items-center gap-4 ml-6 cursor-pointer">
            <img
              src={`http://${address}/users/image/` + group.avatar}
              alt="avatar"
              className=" object-cover rounded-full w-[45px] h-[45px] cursor-pointer"
            />

            <h2 className="text-white">{group.name}</h2>
          </div>
          <button
            type="button"
            className="text-white relative bg-purple-950 p-2 text-sm outline-none"
            onClick={() => {setIsOpened(!isOpened)}}
          >
            Join Now
          </button>

          {isOpened && (

            <div className=" bg-blue-950 absolute rounded-[10px] w-[200px] h-[60px] text-white z-[999] top-14 left-1/3">
              <div className="flex flex-col">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="bg-transparent text-white w-[150px] h-[30px] outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="text-white bg-purple-950 p-2 text-sm "
                  onClick={() => joinToChannel(group.id)}
                >
                  Join Now
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
const GroupTypes = () => {
  const authApp = authContext();

  // const [groupData, setGroupData] = useState<any>([]);

  const [publicData, setPublicData] = useState<any>([]);
  const [protectedData, setProtectedData] = useState<any>([]);

  useEffect(() => {
    // useAxios();

    const axiosReq = async () => {
      const res = await axios.get(
        `http://${import.meta.env.VITE_HOST}:3000/channels`,
        {
          headers: {
            Authorization: `Bearer ${authApp.accessToken}`,
          },
        }
      );

      const data = res.data;

      data.map((group: any) => {
        if (group.visibility == "public")
          setPublicData((prev: any) => [...prev, group]);
        else {
          setProtectedData((prev: any) => [...prev, group]);
        }
      });
    };
    axiosReq();
  }, []);

  return (
    <div className="flex flex-col">
      <PublicGroup data={publicData} />
      <ProtectedGroup data={protectedData} />
      {/* <PublicGroup text="Private Groups" /> */}
    </div>
  );
};

export default GroupTypes;
