import axios from "axios";

export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params: {
        key: '0e1eb214ccd2440586ce0a0fd0dfd137'
    }
})