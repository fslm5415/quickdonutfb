import firebase          from "firebase/app";
import                        'firebase/firestore';
import { relationConstants } from "./constants";

export const getUserInfomation = ({uid_1, uid_2}) => {
    return async (dispatch) => {
        dispatch({ type: relationConstants.GET_USERINFO_REQUEST });
        const db = firebase.firestore();
        const isMyself = uid_1 === uid_2;
        try {
            await db.collection('users')
                .doc(uid_2)
                .get()
                .then((doc) => {
                    const firstName = doc.data().firstName;
                    const lastName = doc.data().lastName;
                    const donutPoint = doc.data().donutPoint;
                    const createdAt = doc.data().createdAt;
                    const getUserInfo = {
                        firstName,
                        lastName,
                        donutPoint,
                        createdAt,
                        isMyself
                    };
                    dispatch({
                        type   : relationConstants.GET_USERINFO_SUCCESS,
                        payload: { user: getUserInfo } 
                    });
                });
            // ↓
            await db.collection('relationships')
                .where('sendingUser', '==', uid_1)
                .where('sendedUser', '==', uid_2)
                .get()
                .then((querySnapshot) => {
                    let isAccepted = null;
                    querySnapshot.forEach((doc) => {
                        isAccepted = false;
                        if (doc.data().isAccepted) {
                            isAccepted = true;
                        }
                    });
                    // nullなら存在しない
                    // falseなら相手の承認待ち
                    // trueならすでに友達！
                    dispatch({
                        type   : relationConstants.GET_USERINFO_SUCCESS,
                        payload: { user: {isAccepted} } 
                    });
                })
            await db.collection('relationships')
                .where('sendingUser', '==', uid_2)
                .where('sendedUser', '==', uid_1)
                .get()
                .then((querySnapshot) => {
                    let isGetStartRelation = null;
                    querySnapshot.forEach((doc) => {
                        isGetStartRelation = false;
                        if (doc.data().isAccepted) {
                            isGetStartRelation = true;
                        }
                    });
                    // nullなら存在しない
                    // falseならこっちの承認次第で友達に
                    // trueならすでに友達！
                    dispatch({
                        type   : relationConstants.GET_USERINFO_SUCCESS,
                        payload: { user: {isGetStartRelation} } 
                    });
                })
            // ↑
            
        } catch (error) {
            console.log('ユーザーがいない！');
            const errorMessage = '該当するユーザーが存在しません！';
            dispatch({
                type   : relationConstants.GET_USERINFO_FAILURE,
                payload: { errorMessage } 
            });
        }
    };
};

export const sendRelationshipRequest = ({uid_1, uid_2}) => {
    return async (dispatch) => {
        dispatch({ type: relationConstants.SEND_REQUEST_REQUEST });
        const db = firebase.firestore();
        try {
            await db
                .collection('relationships')
                .add({
                    sendingUser: uid_1,
                    sendedUser: uid_2,
                    isAccepted: false,
                });
            dispatch({
                type: relationConstants.SEND_REQUEST_SUCCESS
            });
        } catch (error) {
            const errorMessage = '友達申請に失敗しました…';
            dispatch({
                type: relationConstants.SEND_REQUEST_FAILURE,
                error : errorMessage
            });
        }
    };
};

export const acceptRelationshipReqest = ({uid_1, uid_2}) => {
    return async (dispatch) => {
        dispatch({ type: relationConstants.ACCEPT_REQUEST_REQUEST });
        const db = firebase.firestore();
        try {
            let targetId = '';
            console.log('uid_1? : ',uid_1);
            console.log('uid_2? : ',uid_2);
            console.log('targetId before? : ', targetId);
            await db
                .collection('relationships')
                .where('sendedUser', '==', uid_1)
                .where('sendingUser', '==', uid_2)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        targetId = doc.id;
                        console.log('doc.id? : ', doc.id);
                    });
                });
            console.log('targetId after? : ', targetId);
            await db
                .collection('relationships')
                .doc(targetId)
                .update({
                    isAccepted: true
                });
            dispatch({
                type: relationConstants.ACCEPT_REQUEST_SUCCESS
            });
            alert('リクエスト承認に成功しました！');
        } catch (error) {
            const errorMessage = 'リクエスト承認に失敗しました…';
            dispatch({
                type: relationConstants.ACCEPT_REQUEST_FAILURE,
                error : errorMessage
            });
        }
    };
};

export const getRequestingUsers = (uid) => {
    return async (dispatch) => {
        dispatch({ type: relationConstants.GET_REQ_REQUEST });
        const db = firebase.firestore();
        try {
            const unsubscribe = db.collection("relationships")
                .onSnapshot((querySnapshot) => {
                    const Array1 = [];
                    const Array2 = [];
                    querySnapshot.forEach((doc) => {
                        if(doc.data().sendingUser === uid && !doc.data().isAccepted) {
                            Array1.push(doc.data().sendedUser);
                        }
                        if(doc.data().sendedUser === uid && !doc.data().isAccepted) {
                            Array2.push(doc.data().sendingUser);
                        }
                    });
                    const targetUsers1 = [];
                    const targetUsers2 = [];
                    Array1.forEach((uid) => {
                        db.collection("users")
                            .where('uid', '==', uid)
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    targetUsers1.push(doc.data());
                                });
                                dispatch({ 
                                    type   : relationConstants.GET_REQ_ING_SUCCESS,
                                    payload: { targetUsers1 }
                                });
                            });
                    });
                    Array2.forEach((uid) => {
                        db.collection("users")
                            .where('uid', '==', uid)
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    targetUsers2.push(doc.data());
                                });
                                dispatch({ 
                                    type   : relationConstants.GET_REQ_TED_SUCCESS,
                                    payload: { targetUsers2 }
                                });
                            });
                    })
                });
            return unsubscribe;
        } catch (error) {
            dispatch({ 
                type   : relationConstants.GET_REQ_FAILURE
            });
        }
    };
};