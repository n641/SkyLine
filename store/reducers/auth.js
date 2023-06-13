import { SAVE_TOKEN } from '../actions/auth';
import { DELELTE_TOKEN, GET_ME , CHANGE_THEME } from '../actions/auth'

const initialState = {
    token: "NO Auth",
    userData: "null",
    theme:true  // light
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return { ...state, theme: action.theme }
        case SAVE_TOKEN:
            return { ...state, token: action.token }
        case DELELTE_TOKEN:
            return { ...state, token: action.token }
        case GET_ME:
            return { ...state, userData: action.dataUser }
        default:
            // console.log(" not enter in case")
            return state
    }
}