import { SAVE_TOKEN } from '../actions/auth';
import { DELELTE_TOKEN, GET_ME } from '../actions/auth'

const initialState = {
    token: "NO Auth",
    userData: "null"
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            // console.log("enter in case")
            return { ...state, token: action.token }
        case DELELTE_TOKEN:
            return { ...state, token: action.token }
        case GET_ME:
            // console.log("inside")
            // console.log(action.dataUser)
            return { ...state, userData: action.dataUser }
        default:
            // console.log(" not enter in case")
            // console.log(action)
            return state
    }
}