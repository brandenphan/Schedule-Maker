import React from "react";
import { Grid, Avatar, Typography, Grow } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "@fontsource/source-sans-pro";
import axios from "axios";

import { useAuth } from "../context/AuthContext";
import {
	BackgroundContainer,
	FormContainer,
	CenteredDiv,
} from "../StyledComponents";
import LoginForm from "./LoginForm";

const Login = () => {
	const emailRef = React.useRef();
	const passwordRef = React.useRef();

	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");
	const [check, setCheck] = React.useState(false);

	const { login } = useAuth();
	const history = useHistory();

	const handleCheckboxChange = (event) => {
		setCheck(event.target.checked);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (check === false) {
			firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
		}

		try {
			// let emailValue = emailRef.current.value;
			setError("");
			await login(emailRef.current.value, passwordRef.current.value);
			setLoading(true);

			// await axios.post("/setUserSettings", {})

			history.push("/Dashboard");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<>
			<BackgroundContainer>
				<Grow in={true} timeout={800}>
					<Grid container>
						<Grid item xs={12}>
							<Grid container justify="center">
								<FormContainer>
									<br />
									<br />
									<CenteredDiv>
										<Avatar>
											<LockIcon htmlColor="#8a7aff" />
										</Avatar>
									</CenteredDiv>

									<br />
									<Typography
										align="center"
										variant="h4"
										style={{ fontFamily: "Source Sans Pro" }}
									>
										<b>Login</b>
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

									<LoginForm
										loading={loading}
										emailRef={emailRef}
										passwordRef={passwordRef}
										check={check}
										handleCheckboxChange={handleCheckboxChange}
										handleSubmit={handleSubmit}
									/>
								</FormContainer>
							</Grid>
						</Grid>
					</Grid>
				</Grow>
			</BackgroundContainer>
		</>
	);
};

export default Login;
