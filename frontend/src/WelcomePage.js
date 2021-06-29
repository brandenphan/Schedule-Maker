import React from "react";
import { useAuth } from "./UserAuth/context/AuthContext";
import { useHistory } from "react-router-dom";

const WelcomePage = () => {
	const { currentUser, logout } = useAuth();
	const [error, setError] = React.useState("");

	const history = useHistory();

	const handleLogout = async () => {
		setError("");

		try {
			await logout();
			history.push("/Login");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<>
			<p>Welcome Page:</p>
			<p>Logged in as: {currentUser.email}</p>

			{error && <p>ERROR</p>}

			<button onClick={handleLogout}>Logout</button>
		</>
	);
};

export default WelcomePage;
