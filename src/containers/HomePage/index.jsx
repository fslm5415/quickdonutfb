import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { 
    getRealtimeConversations, 
    getRealtimeUsers, 
    updateMessage,
    successDonutMessage
}                                     from '../../actions/user.action';
import Layout                         from "../../components/Layout/index";
import                                     './style.css';

const User = (props) => {

    const { user, onClick } = props;

    return (
        <div onClick={() => onClick(user)} className="displayName" >
            <div className="displayPic">
                <img src="https://chojugiga.com/c/chojuori0015/svg_chojuori0015_5.svg" alt="" />
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
                <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
            </div>
        </div>
    );
};

const HomePage = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState('');
    const [message, setMessage] = useState('');
    // これは相手のuidかも？！
    const [userUid, setUserUid] = useState(null);
    const [unsubscribe, setUnsubscribe] = useState(null);

    // ↓
    const [donut, setDonut] = useState(false);
    
    // ↑

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

    const submitMessage = (event) => {
        console.log('コード内の使用のためのコンソール : ', unsubscribe);
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
        // ↓
        const diff = date.getTime() - user.LASTtimestampData;
        const inHour = Math.abs(diff) / (60*60*1000);
        console.log('@@@@@@@@@@inHour? : ', inHour);
        const isSameLastSubmitUser = user.LASTsubmitUserId === auth.uid;
        console.log('@@@@@@@@@isSameLastSubmitUser? : ', isSameLastSubmitUser);
        if (user.LASTdonut && inHour <= 1 && !isSameLastSubmitUser) {
            dispatch(successDonutMessage(auth.uid));
            alert('ドーナツ獲得！');
        }
        // ↑
        setDonut(false);

        
    };

    const toggleDonut = () => {
        setDonut(!donut);
        console.log(donut);
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
                    <div className="chatHeader" onClick={() => {
                        // ↓
                        console.log('LASTtimestampData in HomePage? : ', user.LASTtimestampData);
                        console.log('LASTdonut in HomePage? : ', user.LASTdonut);   
                        // ↑
                    }}>
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
                                        style={{ backgroundColor: con.donut ? 'pink' : null }}
                                    >{ con.message }</p>
                                    <p className='timestampData'>{ con.createdAt }</p>
                                    {/* { console.log('==========================') }
                                    { console.log('message?', con.message) }
                                    { console.log('timestampData?', con.timestampData) }
                                    { console.log('==========================') } */}
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
                            <button onClick={submitMessage}>Send</button>
                            <button 
                                onClick={toggleDonut}
                                style={{ backgroundColor: donut ? 'pink' : '' }}
                            >Donut</button>
                        </div> : null
                    }
                </div>
            </section>
        </Layout>
    );
}

export default HomePage;

