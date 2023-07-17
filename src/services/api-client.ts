import axios from "axios";

export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params: {
        key: 'cd227a31bcb240d7b28340e1e9a8629b'
    }
})