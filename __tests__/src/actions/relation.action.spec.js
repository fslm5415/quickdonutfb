import configureMockStore    from "redux-mock-store";
import thunk                 from "redux-thunk";
import firebase              from "firebase/app";
import                            'firebase/firestore';
import { 
    getUserInfomation,
    sendRelationshipRequest,
    acceptRelationshipReqest,
    getRequestingUsers
}                            from "../../../src/actions/relation.action";
import { relationConstants } from "../../../src/actions/constants";

const userMock = {
    firstName  : 'dummyFirstName',
    lastName   : 'dummyLastName',
    createdAt  : '9999/99/99',
    donutPoint : 999,
    email      : 'dummyEmail',
    uid        : '12345abcde',
    isOnline   : false
};
const anotherUserMock = [
    {
        firstName  : 'anotherFirstName0',
        lastName   : 'anotherLastName0',
        createdAt  : '9999/99/99', 
        donutPoint : 999,
        email      : 'dummyEmail',
        uid        : '67890fghij0',
        isOnline   : false,
    },
    {
        firstName  : 'anotherFirstName1',
        lastName   : 'anotherLastName1',
        createdAt  : '9999/99/99', 
        donutPoint : 999,
        email      : 'dummyEmail',
        uid        : '67890fghij1',
        isOnline   : false,
    },
    {
        firstName  : 'anotherFirstName2',
        lastName   : 'anotherLastName2',
        createdAt  : '9999/99/99', 
        donutPoint : 999,
        email      : 'dummyEmail',
        uid        : '67890fghij2',
        isOnline   : false,
    }
];
const relationshipsMock = [
    {
        sendedUser : '12345abcde',
        sendingUser: '67890fghij0',
        isAccepted : false,
        data       : () => {
            return relationshipsMock[0];
        }
    },
    {
        sendedUser : '67890fghij1',
        sendingUser: '12345abcde',
        isAccepted : false,
        data       : () => {
            return relationshipsMock[1];
        }
    },
    {
        sendedUser : '12345abcde',
        sendingUser: '67890fghij2',
        isAccepted : true,
        data       : () => {
            return relationshipsMock[2];
        }
    }
];

jest.spyOn(window, 'alert').mockImplementation(() => {});

