import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import firebase          from "firebase/app";
import                        'firebase/firestore';
import { userConstants } from "../../../src/actions/constants";
import { 
    getRealtimeUsers,
    updateMessage,
    successDonutMessage,
    getRealtimeConversations
} from "../../../src/actions/user.action";

const userMock = [
    {
        firstName  : 'dummyFirstName',
        lastName   : 'dummyLastName',
        createdAt  : '9999/99/99',
        donutPoint : 999,
        email      : 'dummyEmail',
        uid        : '12345abcde',
        isOnline   : false
    }
];
const relationshipsMock = [
    {
        sendedUser : '12345abcde',
        sendingUser: '67890fghij',
        isAccepted : true,
        data       : () => {
            return relationshipsMock[0];
        }
    }
];
const anotherUserMock = [
    {
        firstName  : 'anotherFirstName',
        lastName   : 'anotherLastName',
        createdAt  : '9999/99/99', 
        donutPoint : 999,
        email      : 'dummyEmail',
        uid        : '67890fghij',
        isOnline   : false,
    }
];
const conversationsMock = [];
for (let i = 0; i < 5; i++) {
    const conversation = {
        user_uid_1   : '12345abcde',
        user_uid_2   : '67890fghij',
        isView       : false,
        donut        : false,
        createdAt    : '9999/99/99',
        timestampData: 123456789 + i,
        message      : 'メッセージ' + i
    };
    conversationsMock.push(conversation);
}

jest.mock('firebase/app', () => {
    return {
        firestore: jest.fn().mockReturnValue({
            collection: jest.fn().mockReturnValue({
                doc: jest.fn().mockReturnValue({
                    set: jest.fn(),
                    update: jest.fn(),
                    get: jest.fn(() => Promise.resolve({
                        data: () => userMock[0]
                    }))
                }),
                onSnapshot: jest.fn((func) => {
                    func(relationshipsMock);
                }),
                where: jest.fn(() => {
                    return {
                        get: jest.fn(() => Promise.resolve([{
                            data: () => anotherUserMock[0]
                        }])),
                        orderBy: jest.fn().mockReturnValue({
                            onSnapshot: jest.fn((func) => {
                                const funcArray = [];
                                for (let i = 0; i < 5; i++) {
                                    const f = {
                                        data: () => conversationsMock[i]
                                    };
                                    funcArray.push(f);
                                }
                                func(funcArray);
                            })
                        })
                    }
                }),
                add: jest.fn()
            })
        })
    };
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user.actionのテスト', () => {
    describe('getRealtimeUsers関数のテスト', () => {
        it('成功時、GET_REALTIME_USERS_SUCCESSと一緒に現在フレンドのユーザーデータが渡される', async () => {
            const dummyUid = '12345abcde';

            const store = mockStore();
            await store.dispatch( getRealtimeUsers(dummyUid) );

            expect( store.getActions() ).toStrictEqual([
                {
                    type: userConstants.GET_REALTIME_USERS_REQUEST
                },
                {
                    type   : userConstants.GET_REALTIME_USERS_SUCCESS,
                    payload: {
                        users : [
                            {
                                firstName : 'anotherFirstName',
                                lastName  : 'anotherLastName',
                                createdAt : '9999/99/99', 
                                donutPoint: 999,
                                email     : 'dummyEmail',
                                uid       : '67890fghij',
                                isOnline  : false,
                            }
                        ]
                    }
                }
            ]);
        });
    });

    describe('getRealtimeConversations関数のテスト', () => {
        it('成功時、GET_REALTIME_MESSAGES_SUCCESSと一緒に対応するチャットデータが渡される', async () => {
            const dummyUids = {
                uid_1: '12345abcde',
                uid_2: '67890fghij'
            };

            const expectedResults = [];
            for (let i = 0; i < 5; i++) {
                const obj = {
                    type   : userConstants.GET_REALTIME_MESSAGES_SUCCESS,
                    payload: {
                        conversations    : conversationsMock,
                        MyDonutPoit      : 999,
                        YourDonutPoit    : 999,
                        LASTtimestampData: conversationsMock[i].timestampData,
                        LASTdonut        : false,
                        LASTsubmitUserId : '12345abcde'
                    }
                }
                expectedResults.push(obj);
            }

            const store = mockStore();
            await store.dispatch( getRealtimeConversations(dummyUids) );

            expect( store.getActions() ).toEqual( expectedResults );
        });

        it('失敗時、GET_REALTIME_MESSAGES_FAILUREと一緒に空のチャットデータが渡される', async () => {
            const dummyUids = {
                uid_1: '',
                uid_2: ''
            };
            const expectedResults = [];
            for (let i = 0; i < 5; i++) {
                const obj = {
                    type   : userConstants.GET_REALTIME_MESSAGES_FAILURE,
                    payload: {
                        conversations    : []
                    }
                }
                expectedResults.push(obj);
            }

            const store = mockStore();
            await store.dispatch( getRealtimeConversations(dummyUids) );

            expect( store.getActions() ).toEqual(expectedResults);
        });
    });

    describe('updateMessage関数のテスト', () => {
        it('成功時、UPDATE_MESSAGES_SUCCESSが渡される', async () => {
            const dummyMsgObj = {
                user_uid_1   : '12345abcde',
                user_uid_2   : '67890fghij',
                createdAt    : '9999/99/99',
                timestampData: 123456789,
                message      : 'ダミーメッセージ',
                donut        : false
            };

            const store = mockStore();
            await store.dispatch( updateMessage(dummyMsgObj) );

            expect( store.getActions() ).toStrictEqual([
                {
                    type: userConstants.UPDATE_MESSAGES_SUCCESS
                }
            ]);
        });
    });

    describe('successDonutMessage関数のテスト', () => {
        it('成功時、SUBMIT_DONUT_SUCCESSが渡される', async () => {
            const dummyUid = '12345abcde';

            const store = mockStore();
            await store.dispatch( successDonutMessage(dummyUid) );

            expect( store.getActions() ).toStrictEqual([
                {
                    type: userConstants.SUBMIT_DONUT_SUCCESS
                }
            ]);
        });
    });
});