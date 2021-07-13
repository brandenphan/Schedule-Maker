import React from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { useHistory } from "react-router-dom";
import { useAuth } from "../UserAuth/context/AuthContext";

const SettingsMenu = () => {
	const { currentUser, logout } = useAuth();
	const [anchorEl, setAnchorEl] = React.useState(null);

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
						console.log("settings");
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
		</>
	);
};

export default SettingsMenu;
