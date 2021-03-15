import { relationConstants } from "../actions/constants";

const initialState = {
    firstName         : '',
    lastName          : '',
    donutPoint        : null,
    createdAt         : null,
    isAccepted        : null,
    isGetStartRelation: null,
    isMyself          : null,
    error             : null,
    SendingUsers      : [],
    SendedUsers       : []
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
                firstName         : '',
                lastName          : '',
                donutPoint        : null,
                createdAt         : null,
                isAccepted        : null,
                isGetStartRelation: null,
                isMyself          : null,
                error             : action.payload.errorMessage
            }
            break;
        case relationConstants.SEND_REQUEST_REQUEST:
            break;
        case relationConstants.SEND_REQUEST_SUCCESS:
            state = {
                ...state,
                firstName     : '',
                lastName      : '',
                donutPoint    : null,
                createdAt     : null,
                error         : null
            }
            break;
        case relationConstants.SEND_REQUEST_FAILURE:
            state = {
                ...state,
                firstName     : '',
                lastName      : '',
                donutPoint    : null,
                createdAt     : null,
                error         : action.error
            }
            break;
        case relationConstants.GET_REQ_REQUEST:
            break;
        case relationConstants.GET_REQ_ING_SUCCESS:
            state = {
                ...state,
                SendingUsers: action.payload.targetUsers1,
            }
            break;
        case relationConstants.GET_REQ_TED_SUCCESS:
            state = {
                ...state,
                SendedUsers: action.payload.targetUsers2,
            }
            break;
        case relationConstants.GET_REQ_FAILURE:
            state = {
                ...state,
                SendingUsers: [],
                SendedUsers: []
            }
            break;
        default:
            break;
    }
    return state;
};

export default relationReducer;