import {
	Grid,
	Fade,
	Grow,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
} from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SettingsMenu from "../Dashboard/SettingsMenu";

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
					<Grow in={true} timeout={1000}>
						<Grid
							container
							justify="center"
							style={{
								backgroundColor: "#f7f9fd",
								borderRadius: "20px",
							}}
						>
							<TableContainer>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell
												style={{ textAlign: "center", width: "3%" }}
											></TableCell>
											<TableCell style={{ textAlign: "center", width: "5%" }}>
												Sunday
											</TableCell>
											<TableCell style={{ textAlign: "center", width: "5%" }}>
												Monday
											</TableCell>
											<TableCell style={{ textAlign: "center", width: "5%" }}>
												Tuesday
											</TableCell>
											<TableCell style={{ textAlign: "center", width: "5%" }}>
												Wednesday
											</TableCell>
											<TableCell style={{ textAlign: "center", width: "5%" }}>
												Thursday
											</TableCell>
											<TableCell style={{ textAlign: "center", width: "5%" }}>
												Friday
											</TableCell>
											<TableCell style={{ textAlign: "center", width: "5%" }}>
												Saturday
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
											<TableCell>8:00 AM</TableCell>
											{/* <TableCell
											style={{ backgroundColor: "black" }}
											></TableCell> */}
										</TableRow>
										<TableRow>
											<TableCell>8:30 AM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>9:00 AM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>9:30 AM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>10:00 AM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>10:30 AM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>11:00 AM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>11:30 AM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>12:00 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>12:30 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>1:00 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>1:30 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>2:00 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>2:30 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>3:00 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>3:30 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>4:00 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>4:30 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>5:00 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>5:30 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>6:00 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>6:30 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>7:00 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>7:30 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>8:00 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>8:30 PM</TableCell>
										</TableRow>
										<TableRow>
											<TableCell style={{ borderBottom: "white" }}>
												9:00 PM
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					</Grow>
					&nbsp;
				</Grid>
			</Grid>
		</BackgroundContainer>
	);
};

export default SchedulePage;
