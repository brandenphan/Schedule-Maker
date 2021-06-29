import React from "react";
import { Typography, Grid, Avatar } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { Alert, AlertTitle } from "@material-ui/lab";

import { useAuth } from "../context/AuthContext";
import {
	BackgroundContainer,
	FormContainer,
	CenteredDiv,
} from "../StyledComponents";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPassword = () => {
	const [error, setError] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(false);

	const emailRef = React.useRef();
	const { resetPassword } = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setSuccess(false);
			setError("");
			await resetPassword(emailRef.current.value);
			setLoading(true);
			setSuccess(true);
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
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
										<LockIcon htmlColor="#8a7aff" />
									</Avatar>
								</CenteredDiv>

								<br />
								<Typography
									align="center"
									variant="h4"
									style={{ fontFamily: "Source Sans Pro" }}
								>
									<b>Password Reset</b>
								</Typography>

								{error ? (
									<>
										<br />
										<Alert severity="error">
											<AlertTitle>Error</AlertTitle>
											{error}
										</Alert>
									</>
								) : (
									success && (
										<>
											<br />
											<Alert severity="success">
												Check your inbox for further instructions on resetting
												your password
											</Alert>
										</>
									)
								)}

								<ForgotPasswordForm
									loading={loading}
									emailRef={emailRef}
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

export default ForgotPassword;
