import React, { useEffect }         from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  HashRouter as Router,
  Route
}                                   from "react-router-dom";
import HomePage                     from "./containers/HomePage/index";
import LoginPage                    from "./containers/LoginPage/index";
import RegisterPage                 from "./containers/RegisterPage/index";
import PrivateRoute                 from "./components/PrivateRoute";
import { isLoggedInUser }           from "./actions/index";
import                                   './App.css';

import UserInfoPage from "./containers/UserInfoPage/index";

function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticated) {
        dispatch(isLoggedInUser())
    }
  }, [auth.authenticated, dispatch]);

  return (
    <div className="App">
      <Router>
        {/* only logged in user can access this home route */}
        <PrivateRoute path="/"         component={ HomePage }     exact />
        <PrivateRoute path="/userInfo" component={ UserInfoPage } exact />
        <Route        path="/login"    component={ LoginPage }    exact />
        <Route        path="/signup"   component={ RegisterPage } exact />
      </Router>
    </div>
  );
}

export default App;