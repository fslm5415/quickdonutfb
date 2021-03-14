import React, { useState } from "react";
import { useDispatch, useSelector }   from 'react-redux';
import Layout from "../../components/Layout/index";
import { getUserInfomation } from "../../actions/relation.action";
import "./style.css";

const SendingRequestUser = (props) => {
    return (
        <div className="displayName" >
            <div className="displayPic">
                <img src="http://flat-icon-design.com/f/f_object_174/s512_f_object_174_1bg.png" alt="" />
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                <span style={{fontWeight: 500}}>サン　プル子</span>
            </div>
        </div>
    );
};

const SendedRequestUser = (props) => {
    return (
        <div className="displayName" >
            <div className="displayPic">
                <img src="http://flat-icon-design.com/f/f_object_174/s512_f_object_174_1bg.png" alt="" />
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                <span style={{fontWeight: 500}}>サン　プル男</span>
            </div>
        </div>
    );
};

const UserInfoPage = (props) => {

    const dispatch = useDispatch();
    const relation = useSelector(state => state.relation);
    const [userID, setUserID] = useState('');

    const getUserInfo = (event) => {
        event.preventDefault();
        if (userID === "") {
            alert('UserIDを入力してください');
            return;
        }
        dispatch(getUserInfomation(userID));
        setUserID('');
    };

    return (
        <Layout>
            <section className="container">
                <div className="listOfUsers">

                    <div className="displayHeader">Sending relationship request...</div>
                    <SendingRequestUser />     

                    <div className="displayHeader start">Start a relationship?</div>
                    <SendedRequestUser  />

                </div>
                <div className="userInfoArea">
                    <div className="userInfoHeader">
                        <form onSubmit={getUserInfo}>
                            <input 
                                name="userID"
                                type="text"
                                value={ userID }
                                onChange={(event) => setUserID(event.target.value)}
                                placeholder="UserID"
                                className="userIDinput"
                            />
                            <button>Search</button>
                        </form>
                    </div>
                        { 
                            relation.firstName !== '' ?
                            <div className="userInfoSections">
                                <div className="userInfoPic">
                                    <img src="http://flat-icon-design.com/f/f_object_174/s512_f_object_174_1bg.png" alt="" />
                                </div>
                                <div className="userInfoName">{ `${relation.firstName} ${relation.lastName}` }</div>
                                <div className="userInfoDonuts">DP : { relation.donutPoint }</div>
                                <div className="userInfoCreatedAt">{ relation.createdAt }</div>
                                <div className="userInfoTouch">
                                    <button>Touch!</button>
                                </div>
                            </div> : null 
                        }
                        {
                            relation.error !== null ?
                            <div className="userInfoSections">
                                <p style={{ marginTop: 200 }}>該当するユーザーが存在しません</p>
                            </div> : null
                        }
                </div>
            </section>
        </Layout>
    );
};

export default UserInfoPage;