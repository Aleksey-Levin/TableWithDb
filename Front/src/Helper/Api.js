import axios from "axios";
import {requestConfig} from "./State/RequestConfig";

// Функция получения данных по API запросу
export const getData = async () =>{
    let res = [];
    await axios.get(requestConfig["URL"])
        .then(function (response) {
            res = (response["data"]);
        })
        .catch(function (error) {
            console.log(error);
        })
    return res;
}