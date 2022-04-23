import userReducer       from "../../../src/reducers/user.reducer";
import { userConstants } from "../../../src/actions/constants";

describe('userReducerのテスト', () => {
    it('action.type === GET_REALTIME_USERS_REQUESTのとき', () => {
        const action = {
            type: userConstants.GET_REALTIME_USERS_REQUEST
        };

        const newState = userReducer(undefined, action);

        expect( newState ).toStrictEqual(
            {
                users            : [],
                conversations    : [],
                MyDonutPoit      : null,
                YourDonutPoit    : null,
                LASTtimestampData: null,
                LASTdonut        : null,
                LASTsubmitUserId : null
            }
        );
    });

    it('action.type === GET_REALTIME_USERS_SUCCESSのとき', () => {
        const dummyUsersData = [];
        for (let i = 0; i < 3; i++) {
            const dummyUserData = {
                firstName : 'dummyFirstName' + i,
                lastName  : 'dummyLastName' + i,
                donutPoint: 99999 + i,
                createdAt : '9999/99/99',
                uid       : 1234567890 + i,
                isOnline  : false
            };
            dummyUsersData.push(dummyUserData);
        };
        const action = {
            type   : userConstants.GET_REALTIME_USERS_SUCCESS,
            payload: { 
                users : dummyUsersData
            }
        };
        const currentState = {
            users            : [],
            conversations    : [],
            MyDonutPoit      : null,
            YourDonutPoit    : null,
            LASTtimestampData: null,
            LASTdonut        : null,
            LASTsubmitUserId : null
        };

        const newState = userReducer(currentState, action);

        expect( newState ).toStrictEqual(
            {
                users            : dummyUsersData,
                conversations    : [],
                MyDonutPoit      : null,
                YourDonutPoit    : null,
                LASTtimestampData: null,
                LASTdonut        : null,
                LASTsubmitUserId : null
            }
        );
    });

    it('action.type === GET_REALTIME_MESSAGES_SUCCESSのとき', () => {
        const dummyData = {
            conversations    : [],
            LASTtimestampData: 9876543212,
            LASTdonut        : false,
            MyDonutPoit      : 999,
            YourDonutPoit    : 999,
            LASTsubmitUserId : 1234567892
        };
        for (let i = 0; i < 3; i++) {
            const dummyConversations = {
                user_uid_1   : 'abcde12345',
                user_uid_2   : 'fghij67890',
                donut        : 997 + i,
                createdAt    : '9999/99/99',
                timestampData: 9876543210 + i,
                message      : 'メッセージ' + i,
                isView       : false
            };
            dummyData.conversations.push(dummyConversations);
        };
        const action = {
            type   : userConstants.GET_REALTIME_MESSAGES_SUCCESS,
            payload: dummyData
        };
        const currentState = {
            users            : [],
            conversations    : [],
            MyDonutPoit      : null,
            YourDonutPoit    : null,
            LASTtimestampData: null,
            LASTdonut        : null,
            LASTsubmitUserId : null
        };

        const newState = userReducer(currentState, action);

        expect( newState ).toStrictEqual(
            {
                users            : [],
                conversations    : action.payload.conversations,
                MyDonutPoit      : action.payload.MyDonutPoit,
                YourDonutPoit    : action.payload.YourDonutPoit,
                LASTtimestampData: action.payload.LASTtimestampData,
                LASTdonut        : action.payload.LASTdonut,
                LASTsubmitUserId : action.payload.LASTsubmitUserId
            }
        );
    });

    it('action.type === GET_REALTIME_MESSAGES_FAILUREのとき', () => {
        const dummyData = {
            conversations    : [],
            LASTtimestampData: 9876543212,
            LASTdonut        : false,
            MyDonutPoit      : 999,
            YourDonutPoit    : 999,
            LASTsubmitUserId : 1234567892
        };
        for (let i = 0; i < 3; i++) {
            const dummyConversations = {
                user_uid_1   : 'abcde12345',
                user_uid_2   : 'fghij67890',
                donut        : 997 + i,
                createdAt    : '9999/99/99',
                timestampData: 9876543210 + i,
                message      : 'メッセージ' + i,
                isView       : false
            };
            dummyData.conversations.push(dummyConversations);
        };
        const action = {
            type   : userConstants.GET_REALTIME_MESSAGES_FAILURE,
            payload: { conversations: [] }
        };
        const currentState = {
            users            : [],
            conversations    : dummyData.conversations,
            MyDonutPoit      : dummyData.MyDonutPoit,
            YourDonutPoit    : dummyData.YourDonutPoit,
            LASTtimestampData: dummyData.LASTtimestampData,
            LASTdonut        : dummyData.LASTdonut,
            LASTsubmitUserId : dummyData.LASTsubmitUserId
        };

        const newState = userReducer(currentState, action);

        expect( newState ).toStrictEqual(
            {
                users            : [],
                conversations    : [],
                MyDonutPoit      : dummyData.MyDonutPoit,
                YourDonutPoit    : dummyData.YourDonutPoit,
                LASTtimestampData: dummyData.LASTtimestampData,
                LASTdonut        : dummyData.LASTdonut,
                LASTsubmitUserId : dummyData.LASTsubmitUserId
            }
        );
    });

    it('action.type === UPDATE_MESSAGES_SUCCESSのとき', () => {
        const action = {
            type: userConstants.UPDATE_MESSAGES_SUCCESS
        };
        const currentState = {
            users            : [],
            conversations    : [],
            MyDonutPoit      : null,
            YourDonutPoit    : null,
            LASTtimestampData: null,
            LASTdonut        : null,
            LASTsubmitUserId : null
        };

        const newState = userReducer(currentState, action);

        expect( newState ).toStrictEqual(
            {
                users            : [],
                conversations    : [],
                MyDonutPoit      : null,
                YourDonutPoit    : null,
                LASTtimestampData: null,
                LASTdonut        : null,
                LASTsubmitUserId : null
            }
        );
    });

    it('action.type === SUBMIT_DONUT_SUCCESSのとき', () => {
        const action = {
            type: userConstants.SUBMIT_DONUT_SUCCESS
        };
        const currentState = {
            users            : [],
            conversations    : [],
            MyDonutPoit      : null,
            YourDonutPoit    : null,
            LASTtimestampData: null,
            LASTdonut        : null,
            LASTsubmitUserId : null
        };

        const newState = userReducer(currentState, action);

        expect( newState ).toStrictEqual(
            {
                users            : [],
                conversations    : [],
                MyDonutPoit      : null,
                YourDonutPoit    : null,
                LASTtimestampData: null,
                LASTdonut        : null,
                LASTsubmitUserId : null
            }
        );
    });
});