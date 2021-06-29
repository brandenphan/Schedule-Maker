import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthProvider from "./UserAuth/context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Login from "./UserAuth/Login/Login";
import Signup from "./UserAuth/Signup/Signup";
import LandingPage from "./LandingPage";
import WelcomePage from "./WelcomePage";
import ForgotPassword from "./UserAuth/ForgotPassword/ForgotPassword";

export const BackgroundContainer = styled.div`
	// background: linear-gradient(to left, #e0e0eb, #99b3ff);
	background: linear-gradient(to left, #e0e0eb, #b3c6ff);
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	z-index: 1000;
	overflow-y: auto;
`;

export const FormContainer = styled.div`
	background: white;
	width: 20%;
	height: 40%;
	margin: auto;
	display: block;
	margin-top: 40px;
	border-radius: 10px;
	max-width: 400px;
	min-width: 400px;
`;

export const CenteredDiv = styled.div`
	display: flex;
	justify-content: center;
`;

function App() {
	const [data, setData] = React.useState();

	React.useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return (
		<Router>
			<Switch>
				<AuthProvider>
					<Route exact path="/" component={LandingPage} />
					<Route path="/Signup" component={Signup} />
					<Route path="/Login" component={Login} />
					<PrivateRoute path="/Welcome" component={WelcomePage} />
					<Route path="/ForgotPassword" component={ForgotPassword} />
				</AuthProvider>
			</Switch>
		</Router>
	);
}

export default App;
