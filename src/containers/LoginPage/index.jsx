import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signin } from "../../actions/auth.action";
import Layout from "../../components/Layout/index";
import Card from "../../components/UI/Card/index";
import './style.css';

/*
* @author
* @function Layout
**/

const LoginPage = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    // useEffect(() => {
    //     if (!auth.authenticated) {
    //         dispatch(isLoggedInUser())
    //     }
    // }, []);

    const userLogin = (event) => {
        event.preventDefault();

        if (email === "") {
            alert("Email is required");
            return;
        }
        if (password === "") {
            alert("Password is required");
            return;
        }
        dispatch(signin({ email, password }));
    };

    if(auth.authenticated){
        return <Redirect to={'/'} />
    }

    return (
        <Layout>
            <div className="loginContainer">
                <Card>
                    <form onSubmit={userLogin}>
                        <h3>Login</h3>
                        <input
                            name="email"
                            type="text"
                            value={ email } 
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Email"
                        />
                        <input
                            name="password"
                            type="password"
                            value={ password } 
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Password"
                        />
                        <div>
                            <button>Login</button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
} 

export default LoginPage;