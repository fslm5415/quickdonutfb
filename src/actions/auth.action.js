import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import { authConstansts } from "./constants";

export const signup = (user) => {
    return async (dispatch) => {
        dispatch({ type: `${ authConstansts.USER_LOGIM }_REQUEST` });
        const db = firebase.firestore();
        try {
            const data = await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password);
            const currentUer = firebase.auth().currentUser;
            const userFullName = `${user.firstName} ${user.lastName}`;
            await currentUer.updateProfile({
                displayName: userFullName
            });
            await db.collection('users')
                .doc(data.user.uid)
                .set({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    uid: data.user.uid,
                    createdAt: new Date(),
                    // ここにポイント情報を追加できそう！
                    isOnline: true
                });
            const loggedInUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                email: user.email
            };
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            // ここをアラートにしてみてもいいかも
            console.log('User logged in successfully...!');
            dispatch({
                type: `${ authConstansts.USER_LOGIM }_SUCCESS`,
                payload: { user: loggedInUser } 
            });
        } catch (error) {
            dispatch({
                type: `${ authConstansts.USER_LOGIM }_FAILURE`,
                payload: { error } 
            });
        }
    };
};

export const signin = (user) => {
    return async (dispatch) => {
        dispatch({ type: `${ authConstansts.USER_LOGIM }_REQUEST` });
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
                uid: data.user.uid,
                email: data.user.email
            };
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            dispatch({
                type: `${ authConstansts.USER_LOGIM }_SUCCESS`,
                payload: { user: loggedInUser } 
            });
        } catch (error) {
            dispatch({
                type: `${ authConstansts.USER_LOGIM }_FAILURE`,
                payload: { error } 
            });
        };
    };
};

export const isLoggedInUser = () => {
    return async (dispatch) => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user) {
            dispatch({
                type: `${ authConstansts.USER_LOGIM }_SUCCESS`,
                payload: { user } 
            });
        } else {
            dispatch({
                type: `${ authConstansts.USER_LOGIM }_FAILURE`,
                payload: { error: 'Login again please' } 
            });
        }
    };
};

export const logout = (uid) => {
    return async (dispatch) => {
        dispatch({ type: `${authConstansts.USER_LOGOUT}_REQUEST` });
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
            dispatch({ type: `${authConstansts.USER_LOGOUT}_SUCCESS` });
        } catch (error) {
            console.log(error);
            dispatch({ type: `${authConstansts.USER_LOGOUT}_FAILURE`, payload: { error } });
        }
    };
};