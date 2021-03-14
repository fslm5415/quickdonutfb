import { relationConstants } from "../actions/constants";

const initialState = {
    firstName     : '',
    lastName      : '',
    donutPoint    : null,
    createdAt     : null,
    error         : null
};

const relationReducer = (state = initialState, action) => {
    switch (action.type) {
        case relationConstants.GET_USERINFO_REQUEST:
            state = {
                ...state,
                error         : null
            }
            break;
        case relationConstants.GET_USERINFO_SUCCESS:
            state = {
                ...state,
                ...action.payload.user,
                error         : null
            }
            break;
        case relationConstants.GET_USERINFO_FAILURE:
            state = {
                ...state,
                firstName     : '',
                lastName      : '',
                donutPoint    : null,
                createdAt     : null,
                error: action.payload.error
            }
            break;
        default:
            break;
    }
    return state;
};

export default relationReducer;