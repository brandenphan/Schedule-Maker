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

const AddItem = () => {
	const itemNameRef = React.useRef();
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState("");

	const [startTime, setStartTime] = React.useState("9:30");
	const [endTime, setEndTime] = React.useState("10:30");

	const [monday, setMonday] = React.useState(false);
	const [tuesday, setTuesday] = React.useState(false);
	const [wednesday, setWednesday] = React.useState(false);
	const [thursday, setThursday] = React.useState(false);
	const [friday, setFriday] = React.useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (
			monday === false &&
			tuesday === false &&
			wednesday === false &&
			thursday === false &&
			friday === false
		) {
			setError("Please select at least one day for the item");
		} else {
			let test = startTime.replace(":", "");
			test = parseInt(test);
			console.log(test);

			// Parse both times into ints, if the starttime is less than end time or equal dont add

			console.log(itemNameRef.current.value);
			console.log(startTime);
			console.log(endTime);
			console.log(monday);
			console.log(tuesday);
			console.log(wednesday);
			console.log(thursday);
			console.log(friday);
			setOpen(false);
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
										style={{ width: "100%", marginBottom: "1%" }}
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
										inputProps={{
											step: 300,
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
										inputProps={{
											step: 300,
										}}
										onChange={(event) => {
											setEndTime(event.target.value);
										}}
										style={{ marginTop: "4%" }}
									/>
								</Grid>
							</Grid>
							<Grid container justify="center">
								<Grid item xs={2} style={{ marginTop: "6%" }}>
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
								</Grid>
								<Grid item xs={2} style={{ marginTop: "6%" }}>
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
								</Grid>
								<Grid item xs={2} style={{ marginTop: "6%" }}>
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
								</Grid>
								<Grid item xs={2} style={{ marginTop: "6%" }}>
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
								</Grid>
								<Grid item xs={2} style={{ marginTop: "6%" }}>
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
