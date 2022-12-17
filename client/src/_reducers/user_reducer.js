import { LOGIN_USER ,REGISTER_USER,AUTH} from "../_actions/types";


//action은 현재 object
export default function(state = {},action){
    switch(action.type){
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        case AUTH:
            return { ...state, userData: action.payload }
            break;
        default:
            return state;

    }
}