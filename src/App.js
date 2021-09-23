import ForgotPassword from "./components/Authentication/ForgotPassword";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import About from "./components/About/About";
import Home from "./components/Home";
import MyAds from "./components/Ads/MyAds";
import CreateAd from "./components/Ads/CreateAd";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/Profile/UpdateProfile";
import PrivateRoute from "./components/PrivateRoute";
import AdDetails from "./components/Ads/AdDetails";
import AdCard from "./components/Ads/AdCard";
import EditAd from "./components/Ads/EditAd";
import * as ROUTES from "./constants/routes";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#eae0d4",
    },
    secondary: {
      main: "#04007c",
    },
  },
  typography: {
    fontFamily: "Syne",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path={ROUTES.HOME} component={Home} />

              <PrivateRoute path={ROUTES.PROFILE} component={Profile} />
              <PrivateRoute
                path={ROUTES.UPDATE_PROFILE}
                component={UpdateProfile}
              />
              <PrivateRoute path={ROUTES.CREATE_AD} component={CreateAd} />
              <PrivateRoute path={ROUTES.MY_ADS} component={MyAds} />
              {/* <PrivateRoute path={`${ROUTES.EDIT_AD}/:id`} component={EditAd} /> */}
              <PrivateRoute path={ROUTES.EDIT_AD} component={EditAd} />

              <Route path={ROUTES.AD_CARD} component={AdCard} />
              <Route path={ROUTES.AD_DETAILS} component={AdDetails} />
              <Route path={ROUTES.ABOUT} component={About} />
              <Route path={ROUTES.LOG_IN} component={Login} />
              <Route path={ROUTES.SIGN_UP} component={Signup} />
              <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
            </Switch>
          </Layout>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
