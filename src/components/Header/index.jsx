import React                        from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink }            from "react-router-dom";
import { logout }                   from "../../actions/index";
import                                   './style.css';

const Header = () => {

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const disp = () => {
        if (window.confirm('ログアウトしますか？')) {
            dispatch(logout(auth.uid));
        }
    };

    return (
        <header className='header'>
            <div style={{ display: 'flex' }}>
                <div className='logo'>
                    QuickDonut
                    <span className='version'> ver.2</span>
                </div>
                {
                    !auth.authenticated ?
                    <ul className="leftMenu">
                        <li><NavLink to={'/login'} replace>ログイン</NavLink></li>
                        <li><NavLink to={'/signup'} replace>新規登録</NavLink></li>
                    </ul> : null 

                }
            </div>
            <div style={{ margin: '20px 0', color: '#d8e8e8', fontWeight: 'bold' }}>
                { auth.authenticated ? `${auth.firstName} ${auth.lastName}  ` + 
                    ( user.MyDonutPoit === null ? '' : `DP : ${user.MyDonutPoit}` )
                : '' }
            </div>
                {
                    auth.authenticated ? 
                    <ul className="rightMenu">
                        <li>
                            <NavLink replace to={'/'} >トーク</NavLink>
                        </li>
                        <li>
                            <NavLink replace to={'/userInfo'} >アカウント管理</NavLink>
                        </li>
                        <li>
                            <NavLink replace to={'/'} onClick={ disp }>ログアウト</NavLink>
                        </li>
                    </ul> : null 
                }
        </header>
    );
} 

export default Header;