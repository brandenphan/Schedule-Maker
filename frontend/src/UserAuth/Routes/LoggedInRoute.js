import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoggedInRoute = ({ component: Component, ...reset }) => {
	const { currentUser } = useAuth();

	return (
		<Route
			{...reset}
			render={(props) => {
				return currentUser ? (
					<Redirect to="/Dashboard" />
				) : (
					<Component {...props} />
				);
			}}
		/>
	);
};

export default LoggedInRoute;
