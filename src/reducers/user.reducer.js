import { userConstants } from "../actions/constants";

const initialState = {
    users            : [],
    conversations    : [],
    MyDonutPoit      : null,
    YourDonutPoit    : null,
    LASTtimestampData: null,
    LASTdonut        : null,
    LASTsubmitUserId : null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.GET_REALTIME_USERS_REQUEST:
            break;
        case userConstants.GET_REALTIME_USERS_SUCCESS:
            state = {
                ...state,
                users: action.payload.users,
            }
            break;
        case userConstants.GET_REALTIME_MESSAGES_SUCCESS:
            state = {
                ...state,
                conversations    : action.payload.conversations,
                MyDonutPoit      : action.payload.MyDonutPoit,
                YourDonutPoit    : action.payload.YourDonutPoit,
                LASTtimestampData: action.payload.LASTtimestampData,
                LASTdonut        : action.payload.LASTdonut,
                LASTsubmitUserId : action.payload.LASTsubmitUserId
            }
            break;
        case userConstants.GET_REALTIME_MESSAGES_FAILURE:
            state = {
                ...state,
                conversations: []
            }
            break;
        case userConstants.UPDATE_MESSAGES_SUCCESS:
            break;
        case userConstants.SUBMIT_DONUT_SUCCESS:
            break;
        default:
            return state;
    }
    return state;
};

export default userReducer;