import { Grid, Fade, Button } from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SettingsMenu from "../Dashboard/SettingsMenu";
import ScheduleTable from "./ScheduleTable";

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

const SchedulePage = () => {
	const history = useHistory();
	return (
		<BackgroundContainer>
			<Grid container>
				<Grid item xs={2}>
					<Fade in={true} timeout={1000}>
						<Grid container justify="center" style={{ marginTop: "9%" }}>
							<Button
								variant="outlined"
								style={{ borderColor: "#6a8fec", color: "#6a8fec" }}
								onClick={() => {
									history.push("/Dashboard");
								}}
							>
								Home
							</Button>
						</Grid>
					</Fade>
				</Grid>
				<Grid item xs={10}>
					<Fade in={true} timeout={1000}>
						<Grid
							container
							justify="flex-end"
							style={{
								marginTop: "1%",
								marginLeft: "-2%",
							}}
						>
							<Button style={{ color: "#6a8fec", marginTop: "0.5%" }}>
								Add Item
							</Button>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Button style={{ color: "#6a8fec", marginTop: "0.5%" }}>
								Schedule Settings
							</Button>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<SettingsMenu />
						</Grid>
					</Fade>
				</Grid>
				<Grid
					item
					xs={12}
					style={{ padding: "2%", height: "92%", marginTop: "-2%" }}
				>
					<ScheduleTable />
					&nbsp;
				</Grid>
			</Grid>
		</BackgroundContainer>
	);
};

export default SchedulePage;
