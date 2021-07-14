import React from "react";
import {
	Grid,
	Avatar,
	Typography,
	Grow,
	Dialog,
	DialogTitle,
	DialogContent,
	Link,
	IconButton,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import CloseIcon from "@material-ui/icons/Close";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
	BackgroundContainer,
	FormContainer,
	CenteredDiv,
} from "../StyledComponents";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePassword = () => {
	const [open, setOpen] = React.useState(false);
	const passwordRef = React.useRef();
	const passwordConfirmRef = React.useRef();

	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");

	const { updatePassword } = useAuth();
	const history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			setError("Password and password confirmation do not match");
		} else {
			try {
				setError("");
				await updatePassword(passwordRef.current.value);
				setLoading(true);
				setOpen(true);
			} catch (error) {
				setError(error.message);
			}
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
										Change Password
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

									<ChangePasswordForm
										loading={loading}
										passwordRef={passwordRef}
										passwordConfirmRef={passwordConfirmRef}
										handleSubmit={handleSubmit}
									/>
								</FormContainer>
							</Grid>
						</Grid>
					</Grid>
				</Grow>
			</BackgroundContainer>
			<Dialog
				open={open}
				onClose={() => {
					setOpen(false);
					history.push("/Dashboard");
				}}
			>
				<DialogTitle>
					<Grid container>
						<Grid item xs={6} style={{ marginTop: "2%" }}>
							Success
						</Grid>
						<Grid item xs={6}>
							<Grid container justify="flex-end">
								<IconButton
									onClick={() => {
										setOpen(false);
										history.push("/Dashboard");
									}}
								>
									<CloseIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</DialogTitle>
				<DialogContent dividers>
					<Link href="/Dashboard">
						<p style={{ fontFamily: "Source Sans Pro" }}>
							Password successfully changed, click this message to return to the
							dashboard
						</p>
					</Link>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ChangePassword;
