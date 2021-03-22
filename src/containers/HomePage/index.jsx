import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { 
    getRealtimeConversations, 
    getRealtimeUsers, 
    updateMessage,
    successDonutMessage
}                                     from '../../actions/user.action';
import Layout                         from "../../components/Layout/index";
import IconImage                      from "../../images/f_f_health_50_s512_f_health_50_2bg.png";
import                                     './style.css';

const User = (props) => {

    const { user, onClick } = props;

    return (
        <div onClick={() => onClick(user)} className="displayName" >
            <div className="displayPic">
                <img src={ IconImage } alt="" />
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
                <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
            </div>
        </div>
    );
};

const HomePage = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState('');
    const [message, setMessage] = useState('');
    const [userUid, setUserUid] = useState(null);
    const [unsubscribe, setUnsubscribe] = useState(null);
    const [donut, setDonut] = useState(false);

    useEffect(() => {
        const _ununsubscribe = dispatch(getRealtimeUsers(auth.uid))
            .then(unsubscribe => {
                return unsubscribe;
            })
            .catch(error => {
                console.log(error);
            });
        setUnsubscribe(_ununsubscribe);
    }, [auth.uid, dispatch]);

    useEffect(() => {
        return () => {
            setUnsubscribe((__unsubscribe) => {
                __unsubscribe
                    .then(f => f())
                    .catch(error => console.log(error));
            });
        };
    }, []);

    const initChat = (user) => {
        setChatStarted(true);
        setChatUser(`${user.firstName} ${user.lastName}`);
        setUserUid(user.uid);
        console.log(user);
        dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
    };

    const submitMessage = () => {
        const date = new Date();
        const str = date.getFullYear()
            + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
            + '/' + ('0' + date.getDate()).slice(-2)
            + ' ' + ('0' + date.getHours()).slice(-2)
            + ':' + ('0' + date.getMinutes()).slice(-2);
        console.log(str); 
        
        const msgObj = {
            user_uid_1: auth.uid,
            user_uid_2: userUid,
            createdAt: str,
            timestampData: date.getTime(),
            message,
            donut
        }

        if (message !== '' ) {
            dispatch(updateMessage(msgObj))
                .then(() => {
                    setMessage('');
                });
        }

        const diff = date.getTime() - user.LASTtimestampData;
        const inHour = Math.abs(diff) / (60*60*1000);
        const isSameLastSubmitUser = user.LASTsubmitUserId === auth.uid;
        if (user.LASTdonut && inHour <= 1 && !isSameLastSubmitUser) {
            dispatch(successDonutMessage(auth.uid));
            alert('早い返信をありがとう！（DonutPointが加算されます）');
        }
        setDonut(false);
    };

    if (false) {
        // コード内の使用のため
        console.log(unsubscribe);
    };

    return (
        <Layout>
            <section className="container">
                <div className="listOfUsers">
                    {
                        user.users.length > 0 ?
                        user.users.map(user => {
                            return (
                                <User 
                                    onClick={ initChat }
                                    key={ user.uid } 
                                    user={ user } 
                                />
                            );
                        }) : null
                    }                       
                </div>
                <div className="chatArea">
                    <div className="chatHeader">
                        {
                            chatStarted ? `${chatUser} DP : ${user.YourDonutPoit}` : ''
                        }
                    </div>
                    <div className="messageSections">
                        {
                            chatStarted ? 
                            user.conversations.map((con, index) => 
                                <div 
                                    key={ index } 
                                    style={{ textAlign: con.user_uid_1 === auth.uid ? 'right' : 'left' }}
                                >
                                    <p 
                                        className={ con.user_uid_1 === auth.uid ? 'myMessageStyle' : 'yourMessageStyle' }
                                        style={{ backgroundColor: con.donut ? '#e2474b' : null }}
                                    >{ con.message }</p>
                                    <p className='timestampData'>{ con.createdAt }</p>
                                </div> )
                            : null
                        }
                    </div>
                    {
                        chatStarted ?
                        <div className="chatControls">
                            <textarea 
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                placeholder="Write Message"
                            />
                            <button className="chatControlsButton" onClick={submitMessage}>SEND</button>
                            <button 
                                className="chatControlsButton"
                                onClick={() => {setDonut(!donut)}}
                                style={{ backgroundColor: donut ? '#e2474b' : '' }}
                            >DONUT</button>
                        </div> : null
                    }
                </div>
            </section>
        </Layout>
    );
};

export default HomePage;

