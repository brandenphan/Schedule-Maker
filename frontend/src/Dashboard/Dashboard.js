import React from "react";
import { Grid } from "@material-ui/core";
// import { useAuth } from "../UserAuth/context/AuthContext";
import styled from "styled-components";

import SettingsMenu from "./SettingsMenu";

const BackgroundContainer = styled.div`
	background: linear-gradient(to left, #e6e6f0, #e9edf7);
	position: fixed;
	display: flex;
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	z-index: 1000;
	overflow-y: auto;
`;

const Dashboard = () => {
	// const { currentUser } = useAuth();

	return (
		<BackgroundContainer>
			<Grid container>
				<Grid item xs={12}>
					<Grid
						container
						justify="flex-end"
						style={{
							marginTop: "1%",
							marginLeft: "-2%",
						}}
					>
						<SettingsMenu />
					</Grid>
				</Grid>
				<Grid
					item
					xs={12}
					style={{ padding: "2%", height: "92%", marginTop: "-2%" }}
				>
					<Grid
						container
						justify="center"
						style={{
							backgroundColor: "#f7f9fd",
							borderRadius: "20px",
							height: "100%",
						}}
					>
						<p>HEY</p>
						{/* <Grid item xs={3} style={{ backgroundColor: "black" }}></Grid>
						<Grid item xs={3} style={{ backgroundColor: "blue" }}></Grid>
						<Grid item xs={3} style={{ backgroundColor: "yellow" }}></Grid>
						<Grid item xs={3} style={{ backgroundColor: "orange" }}></Grid> */}
					</Grid>
				</Grid>
			</Grid>
		</BackgroundContainer>
	);
};

export default Dashboard;
