import configureMockStore from "redux-mock-store";
import thunk              from "redux-thunk";
import firebase           from "firebase/app";
import                         'firebase/firestore';
import                         'firebase/auth';
import { 
    signup, 
    signin,
    isLoggedInUser,
    logout
}                         from "../../../src/actions/auth.action";
import { authConstansts } from "../../../src/actions/constants";

jest.spyOn(window, 'alert').mockImplementation(() => {});

jest.mock('firebase/app', () => {
    const userCredentialMock = {
        user: {
            sendEmailVerification: jest.fn(),
            displayName          : 'dummyFirstName dummyLastName',
            createdAt            : '9999/99/99', 
            donutPoint           : 999,
            email                : 'dummyEmail',
            uid                  : '12345abcde',
            isOnline             : false
        }
    }
    return {
        firestore: jest.fn().mockReturnValue({
            collection: jest.fn().mockReturnValue({
                doc: jest.fn().mockReturnValue({
                    set   : jest.fn(),
                    update: jest.fn()
                })
            })
        }),
        auth: jest.fn().mockReturnThis(),
        currentUser: {
            updateProfile: jest.fn()
        },
        signInWithEmailAndPassword: jest.fn(() => userCredentialMock),
        createUserWithEmailAndPassword: jest.fn(() => userCredentialMock),
        sendPasswordResetEmail: jest.fn(),
        signOut: jest.fn(),
        onAuthStateChanged: jest.fn(),
        initializeApp: jest.fn()
    }
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth.actionのテスト', () => {
    describe('signup関数のテスト', () => {
        it('成功時、ユーザー登録され、USER_LOGIM_SUCCESSと一緒にユーザーデータが渡される', async () => {
            const dummyUser = {
                firstName: 'dummyFirstName',
                lastName : 'dummyLastName',
                email    : 'dummyEmail',
                password : 'dummyPassword',
            };

            const store = mockStore();
            await store.dispatch( signup(dummyUser) );

            expect( store.getActions() ).toStrictEqual([
                {
                    type: authConstansts.USER_LOGIM_REQUEST
                },
                {
                    type   : authConstansts.USER_LOGIM_SUCCESS,
                    payload: { user: 
                        {
                            firstName: 'dummyFirstName',
                            lastName : 'dummyLastName',
                            email    : 'dummyEmail',
                            uid      : '12345abcde'
                        }
                    }
                }
            ]);
        });

        it('失敗時、USER_LOGIM_FAILUREと一緒にエラー情報が渡される', async () => {
            const dummyUser = {
                firstName: 'dummyFirstName',
                lastName : 'dummyLastName',
                email    : 'dummyEmail',
                password : 'dummyPassword',
            };
            const expedtedError = {
                message: 'ダミーエラーメッセージ'
            };

            firebase
                .auth()
                .createUserWithEmailAndPassword
                .mockRejectedValue(expedtedError);

            const store = mockStore();
            await store.dispatch( signup(dummyUser) );

            expect( store.getActions() ).toEqual([
                {
                    type: authConstansts.USER_LOGIM_REQUEST
                },
                {
                    type: authConstansts.USER_LOGIM_FAILURE,
                    payload: { error: expedtedError }
                }
            ])
        });
    });

    describe('signin関数のテスト', () => {
        it('成功時、USER_LOGIM_SUCCESSと一緒にユーザーデータが渡される', async () => {
            const dummyUser = {
                email    : 'dummyEmail',
                password : 'dummyPassword',
            };

            const store = mockStore();
            await store.dispatch( signin(dummyUser) );

            expect( store.getActions() ).toEqual([
                {
                    type: authConstansts.USER_LOGIM_REQUEST
                },
                {
                    type   : authConstansts.USER_LOGIM_SUCCESS,
                    payload: { user: 
                        {
                            firstName: 'dummyFirstName',
                            lastName : 'dummyLastName',
                            email    : 'dummyEmail',
                            uid      : '12345abcde'
                        }
                    }
                }
            ]);
        });

        it('失敗時、USER_LOGIM_FAILUREと一緒にエラー情報が渡される', async () => {
            const dummyUser = {
                email    : 'dummyEmail',
                password : 'dummyPassword',
            };
            const expedtedError = {
                message: 'ダミーエラーメッセージ'
            };

            firebase
                .auth()
                .signInWithEmailAndPassword
                .mockRejectedValue(expedtedError);

            const store = mockStore();
            await store.dispatch( signup(dummyUser) );

            expect( store.getActions() ).toEqual([
                {
                    type: authConstansts.USER_LOGIM_REQUEST
                },
                {
                    type   : authConstansts.USER_LOGIM_FAILURE,
                    payload: { error: expedtedError }
                }
            ])
        });
    });

    describe('isLoggedInUser関数のテスト', () => {
        it('成功時、USER_LOGIM_SUCCESSと一緒にユーザーデータが渡される', async () => {
            const store = mockStore();
            await store.dispatch( isLoggedInUser() );

            expect( store.getActions() ).toEqual([
                {
                    type: authConstansts.USER_LOGIM_REQUEST
                },
                {
                    type   : authConstansts.USER_LOGIM_SUCCESS,
                    payload: { user: 
                        {
                            firstName: 'dummyFirstName',
                            lastName : 'dummyLastName',
                            email    : 'dummyEmail',
                            uid      : '12345abcde'
                        }
                    }
                }
            ]);
        });

        it('失敗時、USER_LOGIM_FAILUREと一緒にエラー情報が渡される', async () => {
            localStorage.clear();

            const store = mockStore();
            await store.dispatch( isLoggedInUser() );

            expect( store.getActions() ).toEqual([
                {
                    type: authConstansts.USER_LOGIM_REQUEST
                },
                {
                    type   : authConstansts.USER_LOGIM_FAILURE,
                    payload: { error: 'Login again please' }
                }
            ])
        });
    });

    describe('logout関数のテスト', () => {
        it('成功時、USER_LOGIM_SUCCESSと一緒にユーザーデータが渡される', async () => {
            const dummyUid = '12345abcde';

            const store = mockStore();
            await store.dispatch( logout(dummyUid) );

            expect( store.getActions() ).toEqual([
                {
                    type: authConstansts.USER_LOGOUT_REQUEST
                },
                {
                    type: authConstansts.USER_LOGOUT_SUCCESS
                }
            ]);
        });

        it('失敗時、USER_LOGIM_FAILUREと一緒にエラー情報が渡される', async () => {
            const expedtedError = {
                message: 'ダミーエラーメッセージ'
            };

            firebase
                .auth()
                .signOut
                .mockRejectedValue(expedtedError);

            const store = mockStore();
            await store.dispatch( logout() );

            expect( store.getActions() ).toEqual([
                {
                    type: authConstansts.USER_LOGOUT_REQUEST
                },
                {
                    type   : authConstansts.USER_LOGOUT_FAILURE,
                    payload: { error: expedtedError }
                }
            ])
        });
    });
});