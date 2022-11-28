import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const TO_TYPE_API = `${API_BASE}/api`;

export const getRandom = async () => {
    const response = await axios.get(`${TO_TYPE_API}/random`);
    return response.data;
}

export const getOnThisDay = async (type, dd, mm) => {
    let requestString = `${TO_TYPE_API}/onthisday`;
    if(type) {
        requestString = `${requestString}/${type}`
        if(dd && mm) {
            requestString = `${requestString}/${dd}/${mm}`
        }
    } else {
        return {
            goals: [
                {
                    title: "ERORR",
                    summary: "ERROR, but feel free to still type this out",
                }
            ]
        }
    }
    const response = await axios.get(requestString);
    console.log(response.data);
    return response.data;
}

export const getFromSearch = async (query) => {
    const response = await axios.get(`${TO_TYPE_API}/search/${query}`);
    return response.data;

}
