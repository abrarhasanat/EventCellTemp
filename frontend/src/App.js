import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { PersonContext } from "./shared/context/person-context";
import Person from "./person/pages/Person";
import PersonAuth from "./person/pages/PersonAuth";
import DropDownList from "./shared/dropdown/DropDownList";
import UpdatePersonInfo from "./person/pages/UpdatePersonInfo";
import MainPage from "./component/MainPage/MainPage";
import CreatePackage from "./component/CreateTripModal/CreatePackage";
import trip_list from "./Constant";
import Profile from "./component/Profile/Profile";
import PackageShowPage from "./component/Trips/PackagShowPage";
import AddNewPlace from "./component/Places/AddNewPlace";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPerson, setIsPerson] = useState(true);
  const [uid, setUid] = useState();
  

  const login = useCallback((id) => {
    setIsLoggedIn(true);
    setUid(id);
    console.log("abrar " + isLoggedIn, uid);
  }, []);

  const logout = useCallback(() => {
    setUid(null);
    setIsLoggedIn(false);
    setIsPerson(false);
  }, []);

  const changeRule = useCallback(() => {
    setIsPerson(true);
  });
  let routes;

  if (isLoggedIn) {
    if (isPerson) {
      routes = (
        <Switch>
          <Route path="/package/:packageId">
            <PackageShowPage></PackageShowPage>
          </Route>
          <Route path="/packages" exact>
            <Profile/>
          </Route>
          <Route path="/createPackage">
            <CreatePackage/>
          </Route>
          <Route path = "/edit/:packageId/:day" exact>
           <AddNewPlace></AddNewPlace>  
          </Route>
          <Route path  = "/auth">
            <MainPage/>
          </Route>

          <Route path="/" >
            <MainPage/>
          </Route>
          
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Redirect to="/" />
        </Switch>
      );
    }
  } else {
    routes = (
      <Switch>
        <Route path="/a/b">
          <DropDownList />
        </Route>
        
        <Route path="/auth" exact>
          <PersonAuth />
        </Route>
        <Route path="/manage" exact>
          <MainPage></MainPage>
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
        <Redirect to = "/"></Redirect>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isPerson: isPerson,
        uid: uid,
        login: login,
        logout: logout,
        changeRule: changeRule,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
