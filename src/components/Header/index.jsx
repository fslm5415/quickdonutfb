import React                        from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link }            from "react-router-dom";
import { logout }                   from "../../actions/index";
import                                   './style.css';

const Header = () => {

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <header className='header'>
            <div style={{ display: 'flex' }}>
                <div className='logo'>
                    <Link replace to={'/'} style={{ color: "white" }}>QuickDonut</Link>
                </div>
                {
                    !auth.authenticated ?
                    <ul className="leftMenu">
                    <li><NavLink to={'/login'} replace>login</NavLink></li>
                    <li><NavLink to={'/signup'} replace>signup</NavLink></li>
                    </ul> : null 

                }
            </div>
            <div style={{ margin: '20px 0', color: '#fff', fontWeight: 'bold' }}>
                { auth.authenticated ? `Hi!   ${auth.firstName} ${auth.lastName}  ` + 
                    ( user.MyDonutPoit === null ? '' : `DP : ${user.MyDonutPoit}` )
                : '' }
            </div>
                {
                    auth.authenticated ? 
                    <ul className="menu">
                        <li style={{ marginRight: 20 }}>
                            <Link replace to={'/userInfo'} >relationship </Link>
                        </li>
                        <li>
                            <Link replace to={'#'} onClick={ () => {
                                dispatch(logout(auth.uid))
                            }}>logout</Link>
                        </li>
                    </ul> : null 
                }
        </header>
    );
} 

export default Header;