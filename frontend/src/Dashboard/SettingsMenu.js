import React from "react";
import {
	Grid,
	Menu,
	MenuItem,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	Button,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import { useAuth } from "../UserAuth/context/AuthContext";

const SettingsMenu = () => {
	const { currentUser, logout } = useAuth();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);

	const history = useHistory();
	const handleLogout = async () => {
		try {
			await logout();
			history.push("/Login");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<IconButton
				aria-controls="settings"
				aria-haspopup="true"
				style={{
					textTransform: "none",
					fontFamily: "Source Sans Pro",
					fontSize: "17px",
				}}
				onClick={(event) => {
					setAnchorEl(event.currentTarget);
				}}
			>
				<SettingsIcon fontSize="large" />
			</IconButton>
			<Menu
				id="settings"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={() => {
					setAnchorEl(null);
				}}
				transformOrigin={{ vertical: "top", horizontal: "center" }}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				elevation={10}
				getContentAnchorEl={null}
			>
				<p
					style={{
						marginLeft: "7%",
						marginTop: "3%",
						fontFamily: "Source Sans Pro",
					}}
				>
					Logged in as {currentUser.email}
				</p>
				<MenuItem
					onClick={() => {
						setOpen(true);
					}}
				>
					Settings
				</MenuItem>
				<MenuItem
					onClick={handleLogout}
					style={{ fontFamily: "Source Sans Pro", fontSize: "18px" }}
				>
					Logout
				</MenuItem>
			</Menu>

			<Dialog
				onClose={() => {
					setOpen(false);
				}}
				open={open}
				PaperProps={{
					style: { borderRadius: 20, backgroundColor: "#ebf0fa" },
				}}
			>
				<DialogTitle>
					<Grid container>
						<Grid item xs={6} style={{ marginTop: "3%", width: "400px" }}>
							Settings
						</Grid>
						<Grid item xs={6}>
							<Grid container justify="flex-end">
								<IconButton
									onClick={() => {
										setOpen(false);
									}}
								>
									<CloseIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</DialogTitle>
				<DialogContent dividers style={{ marginTop: "-1%" }}>
					<Grid container>
						<Grid
							item
							xs={12}
							style={{ fontFamily: "Source Sans Pro", fontSize: "20px" }}
						>
							Account Settings
						</Grid>
						<Grid item xs={12}>
							<Grid container style={{ marginTop: "6%" }}>
								<Grid
									item
									xs={6}
									style={{
										fontFamily: "Source Sans Pro",
										fontSize: "17px",
										marginTop: "1.5%",
									}}
								>
									Change Password
								</Grid>
								<Grid item xs={6}>
									<Grid container justify="flex-end">
										<Button
											onClick={() => {
												history.push("/ChangePassword");
											}}
											// fullWidth
											variant="contained"
											style={{
												backgroundColor: "#6a8fec",
												color: "white",
												borderRadius: "10px",
												padding: "2%",
												width: "80%",
											}}
										>
											Change
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default SettingsMenu;
