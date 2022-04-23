import firebase           from "firebase/app";
import                         'firebase/firestore';
import                         'firebase/auth';
import { authConstansts } from "./constants";

export const signup = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstansts.USER_LOGIM_REQUEST });
        const db = firebase.firestore();
        try {
            const data = await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password);
            const currentUer = firebase.auth().currentUser;
            const userFullName = `${user.firstName} ${user.lastName}`;
            const date = new Date();
            const strDate = date.getFullYear()
                + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
                + '/' + ('0' + date.getDate()).slice(-2);

            await currentUer.updateProfile({
                displayName: userFullName
            });
            await db.collection('users')
                .doc(data.user.uid)
                .set({
                    firstName: user.firstName,
                    lastName : user.lastName,
                    uid      : data.user.uid,
                    createdAt: strDate,
                    donutPoint: 0,
                    isOnline : true
                });
            const loggedInUser = {
                firstName: user.firstName,
                lastName : user.lastName,
                uid      : data.user.uid,
                email    : user.email
            };
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            alert('ログインに成功しました！');
            dispatch({
                type   : authConstansts.USER_LOGIM_SUCCESS,
                payload: { user: loggedInUser } 
            });
        } catch (error) {
            alert("エラーメッセージ：" + error.message);
            dispatch({
                type   : authConstansts.USER_LOGIM_FAILURE,
                payload: { error } 
            });
        }
    };
};

export const signin = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstansts.USER_LOGIM_REQUEST });
        const db = firebase.firestore();
        try {
            const data = await firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password);
            await db.collection('users')
                .doc(data.user.uid)
                .update({
                    isOnline: true
                });
            const name = data.user.displayName.split(" ");
            const firstName = name[0];
            const lastName = name[1];
            const loggedInUser = {
                firstName,
                lastName,
                uid  : data.user.uid,
                email: data.user.email
            };
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            dispatch({
                type   : authConstansts.USER_LOGIM_SUCCESS,
                payload: { user: loggedInUser } 
            });
        } catch (error) {
            alert("エラーメッセージ：" + error.message);
            dispatch({
                type   : authConstansts.USER_LOGIM_FAILURE,
                payload: { error } 
            });
        };
    };
};

export const isLoggedInUser = () => {
    return async (dispatch) => {
        dispatch({ type: authConstansts.USER_LOGIM_REQUEST });
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user) {
            dispatch({
                type   : authConstansts.USER_LOGIM_SUCCESS,
                payload: { user } 
            });
        } else {
            dispatch({
                type   : authConstansts.USER_LOGIM_FAILURE,
                payload: { error: 'Login again please' } 
            });
        }
    };
};

export const logout = (uid) => {
    return async (dispatch) => {
        dispatch({ type: authConstansts.USER_LOGOUT_REQUEST });
        const db = firebase.firestore();
        try {
            await db.collection('users')
                .doc(uid)
                .update({
                    isOnline: false
                });
            await firebase
                .auth()
                .signOut();
            localStorage.clear();
            dispatch({ type: authConstansts.USER_LOGOUT_SUCCESS });
        } catch (error) {
            dispatch({ type: authConstansts.USER_LOGOUT_FAILURE, payload: { error } });
        }
    };
};