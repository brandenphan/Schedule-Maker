import React from "react";
import {
	Grid,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	Typography,
	Card,
	CardContent,
	CardActions,
	CircularProgress,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../UserAuth/context/AuthContext";
import DeleteIcon from "@material-ui/icons/Delete";

const scheduleEventsReducer = (state, action) => {
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

const EditItem = ({ updateEditItems, getScheduleData }) => {
	const { currentUser } = useAuth();
	const [scheduleEvents, dispatchScheduleEvents] = React.useReducer(
		scheduleEventsReducer,
		{ data: [], isLoading: true, isError: false }
	);
	const currentDate = moment().format("LLLL");
	const [open, setOpen] = React.useState(false);
	const [eventToDelete, setEventToDelete] = React.useState();
	const [openDelete, setOpenDelete] = React.useState(false);
	const [deleteError, setDeleteError] = React.useState("");

	const getScheduleEvents = async () => {
		dispatchScheduleEvents({ type: "DATA_LOADING" });
		try {
			let currentScheduleForData;

			await axios
				.get("/getUserPersistence", {
					params: { currentUser: currentUser.email },
				})
				.then((data) => {
					currentScheduleForData = data.data;
				});

			await axios
				.get("/getEachScheduleEvent", {
					params: {
						currentUser: currentUser.email,
						currentSchedule: currentScheduleForData,
					},
				})
				.then((data) => {
					dispatchScheduleEvents({
						type: "DATA_LOADING_SUCCESS",
						payload: data.data,
					});
				});
		} catch (error) {
			dispatchScheduleEvents({ type: "DATA_LOADING_FAILURE" });
		}
	};

	React.useEffect(() => {
		getScheduleEvents();
		// eslint-disable-next-line
	}, [updateEditItems]);

	const handleEventDelete = async (eventName) => {
		let currentScheduleForData;

		await axios
			.get("/getUserPersistence", {
				params: { currentUser: currentUser.email },
			})
			.then((data) => {
				currentScheduleForData = data.data;
			});

		await axios
			.post("/deleteScheduleEvent", {
				currentUser: currentUser.email,
				currentSchedule: currentScheduleForData,
				currentDate: currentDate,
				eventName: eventName,
			})
			.then((data) => {
				getScheduleEvents();
				getScheduleData();
				setOpenDelete(false);
				setOpen(false);
				setDeleteError("");
			})
			.catch((error) => {
				setDeleteError(error.response.statusText);
			});
	};

	return (
		<>
			<Button
				onClick={() => {
					setOpen(true);
				}}
				style={{ color: "#6a8fec", marginTop: "0.5%" }}
			>
				Delete Item
			</Button>

			<Dialog
				onClose={() => {
					setOpen(false);
				}}
				open={open}
				PaperProps={{ style: { borderRadius: 20, backgroundColor: "#ebf0fa" } }}
			>
				<DialogTitle style={{ width: "500px" }}>
					<Grid container>
						<Grid item xs={6} style={{ marginTop: "2%" }}>
							Delete Item
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
				<DialogContent dividers>
					{scheduleEvents.isLoading ? (
						<Grid container>
							<Grid item xs={12}>
								<Grid container justify="center">
									<CircularProgress />
								</Grid>
							</Grid>
						</Grid>
					) : scheduleEvents.isError ? (
						<Grid container>
							<Grid item xs={12}>
								<Grid container justify="center">
									<ErrorIcon
										style={{
											height: "4%",
											width: "4%",
											color: "red",
											marginTop: "2%",
										}}
									/>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justify="center">
									<Typography
										variant="h4"
										style={{
											marginTop: "1%",
											marginBottom: "1%",
											color: "red",
										}}
									>
										Error connecting to database, please try again later
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					) : (
						<>
							<Grid
								container
								style={{
									backgroundColor: "#f7f9fd",
									borderRadius: "20px",
									padding: "1%",
								}}
							>
								{scheduleEvents.data.map((value) => (
									<Grid item xs={4} key={value.title}>
										<div style={{ padding: "5%" }}>
											<Card style={{ borderRadius: "20px" }}>
												<CardContent>
													<Typography variant="h6">{value.title}</Typography>
													<Typography>{`${value.startTimeHour}:${value.startTimeMinute} - ${value.endTimeHour}:${value.endTimeMinute}`}</Typography>
													<Grid container>
														<Grid item xs={12} style={{ height: "120px" }}>
															{value.days.map((dayValue) => (
																<div key={dayValue}>
																	{dayValue === 1 && (
																		<Typography>Monday</Typography>
																	)}
																	{dayValue === 2 && (
																		<Typography>Tuesday</Typography>
																	)}
																	{dayValue === 3 && (
																		<Typography>Wednesday</Typography>
																	)}
																	{dayValue === 4 && (
																		<Typography>Thursday</Typography>
																	)}
																	{dayValue === 5 && (
																		<Typography>Friday</Typography>
																	)}
																</div>
															))}
														</Grid>
													</Grid>
												</CardContent>
												<CardActions
													style={{ float: "right", marginTop: "-3%" }}
												>
													<IconButton
														onClick={() => {
															setEventToDelete(value.title);
															setOpenDelete(true);
															setDeleteError("");
														}}
													>
														<DeleteIcon />
													</IconButton>
												</CardActions>
											</Card>
										</div>
									</Grid>
								))}
							</Grid>
						</>
					)}
				</DialogContent>
			</Dialog>

			<Dialog
				open={openDelete}
				onClose={() => {
					setOpenDelete(false);
				}}
				PaperProps={{ style: { borderRadius: 20, backgroundColor: "#ebf0fa" } }}
			>
				<DialogTitle style={{ width: "400px" }}>
					<Grid container>
						<Grid item xs={6} style={{ marginTop: "2%" }}>
							Delete Item
						</Grid>
						<Grid item xs={6}>
							<Grid container justify="flex-end">
								<IconButton
									onClick={() => {
										setOpenDelete(false);
										setDeleteError("");
									}}
								>
									<CloseIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</DialogTitle>
				<DialogContent
					dividers
					style={{ fontFamily: "Source Sans Pro", marginTop: "-2%" }}
				>
					{deleteError && (
						<Alert severity="error" style={{ marginBottom: "2%" }}>
							<AlertTitle>{deleteError}</AlertTitle>
						</Alert>
					)}
					Are you sure you want to remove this item?
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setOpenDelete(false);
							setEventToDelete();
							setDeleteError("");
						}}
						color="primary"
					>
						Cancel
					</Button>
					<Button
						onClick={() => {
							handleEventDelete(eventToDelete);
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

export default EditItem;
