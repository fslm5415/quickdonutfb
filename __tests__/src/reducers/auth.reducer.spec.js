import authReducer from "../../../src/reducers/auth.reducer";
import { authConstansts } from "../../../src/actions/constants";

describe('authReducerのテスト', () => {
    it('action.type === USER_LOGIM_REQUESTのとき', () => {
        const action = {
            type: authConstansts.USER_LOGIM_REQUEST
        };

        const newState = authReducer(undefined, action);

        expect( newState ).toStrictEqual(
            {
                firstName     : '',
                lastName      : '',
                email         : '',
                authenticating: true,
                authenticated : false,
                error         : null
            }
        );
    });

    it('action.type === USER_LOGIM_SUCCESSのとき', () => {
        const dummyUserData = {
            firstName: 'dummyFirstName',
            lastName : 'dummyLastName',
            uid      : 1234567890,
            email    : 'dummyEmail'
        };
        const action = {
            type: authConstansts.USER_LOGIM_SUCCESS,
            payload: { user: dummyUserData }
        };
        const currentState = {
            firstName     : '',
            lastName      : '',
            email         : '',
            authenticating: true,
            authenticated : false,
            error         : null
        };

        const newState = authReducer(currentState, action);

        expect( newState ).toStrictEqual(
            {
                firstName     : 'dummyFirstName',
                lastName      : 'dummyLastName',
                uid           : 1234567890,
                email         : 'dummyEmail',
                authenticating: false,
                authenticated : true,
                error         : null
            }
        );
    });

    it('action.type === USER_LOGIM_FAILUREのとき', () => {
        const dummyErrorMessage = 'ダミーエラーメッセージ';
        const action = {
            type: authConstansts.USER_LOGIM_FAILURE,
            payload: { error: dummyErrorMessage }
        };
        const currentState = {
            firstName     : '',
            lastName      : '',
            email         : '',
            authenticating: true,
            authenticated : false,
            error         : null
        };

        const newState = authReducer(currentState, action);
        
        expect( newState ).toStrictEqual(
            {
                firstName     : '',
                lastName      : '',
                email         : '',
                authenticating: false,
                authenticated : false,
                error         : dummyErrorMessage
            }
        );
    });

    it('action.type === USER_LOGOUT_REQUESTのとき', () => {
        const action = {
            type: authConstansts.USER_LOGOUT_REQUEST
        };

        const newState = authReducer(undefined, action);

        expect( newState ).toStrictEqual(
            {
                firstName     : '',
                lastName      : '',
                email         : '',
                authenticating: false,
                authenticated : false,
                error         : null
            }
        );
    });

    it('action.type === USER_LOGOUT_SUCCESSのとき', () => {
        const action = {
            type: authConstansts.USER_LOGOUT_SUCCESS
        };

        const newState = authReducer(undefined, action);

        expect( newState ).toStrictEqual(
            {
                firstName     : '',
                lastName      : '',
                email         : '',
                authenticating: false,
                authenticated : false,
                error         : null
            }
        );
    });

    it('action.type === USER_LOGOUT_FAILUREのとき', () => {
        const dummyErrorMessage = 'ダミーエラーメッセージ';
        const action = {
            type: authConstansts.USER_LOGIM_FAILURE,
            payload: { error: dummyErrorMessage }
        };
        const currentState = {
            firstName     : '',
            lastName      : '',
            email         : '',
            authenticating: true,
            authenticated : false,
            error         : null
        };

        const newState = authReducer(currentState, action);
        
        expect( newState ).toStrictEqual(
            {
                firstName     : '',
                lastName      : '',
                email         : '',
                authenticating: false,
                authenticated : false,
                error         : dummyErrorMessage
            }
        );
    });
});