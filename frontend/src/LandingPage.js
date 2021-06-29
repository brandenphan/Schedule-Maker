import { useHistory } from "react-router-dom";

const LandingPage = () => {
	const history = useHistory();

	return (
		<>
			<button
				onClick={() => {
					history.push("/Login");
				}}
			>
				Login
			</button>
			<button
				onClick={() => {
					history.push("/Signup");
				}}
			>
				Signup
			</button>
		</>
	);
};

export default LandingPage;
