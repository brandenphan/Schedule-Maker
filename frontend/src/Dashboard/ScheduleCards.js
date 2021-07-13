import React from "react";
import {
	Grid,
	Dialog,
	DialogActions,
	DialogContent,
	Zoom,
	Card,
	CardActionArea,
	CardContent,
	CardActions,
	Typography,
	IconButton,
	CircularProgress,
	Button,
	DialogTitle,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ErrorIcon from "@material-ui/icons/Error";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import AddCard from "./AddCard";
import { useAuth } from "../UserAuth/context/AuthContext";
import axios from "axios";

const userSchedulesReducer = (state, action) => {
	switch (action.type) {
		case "DATA_LOADING":
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		case "DATA_LOADING_SUCCESS":
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload,
			};
		case "DATA_LOADING_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		default:
			throw new Error();
	}
};

const ScheduleCards = () => {
	const history = useHistory();
	const { currentUser } = useAuth();

	const [userScheduleData, dispatchUserScheduleData] = React.useReducer(
		userSchedulesReducer,
		{ data: [], isLoading: true, isError: false }
	);

	const getUserSchedules = async () => {
		dispatchUserScheduleData({ type: "DATA_LOADING" });
		try {
			await axios
				.get("/getUserSchedules", {
					params: { currentUser: currentUser.email },
				})
				.then((data) => {
					dispatchUserScheduleData({
						type: "DATA_LOADING_SUCCESS",
						payload: data.data,
					});

					let numberSchedules = data.data.length + 1;
					let remainingGrids = numberSchedules % 4;
					if (remainingGrids === 1) {
						setPaddedGrids(3);
					} else if (remainingGrids === 2) {
						setPaddedGrids(2);
					} else if (remainingGrids === 3) {
						setPaddedGrids(1);
					}
				})
				.catch(() => {
					dispatchUserScheduleData({ type: "DATA_LOADING_FAILURE" });
				});
		} catch {
			dispatchUserScheduleData({ type: "DATA_LOADING_FAILURE" });
		}
	};

	React.useEffect(() => {
		// eslint-disable-next-line
		getUserSchedules();
	}, []);

	const handleScheduleClick = async (scheduleName) => {
		await axios
			.post("/setCurrentSchedulePersistence", {
				currentUser: currentUser.email,
				scheduleName: scheduleName,
			})
			.then(() => {
				history.push("/SchedulePage");
			});
	};

	const [paddedGrids, setPaddedGrids] = React.useState();
	let paddedGridsArray = [];
	for (let i = 0; i < paddedGrids; i++) {
		paddedGridsArray.push(<Grid item xs={3} />);
	}

	const [open, setOpen] = React.useState(false);
	const [scheduleToDelete, setScheduleToDelete] = React.useState();
	const [error, setError] = React.useState("");

	const handleScheduleDelete = async (scheduleName) => {
		setError("");
		await axios
			.delete("/deleteUserSchedule", {
				data: { currentUser: currentUser.email, scheduleName: scheduleName },
			})
			.then(() => {
				setOpen(false);
				getUserSchedules();
			})
			.catch((error) => {
				setError(error.response.statusText);
			});
	};

	return (
		<>
			{userScheduleData.isLoading ? (
				<Grid container>
					<Grid item xs={12}>
						<Grid container justify="center">
							<CircularProgress />
						</Grid>
					</Grid>
				</Grid>
			) : userScheduleData.isError ? (
				<Grid container>
					<Grid item xs={12}>
						<Grid container justify="center">
							<ErrorIcon
								style={{
									height: "4%",
									width: "4%",
									color: "red",
									marginTop: "1%",
								}}
							/>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container justify="center">
							<Typography
								variant="h4"
								style={{ marginTop: "1%", marginBottom: "1%", color: "red" }}
							>
								Error connecting to database, please try again later
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			) : (
				<>
					{userScheduleData.data.map((value) => (
						<Zoom in={true} timeout={800} key={value.scheduleName}>
							<Grid item xs={3} style={{ borderRadius: "20px" }}>
								<div
									style={{
										padding: "5%",
									}}
								>
									<Card>
										<CardActionArea
											onClick={() => {
												handleScheduleClick(value.scheduleName);
											}}
										>
											<CardContent>
												<Typography variant="h6">
													{value.scheduleName}
												</Typography>
												<Typography style={{ marginTop: "2%" }}>
													Date Modified: {value.currentDate}
												</Typography>
											</CardContent>
										</CardActionArea>
										<CardActions style={{ float: "right", marginTop: "-3%" }}>
											<IconButton
												onClick={() => {
													setOpen(true);
													setScheduleToDelete(value.scheduleName);
												}}
											>
												<DeleteIcon />
											</IconButton>
										</CardActions>
									</Card>
								</div>
							</Grid>
						</Zoom>
					))}
					<Zoom in={true} timeout={800}>
						<Grid
							item
							xs={3}
							style={{
								borderRadius: "20px",
							}}
						>
							<div
								style={{
									padding: "5%",
								}}
							>
								<Card
									style={{
										width: "100%",
										textAlign: "center",
										marginTop: "9%",
									}}
								>
									<AddCard />
								</Card>
							</div>
						</Grid>
					</Zoom>
					{paddedGridsArray.map((value) => value)}
				</>
			)}
			<Dialog
				open={open}
				onClose={() => {
					setOpen(false);
					setScheduleToDelete();
					setError("");
				}}
				PaperProps={{
					style: {
						borderRadius: 20,
						backgroundColor: "#ebf0fa",
					},
				}}
			>
				<DialogTitle>Confirmation</DialogTitle>
				<DialogContent
					dividers
					style={{ fontFamily: "Source Sans Pro", marginTop: "-2%" }}
				>
					{error && (
						<Alert severity="error">
							<AlertTitle>{error}</AlertTitle>
						</Alert>
					)}
					Are you sure you want to remove this schedule?
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setOpen(false);
							setScheduleToDelete();
							setError("");
						}}
						color="primary"
					>
						Cancel
					</Button>
					<Button
						onClick={() => {
							handleScheduleDelete(scheduleToDelete);
						}}
						color="primary"
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ScheduleCards;
