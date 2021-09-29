import { ForgotPassword } from "./components/Authentication/ForgotPassword";
import { Login } from "./components/Authentication/Login";
import { Signup } from "./components/Authentication/Signup";
import { About } from "./components/About/About";
import { Home } from "./components/Home";
import { MyAds } from "./components/Ads/MyAds";
import { CreateAd } from "./components/Ads/CreateAd";
import { Profile } from "./components/Profile/Profile";
import { UpdateProfile } from "./components/Profile/UpdateProfile";
import { PrivateRoute } from "./components/PrivateRoute";
import { AdDetails } from "./components/Ads/AdDetails";
import { EditAd } from "./components/Ads/EditAd";
import * as ROUTES from "./constants/routes";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "./style/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
  typography: {
    fontFamily: "Syne",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: "2.1rem",
      textAlign: "center",
      margin: "40px 0",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.8rem",
      textAlign: "center",
      margin: "0px 0 40px 0",
      fontWeight: 500,
    },
  },
});

export const App = () => {
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
              <PrivateRoute path={ROUTES.AD_DETAILS} component={AdDetails} />

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
