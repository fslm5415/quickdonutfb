import firebase          from "firebase/app";
import                        'firebase/firestore';
import { relationConstants } from "./constants";

export const getUserInfomation = (uid) => {
    return async (dispatch) => {
        dispatch({ type: relationConstants.GET_USERINFO_REQUEST });
        const db = firebase.firestore();
        let firstName = '';
        let lastName = '';
        let donutPoint = null;
        let createdAt = null;
        try {
            await db.collection('users')
                .doc(uid)
                .get()
                .then((doc) => {
                    firstName = doc.data().firstName;
                    lastName = doc.data().lastName;
                    donutPoint = doc.data().donutPoint;
                    createdAt = doc.data().createdAt;
                });
            const getUserInfo = {
                firstName,
                lastName,
                donutPoint,
                createdAt,
            };
            dispatch({
                type   : relationConstants.GET_USERINFO_SUCCESS,
                payload: { user: getUserInfo } 
            });
        } catch (error) {
            console.log('ユーザーがいない！');
            dispatch({
                type   : relationConstants.GET_USERINFO_FAILURE,
                payload: { error } 
            });
        }
    };
};