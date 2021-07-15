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
	TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ErrorIcon from "@material-ui/icons/Error";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import AddCard from "./AddCard";
import { useAuth } from "../UserAuth/context/AuthContext";
import axios from "axios";
import moment from "moment";

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
	const currentDate = moment().format("LLLL");

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
		getUserSchedules();
		// eslint-disable-next-line
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
		paddedGridsArray.push(<Grid item xs={3} key={i} />);
	}

	const [openDelete, setOpenDelete] = React.useState(false);
	const [scheduleToDelete, setScheduleToDelete] = React.useState();
	const [errorDelete, setErrorDelete] = React.useState("");

	const handleScheduleDelete = async (scheduleName) => {
		setErrorDelete("");
		await axios
			.delete("/deleteUserSchedule", {
				data: { currentUser: currentUser.email, scheduleName: scheduleName },
			})
			.then(() => {
				setOpenDelete(false);
				getUserSchedules();
			})
			.catch((error) => {
				setErrorDelete(error.response.statusText);
			});
	};

	const [openRename, setOpenRename] = React.useState(false);
	const [scheduleToRename, setScheduleToRename] = React.useState();
	const renameValue = React.useRef();
	const [errorRename, setErrorRename] = React.useState("");

	const handleScheduleToRename = async (scheduleName) => {
		setErrorRename("");
		await axios
			.post("/renameUserSchedule", {
				currentUser: currentUser.email,
				scheduleName: scheduleName,
				newScheduleName: renameValue.current.value,
				currentDate: currentDate,
			})
			.then(() => {
				setOpenRename(false);
				getUserSchedules();
			})
			.catch((error) => {
				setErrorRename(error.response.statusText);
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
							<Grid
								item
								xs={3}
								style={{ borderRadius: "20px" }}
								key={value.scheduleName}
							>
								<div
									style={{
										padding: "5%",
									}}
									key={value.scheduleName}
								>
									<Card key={value.scheduleName}>
										<CardActionArea
											key={value.scheduleName}
											onClick={() => {
												handleScheduleClick(value.scheduleName);
											}}
										>
											<CardContent key={value.scheduleName}>
												<Typography variant="h6" key={value.scheduleName}>
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
													setOpenRename(true);
													setScheduleToRename(value.scheduleName);
												}}
											>
												<EditIcon />
											</IconButton>
											<IconButton
												onClick={() => {
													setOpenDelete(true);
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
										height: "100%",
										textAlign: "center",
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
				open={openDelete}
				onClose={() => {
					setOpenDelete(false);
					setScheduleToDelete();
					setErrorDelete("");
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
					{errorDelete && (
						<Alert severity="error">
							<AlertTitle>{errorDelete}</AlertTitle>
						</Alert>
					)}
					Are you sure you want to remove this schedule?
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setOpenDelete(false);
							setScheduleToDelete();
							setErrorDelete("");
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

			<Dialog
				open={openRename}
				onClose={() => {
					setOpenRename(false);
					setScheduleToRename();
					setErrorRename("");
				}}
				PaperProps={{
					style: {
						borderRadius: 20,
						backgroundColor: "#ebf0fa",
					},
				}}
			>
				<DialogTitle style={{ width: "400px" }}>Rename</DialogTitle>
				<DialogContent
					dividers
					style={{ fontFamily: "Source Sans Pro", marginTop: "-2%" }}
				>
					{errorRename && (
						<Alert severity="error" style={{ marginBottom: "5%" }}>
							<AlertTitle>{errorRename}</AlertTitle>
						</Alert>
					)}
					<Grid container>
						<Grid item xs={12}>
							<Grid container>
								<TextField
									variant="outlined"
									label={scheduleToRename}
									fullWidth
									inputRef={renameValue}
								/>
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setOpenRename(false);
							setScheduleToRename();
							setErrorRename("");
						}}
						color="primary"
					>
						Cancel
					</Button>
					<Button
						onClick={() => {
							handleScheduleToRename(scheduleToRename);
						}}
						color="primary"
					>
						Rename
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ScheduleCards;
