import {SAVE_TOKEN} from '../actions/auth';
import{DELELTE_TOKEN} from '../actions/auth'

const initialState = {
    token:"NO Auth",
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            // console.log("enter in case")
            return {token:action.token}
        case DELELTE_TOKEN:
            return {token:action.token}    
        default:
            // console.log(" not enter in case")
            return state
    }
}