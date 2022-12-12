import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

export const getRandom = async () => {
    const response = await axios.get(`${API_BASE}/random`);
    return response.data;
}

export const getOnThisDay = async (type, dd, mm) => {
    let requestString = `${API_BASE}/onthisday`;
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
    const response = await axios.get(`${API_BASE}/search/${query}`);
    return response.data;

}
