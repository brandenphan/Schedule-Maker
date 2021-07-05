import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthProvider from "./UserAuth/context/AuthContext";
import PrivateRoute from "./UserAuth/Routes/PrivateRoute";
import LoggedInRoute from "./UserAuth/Routes/LoggedInRoute";

import Login from "./UserAuth/Login/Login";
import Signup from "./UserAuth/Signup/Signup";
import LandingPage from "./LandingPage";
import DashboardPage from "./Dashboard/Dashboard";
import ForgotPassword from "./UserAuth/ForgotPassword/ForgotPassword";

function App() {
	// const [data, setData] = React.useState();
	// React.useEffect(() => {
	// 	fetch("/api")
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data.message));
	// }, []);

	return (
		<Router>
			<Switch>
				<AuthProvider>
					<Route exact path="/" component={LandingPage} />
					<LoggedInRoute path="/Signup" component={Signup} />
					<LoggedInRoute path="/Login" component={Login} />
					<Route path="/ForgotPassword" component={ForgotPassword} />

					<PrivateRoute path="/Dashboard" component={DashboardPage} />
				</AuthProvider>
			</Switch>
		</Router>
	);
}

export default App;
