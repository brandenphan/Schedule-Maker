import React from "react";
import {
	Grid,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	TextField,
	Switch,
	FormControlLabel,
	withStyles,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import axios from "axios";
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

const AddItem = ({ currentSchedule, getScheduleData }) => {
	const { currentUser } = useAuth();
	const itemNameRef = React.useRef();
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState("");
	const currentDate = moment().format("LLLL");

	const [startTime, setStartTime] = React.useState("09:30");
	const [endTime, setEndTime] = React.useState("10:30");

	const [monday, setMonday] = React.useState(false);
	const [tuesday, setTuesday] = React.useState(false);
	const [wednesday, setWednesday] = React.useState(false);
	const [thursday, setThursday] = React.useState(false);
	const [friday, setFriday] = React.useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		let startTimeValue = parseInt(startTime.replace(":", ""));
		let endTimeValue = parseInt(endTime.replace(":", ""));

		if (
			monday === false &&
			tuesday === false &&
			wednesday === false &&
			thursday === false &&
			friday === false
		) {
			setError("Please select at least one day for the item");
		} else if (startTimeValue >= endTimeValue) {
			setError("End time must be later than start time");
		} else {
			let ScheduleItemsArray = [];

			let startTimeString = startTime.replace(":", "");
			let startTimeHour = parseInt(startTimeString.substring(0, 2));
			let startTimeMinute = parseInt(startTimeString.substring(2, 4));
			let endTimeString = endTime.replace(":", "");
			let endTimeHour = parseInt(endTimeString.substring(0, 2));
			let endTimeMinute = parseInt(endTimeString.substring(2, 4));

			if (monday === true) {
				let mondayItem = {
					title: itemNameRef.current.value,
					startDate: {
						year: 2021,
						month: 7,
						day: 1,
						startTimeHourKey: startTimeHour,
						startTimeMinuteKey: startTimeMinute,
					},
					endDate: {
						year: 2021,
						month: 7,
						day: 1,
						endTimeHourKey: endTimeHour,
						endTimeMinuteKey: endTimeMinute,
					},
					rRule: "FREQ=WEEKLY;COUNT=1000",
				};
				ScheduleItemsArray.push(mondayItem);
			}
			if (tuesday === true) {
				let tuesdayItem = {
					title: itemNameRef.current.value,
					startDate: {
						year: 2021,
						month: 7,
						day: 2,
						startTimeHourKey: startTimeHour,
						startTimeMinuteKey: startTimeMinute,
					},
					endDate: {
						year: 2021,
						month: 7,
						day: 2,
						endTimeHourKey: endTimeHour,
						endTimeMinuteKey: endTimeMinute,
					},
					rRule: "FREQ=WEEKLY;COUNT=1000",
				};
				ScheduleItemsArray.push(tuesdayItem);
			}
			if (wednesday === true) {
				let wednesdayItem = {
					title: itemNameRef.current.value,
					startDate: {
						year: 2021,
						month: 7,
						day: 3,
						startTimeHourKey: startTimeHour,
						startTimeMinuteKey: startTimeMinute,
					},
					endDate: {
						year: 2021,
						month: 7,
						day: 3,
						endTimeHourKey: endTimeHour,
						endTimeMinuteKey: endTimeMinute,
					},
					rRule: "FREQ=WEEKLY;COUNT=1000",
				};
				ScheduleItemsArray.push(wednesdayItem);
			}
			if (thursday === true) {
				let thursdayItem = {
					title: itemNameRef.current.value,
					startDate: {
						year: 2021,
						month: 7,
						day: 4,
						startTimeHourKey: startTimeHour,
						startTimeMinuteKey: startTimeMinute,
					},
					endDate: {
						year: 2021,
						month: 7,
						day: 4,
						endTimeHourKey: endTimeHour,
						endTimeMinuteKey: endTimeMinute,
					},
					rRule: "FREQ=WEEKLY;COUNT=1000",
				};
				ScheduleItemsArray.push(thursdayItem);
			}
			if (friday === true) {
				let fridayItem = {
					title: itemNameRef.current.value,
					startDate: {
						year: 2021,
						month: 7,
						day: 5,
						startTimeHourKey: startTimeHour,
						startTimeMinuteKey: startTimeMinute,
					},
					endDate: {
						year: 2021,
						month: 7,
						day: 5,
						endTimeHourKey: endTimeHour,
						endTimeMinuteKey: endTimeMinute,
					},
					rRule: "FREQ=WEEKLY;COUNT=1000",
				};
				ScheduleItemsArray.push(fridayItem);
			}
			axios
				.post("/addScheduleEvent", {
					scheduleName: currentSchedule,
					itemName: itemNameRef.current.value,
					information: ScheduleItemsArray,
					currentUser: currentUser.email,
					currentDate: currentDate,
				})
				.then(() => {
					setOpen(false);
					getScheduleData();
				})
				.catch((error) => {
					setError(error.response.statusText);
				});
		}
	};

	return (
		<>
			<Button
				onClick={() => {
					setOpen(true);
					setMonday(false);
					setTuesday(false);
					setWednesday(false);
					setThursday(false);
					setFriday(false);
					setError("");
					setStartTime("09:30");
					setEndTime("10:30");
				}}
				style={{ color: "#6a8fec", marginTop: "0.5%" }}
			>
				Add Item
			</Button>
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
						<Grid item xs={6} style={{ marginTop: "2%" }}>
							Add Item
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
					{error && (
						<Grid container>
							<Grid item xs={12}>
								<Grid container justify="center">
									<Alert
										severity="error"
										style={{ width: "100%", marginBottom: "3%" }}
									>
										<AlertTitle>{error}</AlertTitle>
									</Alert>
								</Grid>
							</Grid>
						</Grid>
					)}
					<form onSubmit={handleSubmit}>
						<Grid container>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									name="ItemName"
									label="Item Name"
									inputRef={itemNameRef}
									style={{ marginTop: "1%" }}
								/>
							</Grid>
							<Grid item xs={6}>
								<Grid container justify="center">
									<TextField
										id="time"
										label="Start Time"
										type="time"
										defaultValue="09:30"
										InputLabelProps={{
											shrink: true,
										}}
										onChange={(event) => {
											setStartTime(event.target.value);
										}}
										style={{ marginTop: "4%" }}
									/>
								</Grid>
							</Grid>
							<Grid item xs={6}>
								<Grid container justify="center">
									<TextField
										id="time"
										label="End Time"
										type="time"
										defaultValue="10:30"
										InputLabelProps={{
											shrink: true,
										}}
										onChange={(event) => {
											setEndTime(event.target.value);
										}}
										style={{ marginTop: "4%" }}
									/>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justify="center" style={{ marginTop: "6%" }}>
									<FormControlLabel
										labelPlacement="top"
										label="Monday"
										control={
											<StyledSwitch
												checked={monday}
												onChange={(event) => {
													setMonday(event.target.checked);
												}}
												color="primary"
											/>
										}
									/>
									<FormControlLabel
										labelPlacement="top"
										label="Tuesday"
										control={
											<StyledSwitch
												checked={tuesday}
												onChange={(event) => {
													setTuesday(event.target.checked);
												}}
												color="primary"
											/>
										}
									/>
									<FormControlLabel
										labelPlacement="top"
										label="Wednesday"
										control={
											<StyledSwitch
												checked={wednesday}
												onChange={(event) => {
													setWednesday(event.target.checked);
												}}
												color="primary"
											/>
										}
									/>
									<FormControlLabel
										labelPlacement="top"
										label="Thursday"
										control={
											<StyledSwitch
												checked={thursday}
												onChange={(event) => {
													setThursday(event.target.checked);
												}}
												color="primary"
											/>
										}
									/>
									<FormControlLabel
										labelPlacement="top"
										label="Friday"
										control={
											<StyledSwitch
												checked={friday}
												onChange={(event) => {
													setFriday(event.target.checked);
												}}
												color="primary"
											/>
										}
									/>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container justify="center" style={{ marginTop: "4%" }}>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										style={{
											backgroundColor: "#6a8fec",
											color: "white",
											borderRadius: "10px",
											padding: "2%",
										}}
									>
										ADD
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default AddItem;
