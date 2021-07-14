import React from "react";
import {
	Grid,
	Fade,
	Button,
	Typography,
	CircularProgress,
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	withStyles,
	Switch,
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SettingsMenu from "../Dashboard/SettingsMenu";
import ScheduleTable from "./ScheduleTable";
import AddItem from "./AddItem";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../UserAuth/context/AuthContext";

const StyledSwitch = withStyles({
	switchBase: {
		color: "#dfe7fb",
		"&$checked": {
			color: "#6a8fec",
		},
		"&$checked + $track": {
			backgroundColor: "#6a8fec",
		},
	},
	checked: {},
	track: {},
})(Switch);

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

const getPersistenceReducer = (state, action) => {
	switch (action.type) {
		case "DATA_P_LOADING":
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		case "DATA_P_LOADING_SUCCESS":
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload,
			};
		case "DATA_P_LOADING_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		default:
			throw new Error();
	}
};

const getAppointmentsReducer = (state, action) => {
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

const SchedulePage = () => {
	const [open, setOpen] = React.useState(false);
	const history = useHistory();
	const { currentUser } = useAuth();
	const [currentSchedule, dispatchCurrentSchedule] = React.useReducer(
		getPersistenceReducer,
		{ data: [], isLoading: true, isError: false }
	);

	const getPersistence = async () => {
		dispatchCurrentSchedule({ type: "DATA_P_LOADING" });

		try {
			await axios
				.get("/getUserPersistence", {
					params: { currentUser: currentUser.email },
				})
				.then((data) => {
					dispatchCurrentSchedule({
						type: "DATA_P_LOADING_SUCCESS",
						payload: data.data,
					});
				});
		} catch {
			dispatchCurrentSchedule({ type: "DATA_P_LOADING_FAILURE" });
		}
	};

	React.useEffect(() => {
		getPersistence();
		// eslint-disable-next-line
	}, []);

	const dateObject = new Date(2021, 2, 1, 1);
	const beginningDate = moment(dateObject);
	let date = beginningDate.date;
	const [hoursShown, setHoursShown] = React.useState(false);

	const makeTodayAppointment = (startDate, endDate) => {
		const days = moment(startDate).diff(endDate, "days");
		const nextStartDate = moment(startDate)
			.year(beginningDate.year())
			.month(beginningDate.month())
			.date(date);
		const nextEndDate = moment(endDate)
			.year(beginningDate.year())
			.month(beginningDate.month())
			.date(date + days);

		return {
			startDate: nextStartDate.toDate(),
			endDate: nextEndDate.toDate(),
		};
	};

	const [appointments, dispatchAppointments] = React.useReducer(
		getAppointmentsReducer,
		{ data: [], isLoading: true, isError: false }
	);

	const getScheduleData = async () => {
		dispatchAppointments({ type: "DATA_LOADING" });
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
				.get("/getScheduleInformation", {
					params: {
						currentUser: currentUser.email,
						currentSchedule: currentScheduleForData,
					},
				})
				.then((data) => {
					const appointmentsData = data.data.scheduleInformation.map(
						({ startDate, endDate, ...restArgs }) => {
							const result = {
								...makeTodayAppointment(startDate, endDate),
								...restArgs,
							};
							date += 1;
							if (date > 31) date = 1;
							return result;
						}
					);

					setHoursShown(data.data.showAllHours);

					dispatchAppointments({
						type: "DATA_LOADING_SUCCESS",
						payload: appointmentsData,
					});
				});
		} catch {
			dispatchAppointments({ type: "DATA_LOADING_FAILURE" });
		}
	};

	const changeScheduleSettings = async () => {
		let currentScheduleForData;

		await axios
			.get("/getUserPersistence", {
				params: { currentUser: currentUser.email },
			})
			.then((data) => {
				currentScheduleForData = data.data;
			});

		await axios.post("/changeScheduleSettings", {
			currentUser: currentUser.email,
			currentSchedule: currentScheduleForData,
			showAllHours: hoursShown,
		});
	};

	React.useEffect(() => {
		getScheduleData();
		// eslint-disable-next-line
	}, []);

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
							<AddItem
								currentSchedule={currentSchedule.data}
								getScheduleData={getScheduleData}
							/>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Button
								onClick={() => {
									setOpen(true);
								}}
								style={{ color: "#6a8fec", marginTop: "0.5%" }}
							>
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
					style={{
						padding: "2%",
						height: "92%",
						marginTop: "-2%",
					}}
				>
					{currentSchedule.isLoading ? (
						<Grid container justify="center">
							<CircularProgress />
						</Grid>
					) : currentSchedule.isError ? (
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
						<ScheduleTable
							appointments={appointments}
							showAllHours={hoursShown}
						/>
					)}
					&nbsp;
				</Grid>
			</Grid>

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
						<Grid item xs={6} style={{ marginTop: "2%", width: "300px" }}>
							Schedule Settings
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
					<Grid container>
						<Grid item xs={6}>
							<Grid container justify="flex-start">
								<Typography>Show All Hours</Typography>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<Grid container justify="flex-end">
								<StyledSwitch
									checked={hoursShown}
									onChange={(event) => {
										setHoursShown(event.target.checked);
										changeScheduleSettings();
									}}
								/>
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</BackgroundContainer>
	);
};

export default SchedulePage;
