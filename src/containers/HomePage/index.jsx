import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { 
    getRealtimeConversations, 
    getRealtimeUsers, 
    updateMessage 
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
        const msgObj = {
            user_uid_1: auth.uid,
            user_uid_2: userUid,
            message
        }

        if (message !== '' ) {
            dispatch(updateMessage(msgObj))
                .then(() => {
                    setMessage('');
                });
        }
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
                            chatStarted ? chatUser : ''
                        }
                    </div>
                    <div className="messageSections">
                        {
                            chatStarted ? 
                            user.conversations.map((con, index) => 
                                <div key={ index } style={{ textAlign: con.user_uid_1 === auth.uid ? 'right' : 'left' }}>
                                    <p className={ con.user_uid_1 === auth.uid ? 'myMessageStyle' : 'yourMessageStyle' }>{ con.message }</p>
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
                        </div> : null
                    }
                </div>
            </section>
        </Layout>
    );
}

export default HomePage;

