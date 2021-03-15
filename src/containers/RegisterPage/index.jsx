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
                <Card>
                    <form onSubmit={ registerUser }>
                        <h3 className="registerTitle">Sign up</h3>
                        <input
                            className="registerInput"
                            name="firstName"
                            type="text"
                            value={ firstName } 
                            onChange={(event) => setFirstName(event.target.value)}
                            placeholder="First Name"
                        />
                        <input
                            className="registerInput"
                            name="lastName"
                            type="text"
                            value={ lastName } 
                            onChange={(event) => setLastName(event.target.value)}
                            placeholder="Last Name"
                        />
                        <input
                            className="registerInput"
                            name="email"
                            type="text"
                            value={ email } 
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Email"
                        />
                        <input
                            className="registerInput"
                            name="password"
                            type="password"
                            value={ password } 
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Password"
                        />
                        <div>
                            <button className="registerButton">Sign up</button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
};

export default RegisterPage;