import React from "react";
import { Typography, Grid, Avatar } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import "@fontsource/source-sans-pro";

import { useAuth } from "../context/AuthContext";
import {
	BackgroundContainer,
	FormContainer,
	CenteredDiv,
} from "../StyledComponents";
import SignupForm from "./SignupForm";

const Signup = () => {
	const emailRef = React.useRef();
	const passwordRef = React.useRef();

	const [error, setError] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	const { signup } = useAuth();
	const history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setError("");
			await signup(emailRef.current.value, passwordRef.current.value);
			setLoading(true);
			history.push("/Welcome");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<>
			<BackgroundContainer>
				<Grid container>
					<Grid item xs={12}>
						<Grid container justify="center">
							<FormContainer>
								<br />
								<br />
								<CenteredDiv>
									<Avatar>
										<AccountCircleIcon fontSize="large" htmlColor="#8a7aff" />
									</Avatar>
								</CenteredDiv>

								<br />
								<Typography
									align="center"
									variant="h4"
									style={{ fontFamily: "Source Sans Pro" }}
								>
									<b>Sign Up</b>
								</Typography>

								{error && (
									<>
										<br />
										<br />
										<Alert severity="error">
											<AlertTitle>Error</AlertTitle>
											{error}
										</Alert>
									</>
								)}

								<SignupForm
									loading={loading}
									emailRef={emailRef}
									passwordRef={passwordRef}
									handleSubmit={handleSubmit}
								/>
							</FormContainer>
						</Grid>
					</Grid>
				</Grid>
			</BackgroundContainer>
		</>
	);
};

export default Signup;
