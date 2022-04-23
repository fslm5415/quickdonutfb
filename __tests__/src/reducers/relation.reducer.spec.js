import relationReducer       from "../../../src/reducers/relation.reducer";
import { relationConstants } from "../../../src/actions/constants";

describe('relationReducerのテスト', () => {
    it('action.type === GET_USERINFO_REQUESTのとき', () => {
        const action = {
            type: relationConstants.GET_USERINFO_REQUEST
        };

        const newState = relationReducer(undefined, action);

        expect( newState ).toStrictEqual(
            {
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
            }
        );
    });

    it('action.type === GET_USERINFO_SUCCESSのとき', () => {
        const dummyUserData = {
            firstName         : 'dummyFirstName',
            lastName          : 'dummyLastName',
            donutPoint        : 99999,
            createdAt         : '9999/99/99',
            isMyself          : false,
            isAccepted        : false,
            isGetStartRelation: false
        };
        const action = {
            type   : relationConstants.GET_USERINFO_SUCCESS,
            payload: { user: dummyUserData }
        };
        const currentState = {
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

        const newState = relationReducer(currentState, action);

        expect( newState ).toStrictEqual(
            {
                firstName         : 'dummyFirstName',
                lastName          : 'dummyLastName',
                donutPoint        : 99999,
                createdAt         : '9999/99/99',
                isMyself          : false,
                isAccepted        : false,
                isGetStartRelation: false,
                error             : null,
                SendingUsers      : [],
                SendedUsers       : []
            }
        );
    });

    it('action.type === GET_USERINFO_FAILUREのとき', () => {
        const dummyErrorMessage = 'ダミーエラーメッセージ';
        const action = {
            type   : relationConstants.GET_USERINFO_FAILURE,
            payload: { errorMessage: dummyErrorMessage }
        };
        const currentState = {
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

        const newState = relationReducer(currentState, action);
        
        expect( newState ).toStrictEqual(
            {
                firstName         : '',
                lastName          : '',
                donutPoint        : null,
                createdAt         : null,
                isAccepted        : null,
                isGetStartRelation: null,
                isMyself          : null,
                SendingUsers      : [],
                SendedUsers       : [],
                error             : dummyErrorMessage
            }
        );
    });

    it('action.type === SEND_REQUEST_REQUESTのとき', () => {
        const action = {
            type: relationConstants.SEND_REQUEST_REQUEST
        };

        const newState = relationReducer(undefined, action);

        expect( newState ).toStrictEqual(
            {
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
            }
        );
    });

    it('action.type === SEND_REQUEST_SUCCESSのとき', () => {
        const action = {
            type: relationConstants.SEND_REQUEST_SUCCESS
        };
        const currentState = {
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

        const newState = relationReducer(currentState, action);

        expect( newState ).toStrictEqual(
            {
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
            }
        );
    });

    it('action.type === SEND_REQUEST_FAILUREのとき', () => {
        const dummyErrorMessage = 'ダミーエラーメッセージ';
        const action = {
            type : relationConstants.SEND_REQUEST_FAILURE,
            error: dummyErrorMessage
        };
        const currentState = {
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

        const newState = relationReducer(currentState, action);
        
        expect( newState ).toStrictEqual(
            {
                firstName         : '',
                lastName          : '',
                donutPoint        : null,
                createdAt         : null,
                isAccepted        : null,
                isGetStartRelation: null,
                isMyself          : null,
                SendingUsers      : [],
                SendedUsers       : [],
                error             : dummyErrorMessage
            }
        );
    });

    it('action.type === ACCEPT_REQUEST_REQUESTのとき', () => {
        const action = {
            type: relationConstants.ACCEPT_REQUEST_REQUEST
        };

        const newState = relationReducer(undefined, action);

        expect( newState ).toStrictEqual(
            {
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
            }
        );
    });

    it('action.type === ACCEPT_REQUEST_SUCCESSのとき', () => {
        const action = {
            type: relationConstants.ACCEPT_REQUEST_SUCCESS
        };
        const currentState = {
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

        const newState = relationReducer(currentState, action);

        expect( newState ).toStrictEqual(
            {
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
            }
        );
    });

    it('action.type === ACCEPT_REQUEST_FAILUREのとき', () => {
        const dummyErrorMessage = 'ダミーエラーメッセージ';
        const action = {
            type : relationConstants.ACCEPT_REQUEST_FAILURE,
            error: dummyErrorMessage
        };
        const currentState = {
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

        const newState = relationReducer(currentState, action);
        
        expect( newState ).toStrictEqual(
            {
                firstName         : '',
                lastName          : '',
                donutPoint        : null,
                createdAt         : null,
                isAccepted        : null,
                isGetStartRelation: null,
                isMyself          : null,
                SendingUsers      : [],
                SendedUsers       : [],
                error             : dummyErrorMessage
            }
        );
    });

    it('action.type === GET_REQ_REQUESTのとき', () => {
        const action = {
            type: relationConstants.GET_REQ_REQUEST
        };

        const newState = relationReducer(undefined, action);

        expect( newState ).toStrictEqual(
            {
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
            }
        );
    });

    it('action.type === GET_REQ_ING_SUCCESSのとき', () => {
        const dummyUsersData = {
            targetUsers1: []
        };
        for (let i = 0; i < 3; i++) {
            const dummyUserData = {
                firstName : 'dummyFirstName' + i,
                lastName  : 'dummyLastName' + i,
                donutPoint: 99999 + i,
                createdAt : '9999/99/99',
                uid       : 1234567890 + i,
                isOnline  : false
            };
            dummyUsersData.targetUsers1.push(dummyUserData);
        };

        const action = {
            type   : relationConstants.GET_REQ_ING_SUCCESS,
            payload: dummyUsersData
        };
        const currentState = {
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

        const newState = relationReducer(currentState, action);

        expect( newState ).toStrictEqual(
            {
                firstName         : '',
                lastName          : '',
                donutPoint        : null,
                createdAt         : null,
                isAccepted        : null,
                isGetStartRelation: null,
                isMyself          : null,
                error             : null,
                SendingUsers      : dummyUsersData.targetUsers1,
                SendedUsers       : []
            }
        );
    });

    it('action.type === GET_REQ_TED_SUCCESSのとき', () => {
        const dummyUsersData = {
            targetUsers2: []
        };
        for (let i = 0; i < 3; i++) {
            const dummyUserData = {
                firstName : 'dummyFirstName' + i,
                lastName  : 'dummyLastName' + i,
                donutPoint: 99999 + i,
                createdAt : '9999/99/99',
                uid       : 1234567890 + i,
                isOnline  : false
            };
            dummyUsersData.targetUsers2.push(dummyUserData);
        };

        const action = {
            type   : relationConstants.GET_REQ_TED_SUCCESS,
            payload: dummyUsersData
        };
        const currentState = {
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

        const newState = relationReducer(currentState, action);

        expect( newState ).toStrictEqual(
            {
                firstName         : '',
                lastName          : '',
                donutPoint        : null,
                createdAt         : null,
                isAccepted        : null,
                isGetStartRelation: null,
                isMyself          : null,
                error             : null,
                SendingUsers      : [],
                SendedUsers       : dummyUsersData.targetUsers2
            }
        );
    });

    it('action.type === GET_REQ_FAILUREのとき', () => {
        const dummyUsersData = {
            targetUsers1: [],
            targetUsers2: []
        };
        for (let i = 0; i < 6; i++) {
            const dummyUserData = { 
                firstName : 'dummyFirstName' + i,
                lastName  : 'dummyLastName' + i,
                donutPoint: 99999 + i,
                createdAt : '9999/99/99',
                uid       : 1234567890 + i,
                isOnline  : false
            };
            if (i < 3) {
                dummyUsersData.targetUsers1.push(dummyUserData);
            } else {
                dummyUsersData.targetUsers2.push(dummyUserData);
            }
        };

        const action = {
            type: relationConstants.GET_REQ_FAILURE
        };
        const currentState = {
            firstName         : '',
            lastName          : '',
            donutPoint        : null,
            createdAt         : null,
            isAccepted        : null,
            isGetStartRelation: null,
            isMyself          : null,
            error             : null,
            SendingUsers      : dummyUsersData.targetUsers1,
            SendedUsers       : dummyUsersData.targetUsers2
        };

        const newState = relationReducer(currentState, action);

        expect( newState ).toStrictEqual(
            {
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
            }
        );
    });
});