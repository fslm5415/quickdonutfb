import firebase          from "firebase/app";
import                        'firebase/firestore';
import { userConstants } from "./constants";

// これはおそらく自分以外のユーザー全表示のアクション
// なのでフレンドのみ表示をここで実装する
export const getRealtimeUsers = (uid) => {
    return async (dispatch) => {
        dispatch({ type: userConstants.GET_REALTIME_USERS_REQUEST });
        const db = firebase.firestore();
        try {
            const unsubscribe = await db.collection("relationships")
                .onSnapshot((querySnapshot) => {
                    const frendUsersID = [];
                    querySnapshot.forEach((doc) => {
                        if(doc.data().sendedUser === uid && doc.data().isAccepted) {
                            frendUsersID.push(doc.data().sendingUser);
                        }
                        if(doc.data().sendingUser === uid && doc.data().isAccepted) {
                            frendUsersID.push(doc.data().sendedUser);
                        }
                    });
                    const users = [];
                    frendUsersID.forEach((uid) => {
                        db.collection("users")
                            .where('uid', '==', uid)
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    users.push(doc.data());
                                });
                                dispatch({ 
                                    type   : userConstants.GET_REALTIME_USERS_SUCCESS,
                                    payload: { users }
                                });
                            });
                    });
                });
            return unsubscribe;
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateMessage = (msgObj) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        try {
            await db
                .collection('conversations')
                .add({
                    ...msgObj,
                    isView   : false
                });
            dispatch({
                type: userConstants.UPDATE_MESSAGES_SUCCESS,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const successDonutMessage = (uid) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        let nextDonutPoit = 0;
        try {
            const data = await db.collection('users')
                .doc(uid);
            nextDonutPoit = await data
                .get()
                .then((doc) => {
                    return doc.data().donutPoint;
                });
            await db.collection('users')
                .doc(uid)
                .update({
                    donutPoint: nextDonutPoit + 1
                });
            dispatch({
                type: userConstants.SUBMIT_DONUT_SUCCESS
            });
        } catch (error) {
            console.log(error);
        } 
    };
};

export const getRealtimeConversations = (user) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        let LASTtimestampData = 0;
        let LASTdonut = false;
        let LASTsubmitUserId = '';
        const MyUserData = await db.collection('users')
            .doc(user.uid_1);
        const MyDonutPoit = await MyUserData
            .get()
            .then((doc) => {
                return doc.data().donutPoint;
            }); 
        const YourUserData = await db.collection('users')
            .doc(user.uid_2);
        const YourDonutPoit = await YourUserData
            .get()
            .then((doc) => {
                return doc.data().donutPoint;
            }); 

        const unsubscribe = db.collection('conversations')
            .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
            .orderBy('timestampData', 'asc')
            .onSnapshot((querySnapshot) => {
                const conversations = [];
                querySnapshot.forEach((doc) => {
                    if(
                        (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
                        ||
                        (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
                    ) {
                        conversations.push(doc.data());
                        if (doc.data().timestampData > LASTtimestampData) {
                            LASTtimestampData = doc.data().timestampData;
                            LASTdonut = doc.data().donut;
                            LASTsubmitUserId = doc.data().user_uid_1;
                        }
                        // console.log('message? : ', doc.data().message);
                        // console.log('donut? : ', doc.data().donut);
                        // console.log('timestampData? : ', doc.data().timestampData);
                        // console.log('LASTtimestampData? : ', LASTtimestampData);
                        // console.log('LASTdonut? : ', LASTdonut);
                        // console.log('LASTsubmitUserId? : ', LASTsubmitUserId);
                        // console.log('===============================');
                    }
                    if(conversations.length > 0) {
                        dispatch({
                            type   : userConstants.GET_REALTIME_MESSAGES_SUCCESS,
                            payload: {conversations, LASTtimestampData, LASTdonut, MyDonutPoit, YourDonutPoit, LASTsubmitUserId}
                        });
                    } else {
                        dispatch({
                            type   : userConstants.GET_REALTIME_MESSAGES_FAILURE,
                            payload: {conversations}
                        });
                    }
                });
            });
            // user_uid_1 === 'myId' & user_uid_2 === 'yourId' OR user_uid_1 === 'yourId' & user_uid_2 === 'myId' 
        return unsubscribe;
    };
};