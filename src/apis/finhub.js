import axios from "axios";

const API_KEY = "cjh14qpr01qu5vptfr60cjh14qpr01qu5vptfr6g"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: API_KEY
    }
})