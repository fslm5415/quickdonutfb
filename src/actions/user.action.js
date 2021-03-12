import firebase          from "firebase/app";
import                        'firebase/firestore';
import { userConstants } from "./constants";

// これはおそらく自分以外のユーザー全表示のアクション
// なのでフレンドのみ表示をここで実装する
export const getRealtimeUsers = (uid) => {
    return async (dispatch) => {
        dispatch({ type: userConstants.GET_REALTIME_USERS_REQUEST });
        const db = firebase.firestore();
        const unsubscribe = await db.collection("users")
            .onSnapshot((querySnapshot) => {
                const users = [];
                querySnapshot.forEach((doc) => {
                    if(doc.data().uid !== uid) {
                        users.push(doc.data());
                    }
                });
                dispatch({ 
                    type   : userConstants.GET_REALTIME_USERS_SUCCESS,
                    payload: { users }
                });
            });
        return unsubscribe;
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
                    isView   : false,
                    createdAt: new Date()
                });
            dispatch({
                type: userConstants.GET_REALTIME_MESSAGES_SUCCESS,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getRealtimeConversations = (user) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        const unsubscribe = db.collection('conversations')
            .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
            .orderBy('createdAt', 'asc')
            .onSnapshot((querySnapshot) => {
                const conversations = [];
                querySnapshot.forEach((doc) => {
                    if(
                        (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
                        ||
                        (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
                    ) {
                        conversations.push(doc.data());
                    }
                    if(conversations.length > 0) {
                        dispatch({
                            type   : userConstants.GET_REALTIME_MESSAGES_SUCCESS,
                            payload: {conversations}
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