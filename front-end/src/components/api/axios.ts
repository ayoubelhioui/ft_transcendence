import axios from "axios";
import {address} from "../../Const"

export default axios.create({
    baseURL : `http://${address}`
})