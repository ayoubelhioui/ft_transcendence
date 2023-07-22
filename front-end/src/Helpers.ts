import axios from "axios";
import { useState } from "react";

export const makeGetRequest = (link : string, errorCallBack : (error : any) => void) => {
    const [state, setState] = useState<any>([]);

    const axiosReq = async () => {

        try {
            const response = await axios.get(link);

          setState(response.data);

        } catch (error) {
          errorCallBack(error)
        }
      }
    
      return [state, axiosReq]

}