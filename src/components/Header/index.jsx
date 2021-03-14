import React                        from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link }            from "react-router-dom";
import { logout }                   from "../../actions/index";
import                                   './style.css';

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <header className='header'>
            <div style={{ display: 'flex' }}>
                <div className='logo'>QuickDonut</div>
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
                    ( user.MyDonutPoit === null ? 'LetsTalk!' : `DP : ${user.MyDonutPoit}` )
                : '' }
            </div>
            <ul className="menu">
                {
                    auth.authenticated ? 
                    <li>
                        <Link replace to={'#'} onClick={ () => {
                            dispatch(logout(auth.uid))
                        }}>logout</Link>
                    </li> : null 
                }
                
            </ul>
        </header>
    );
} 

export default Header;