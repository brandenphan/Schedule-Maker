import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthProvider from "./UserAuth/context/AuthContext";
import PrivateRoute from "./UserAuth/Routes/PrivateRoute";
import LoggedInRoute from "./UserAuth/Routes/LoggedInRoute";

import Login from "./UserAuth/Login/Login";
import Signup from "./UserAuth/Signup/Signup";
import ForgotPassword from "./UserAuth/ForgotPassword/ForgotPassword";
import ChangePassword from "./UserAuth/ChangePassword/ChangePassword";
import LandingPage from "./LandingPage";
import DashboardPage from "./Dashboard/Dashboard";
import SchedulePage from "./SchedulePage/SchedulePage";

function App() {
	return (
		<Router>
			<Switch>
				<AuthProvider>
					<Route exact path="/" component={LandingPage} />
					<LoggedInRoute path="/Signup" component={Signup} />
					<LoggedInRoute path="/Login" component={Login} />
					<Route path="/ForgotPassword" component={ForgotPassword} />

					<PrivateRoute path="/ChangePassword" component={ChangePassword} />
					<PrivateRoute path="/Dashboard" component={DashboardPage} />
					<PrivateRoute path="/SchedulePage" component={SchedulePage} />
				</AuthProvider>
			</Switch>
		</Router>
	);
}

export default App;
