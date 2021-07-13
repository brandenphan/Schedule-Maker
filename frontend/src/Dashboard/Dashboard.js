import React from "react";
import { Grid, Fade, Grow } from "@material-ui/core";
import { useAuth } from "../UserAuth/context/AuthContext";
import styled from "styled-components";
import axios from "axios";

import SettingsMenu from "./SettingsMenu";
import ScheduleCards from "./ScheduleCards";

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
	const { currentUser } = useAuth();

	const resetCurrentSchedule = async () => {
		await axios.post("/resetCurrentSchedulePersistence", {
			currentUser: currentUser.email,
		});
	};

	React.useEffect(() => {
		resetCurrentSchedule();
	}, []);

	axios.get("/test/test").then((data) => console.log(data));

	return (
		<BackgroundContainer>
			<Grid container>
				<Grid item xs={12}>
					<Fade in={true} timeout={1000}>
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
					</Fade>
				</Grid>
				<Grid
					item
					xs={12}
					style={{ padding: "2%", height: "92%", marginTop: "-2%" }}
				>
					<Grow in={true} timeout={1000}>
						<Grid
							container
							justify="center"
							style={{
								backgroundColor: "#f7f9fd",
								borderRadius: "20px",
							}}
						>
							<ScheduleCards />
						</Grid>
					</Grow>
				</Grid>
			</Grid>
		</BackgroundContainer>
	);
};

export default Dashboard;
