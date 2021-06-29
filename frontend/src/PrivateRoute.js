import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./UserAuth/context/AuthContext";

// This component ensures that a user is signed in before taking them to the Welcome page, if no user is signed in, it redirects the user to the login page
const PrivateRoute = ({ component: Component, ...reset }) => {
	const { currentUser } = useAuth();

	// If the currentUser is set, returns all the JSX to the Welcome page, if a user is not set, redirects to the login page
	return (
		<Route
			{...reset}
			render={(props) => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to="/Login" />
				);
			}}
		/>
	);
};

export default PrivateRoute;
