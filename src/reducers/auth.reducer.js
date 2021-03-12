import { authConstansts } from "../actions/constants";

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    authenticating: false,
    authenticated: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case `${ authConstansts.USER_LOGIM }_REQUEST`:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case `${ authConstansts.USER_LOGIM }_SUCCESS`:
            state = {
                ...state,
                ...action.payload.user,
                authenticated: true,
                authenticating: false
            }
            break;
        case `${ authConstansts.USER_LOGIM }_FAILURE`:
            state = {
                ...state,
                authenticated: false,
                authenticating: false,
                error: action.payload.error,
            }
            break;
        case `${ authConstansts.USER_LOGOUT }_REQUEST`:
            break;
        case `${ authConstansts.USER_LOGOUT }_SUCCESS`:
            state = {
                ...initialState,
            }
            break;
        case `${ authConstansts.USER_LOGOUT }_FAILURE`:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
        default:
            return state;
    }
    // ？このreturnを消したらエラーになる（他のコンポーネント等にauthが返ってこない模様）
    return state;
};

export default authReducer;