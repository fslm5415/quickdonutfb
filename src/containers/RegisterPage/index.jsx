import React, { useState }          from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect }                 from "react-router-dom";
import Layout                       from "../../components/Layout/index";
import Card                         from "../../components/UI/Card/index";
import { signup }                   from "../../actions/index";
import                                   './style.css';

const RegisterPage = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const registerUser = (event) => {
        event.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            password
        };
        dispatch(signup(user));
    };

    if(auth.authenticated){
        return <Redirect to={'/'} />
    }

    return (
        <Layout>
            <div className="registerContainer">
                <div className="attentionCard">
                    <h3>ご利用上の注意</h3>
                    <p>このアプリケーションは、素人が作ったおもちゃです。
                        ご利用の際はダミーのメールアドレスで認証いただき、
                        チャット上での機密情報のやり取り等はご遠慮ください。
                        制作者は情報漏洩等全ての責任を負いかねます。
                        以下のフォームから新規登録いただいた方は、この注意事項に同意したものとします。</p>
                </div>
                <Card>
                    <form onSubmit={ registerUser }>
                        <h3 className="registerTitle">新規登録</h3>
                        <input
                            className="registerInput"
                            name="firstName"
                            type="text"
                            value={ firstName } 
                            onChange={(event) => setFirstName(event.target.value)}
                            placeholder=" 姓"
                        />
                        <input
                            className="registerInput"
                            name="lastName"
                            type="text"
                            value={ lastName } 
                            onChange={(event) => setLastName(event.target.value)}
                            placeholder=" 名"
                        />
                        <input
                            className="registerInput"
                            name="email"
                            type="text"
                            value={ email } 
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder=" Eメール"
                        />
                        <input
                            className="registerInput"
                            name="password"
                            type="password"
                            value={ password } 
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder=" パスワード"
                        />
                        <div>
                            <button className="registerButton">登録</button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
};

export default RegisterPage;