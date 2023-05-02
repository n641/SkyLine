export const SAVE_TOKEN = 'SAVE_TOKEN';
export const DELELTE_TOKEN = 'SAVE_TOKEN';
export const GET_ME = 'GET_ME';

import axios from "../../Api/axios";

var url = `https://skyline-backend.cyclic.app/api/v1/users/me`;
let data = null
const fetchUserData = async () => {
    const response = await axios.get(url,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        .catch(error => {
            console.log(error)
        })

    // console.log(response.data)

    data = await response.data.data.data
}

export const saveToken = (Authtoken) => {
    console.log("Saved token in provide :-")
    console.log(Authtoken)
    return { type: SAVE_TOKEN, token: Authtoken }
}

export const deleteToken = () => {
    return { type: DELELTE_TOKEN, token: "no Auth" }
}

export const getMe = () => {
    fetchUserData();
    // console.log(response)
    return { type: GET_ME, dataUser: data }
}