jest.mock('firebase/app', () => {
    return {
        firestore: jest.fn().mockReturnValue({
            collection: jest.fn().mockReturnValue({
                doc: jest.fn().mockReturnValue({
                    get: jest.fn(() => Promise.resolve({
                        data: () => anotherUserMock[0]
                    })),
                    update: jest.fn()
                }),
                onSnapshot: jest.fn((func) => {
                    func(relationshipsMock);
                }),
                where: jest.fn().mockReturnValue({
                    where: jest.fn().mockReturnValue({
                        get: jest.fn(() => Promise.resolve([{
                            data: () => relationshipsMock[0]
                        }])),
                    }),
                    get: jest.fn(() => Promise.resolve([{
                        data: () => anotherUserMock[1]
                    }]))
                }),
                add: jest.fn()
            })
        })
    };
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('relation.actionのテスト', () => {
    describe('getUserInfomation関数のテスト', () => {
        it('成功時、GET_USERINFO_SUCCESSと一緒にユーザーデータが渡される', async () => {
            const dummyUids = {
                uid_1: '12345abcde',
                uid_2: '67890fghij'
            };

            const store = mockStore();
            await store.dispatch( getUserInfomation(dummyUids) );

            expect( store.getActions() ).toStrictEqual([
                {
                    type: relationConstants.GET_USERINFO_REQUEST
                },
                {
                    type   : relationConstants.GET_USERINFO_SUCCESS,
                    payload: { user: 
                        {
                            firstName         : anotherUserMock[0].firstName,
                            lastName          : anotherUserMock[0].lastName,
                            donutPoint        : anotherUserMock[0].donutPoint,
                            createdAt         : anotherUserMock[0].createdAt,
                            isMyself          : false,
                        }
                    }
                },
                {
                    type   : relationConstants.GET_USERINFO_SUCCESS,
                    payload: { user: 
                        {
                            isAccepted        : false,
                        }
                    }
                },
                {
                    type   : relationConstants.GET_USERINFO_SUCCESS,
                    payload: { user: 
                        {
                            isGetStartRelation: false
                        }
                    }
                }
            ]);
        });

        it('失敗時、USER_LOGIM_FAILUREと一緒にエラーメッセージが渡される', async () => {
            const dummyUids = {};
            const errorMessage = '該当するユーザーが存在しません！';
            const throwError = new Error('ダミーエラー');

            firebase
                .firestore()
                .collection()
                .doc()
                .get
                .mockRejectedValue(throwError);

            const store = mockStore();
            await store.dispatch( getUserInfomation(dummyUids) );

            expect( store.getActions() ).toStrictEqual([
                {
                    type: relationConstants.GET_USERINFO_REQUEST
                },
                {
                    type   : relationConstants.GET_USERINFO_FAILURE,
                    payload: { errorMessage } 
                }
            ]);
        });
    });

    describe('sendRelationshipRequest関数のテスト', () => {
        it('成功時、SEND_REQUEST_SUCCESSが渡される', async () => {
            const dummyUids = {
                uid_1: '12345abcde',
                uid_2: '67890fghij'
            };

            const store = mockStore();
            await store.dispatch( sendRelationshipRequest(dummyUids) );

            expect( store.getActions() ).toStrictEqual([
                {
                    type: relationConstants.SEND_REQUEST_REQUEST
                },
                {
                    type: relationConstants.SEND_REQUEST_SUCCESS,
                }
            ]);
        });

        it('失敗時、USER_LOGIM_FAILUREと一緒にエラーメッセージが渡される', async () => {
            const dummyUids = {};
            const errorMessage = '友達申請に失敗しました…';
            const throwError = new Error('ダミーエラー');

            firebase
                .firestore()
                .collection()
                .add
                .mockRejectedValue(throwError);

            const store = mockStore();
            await store.dispatch( sendRelationshipRequest(dummyUids) );

            expect( store.getActions() ).toStrictEqual([
                {
                    type: relationConstants.SEND_REQUEST_REQUEST
                },
                {
                    type : relationConstants.SEND_REQUEST_FAILURE,
                    error: errorMessage
                }
            ]);
        });
    });

    describe('acceptRelationshipReqest関数のテスト', () => {
        it('成功時、SEND_REQUEST_SUCCESSが渡される', async () => {
            const dummyUids = {
                uid_1: '12345abcde',
                uid_2: '67890fghij'
            };

            const store = mockStore();
            await store.dispatch( acceptRelationshipReqest(dummyUids) );

            expect( store.getActions() ).toStrictEqual([
                {
                    type: relationConstants.ACCEPT_REQUEST_REQUEST
                },
                {
                    type: relationConstants.ACCEPT_REQUEST_SUCCESS,
                }
            ]);
        });

        it('失敗時、ACCEPT_REQUEST_FAILUREと一緒にエラーメッセージが渡される', async () => {
            const dummyUids = {};
            const errorMessage = 'リクエスト承認に失敗しました…';
            const throwError = new Error('ダミーエラー');

            firebase
                .firestore()
                .collection()
                .where()
                .where()
                .get
                .mockRejectedValue(throwError);

            const store = mockStore();
            await store.dispatch( acceptRelationshipReqest(dummyUids) );

            expect( store.getActions() ).toStrictEqual([
                {
                    type: relationConstants.ACCEPT_REQUEST_REQUEST
                },
                {
                    type : relationConstants.ACCEPT_REQUEST_FAILURE,
                    error: errorMessage
                }
            ]);
        });
    });

    describe('getRequestingUsers関数のテスト', () => {
        it('成功時、関係性のあるユーザーデータが渡される', async () => {
            const dummyUid = '12345abcde';

            const store = mockStore();
            await store.dispatch( getRequestingUsers(dummyUid) );

            expect( store.getActions() ).toStrictEqual([
                {
                    type: relationConstants.GET_REQ_REQUEST
                },
                {
                    type   : relationConstants.GET_REQ_ING_SUCCESS,
                    payload: { targetUsers1: [
                        {
                            firstName  : 'anotherFirstName1',
                            lastName   : 'anotherLastName1',
                            createdAt  : '9999/99/99', 
                            donutPoint : 999,
                            email      : 'dummyEmail',
                            uid        : '67890fghij1',
                            isOnline   : false,
                        }
                    ] }
                },
                {
                    type   : relationConstants.GET_REQ_TED_SUCCESS,
                    payload: { targetUsers2: [
                        {
                            firstName  : 'anotherFirstName1',
                            lastName   : 'anotherLastName1',
                            createdAt  : '9999/99/99', 
                            donutPoint : 999,
                            email      : 'dummyEmail',
                            uid        : '67890fghij1',
                            isOnline   : false,
                        }
                    ] }
                }
            ]);
        });

        it('失敗時、USER_LOGIM_FAILUREが渡される', async () => {
            const dummyUid = '12345abcde';
            const throwError = new Error('ダミーエラー');;

            firebase
                .firestore()
                .collection
                .mockReturnValue(throwError);

            const store = mockStore();
            await store.dispatch( getRequestingUsers(dummyUid) );

            expect( store.getActions() ).toStrictEqual([
                {
                    type: relationConstants.GET_REQ_REQUEST
                },
                {
                    type: relationConstants.GET_REQ_FAILURE
                }
            ]);
        });
    });
});