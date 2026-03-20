import axios from "axios";

export const getAllProvince = async () => {
    return axios.get("https://raw.githubusercontent.com/kongvut/thai-province-data/refs/heads/master/api/latest/district.json")
}