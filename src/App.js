import ForgotPassword from "./components/Authentication/ForgotPassword";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Navigation from "./components/Navigation";
import About from "./components/About/About";
import Home from "./components/Home";
import MyAds from "./components/Ads/MyAds";
import AddNewAd from "./components/Ads/AddNewAd";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/Profile/UpdateProfile";
import PrivateRoute from "./components/PrivateRoute";
import AdDetails from "./components/Ads/AdDetails";
import AdCard from "./components/Ads/AdCard";

import * as ROUTES from "./constants/routes";
import { GlobalStyle } from "./style/Themes";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <GlobalStyle />
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path={ROUTES.HOME} component={Home} />

          <PrivateRoute path={ROUTES.PROFILE} component={Profile} />
          <PrivateRoute
            path={ROUTES.UPDATE_PROFILE}
            component={UpdateProfile}
          />
          <PrivateRoute path={ROUTES.ADD_NEW_AD} component={AddNewAd} />
          <PrivateRoute path={ROUTES.MY_ADS} component={MyAds} />

          <Route path={ROUTES.AD_CARD} component={AdCard} />
          <Route path={ROUTES.AD_DETAILS} component={AdDetails} />
          <Route path={ROUTES.ABOUT} component={About} />
          <Route path={ROUTES.LOG_IN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={Signup} />
          <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
