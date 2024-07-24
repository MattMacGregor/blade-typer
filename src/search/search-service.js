import axios from "axios";

const WIKIPEDIA_API_BASE = "https://en.wikipedia.org/api/rest_v1";
const WIKIMEDIA_API = "https://api.wikimedia.org"
const SEARCH_API = `${WIKIMEDIA_API}/core/v1/wikipedia/en/search/page?q=`

const API_BASE = process.env.REACT_APP_API_BASE;
const REPLAY_API = `${API_BASE}/replays`
const api = axios.create()

export const searchWiki = async (terms) => {
    const response = await api.get(`${SEARCH_API}${terms}`)
    return response.data;
}

export const getPage = async (typingId) => {
    console.log("Typing id: " + typingId)
    const response = await api.get(`${REPLAY_API}/page/${typingId}`)
    const responseWiki = await api.get(`${WIKIPEDIA_API_BASE}/page/summary/${typingId}`)
    console.log(responseWiki)
    const ret = {
        replays: response.data,
        title: responseWiki.data.titles["canonical"],
        summary: responseWiki.data.extract,
        description: responseWiki.data.description,
    }
    return ret    
}
