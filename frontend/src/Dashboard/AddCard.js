import React from "react";
import {
	CardActionArea,
	CardContent,
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	Grid,
	TextField,
	Button,
	Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAuth } from "../UserAuth/context/AuthContext";

const AddCard = () => {
	const history = useHistory();
	const scheduleNameRef = React.useRef();
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState("");
	const currentDate = moment().format("LLLL");
	const { currentUser } = useAuth();

	const handleSchedulePersistence = async (scheduleName) => {
		await axios
			.post("/setCurrentSchedulePersistence", {
				currentUser: currentUser.email,
				scheduleName: scheduleName,
			})
			.then(() => {
				history.push("/SchedulePage");
			});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		await axios
			.post("/addNewSchedule", {
				scheduleName: scheduleNameRef.current.value,
				currentDate: currentDate,
				currentUser: currentUser.email,
			})
			.then(() => {
				handleSchedulePersistence(scheduleNameRef.current.value);
			})
			.catch((error) => {
				setError(error.response.statusText);
			});
	};

	return (
		<>
			<CardActionArea
				onClick={() => {
					setOpen(true);
					setError("");
				}}
			>
				<CardContent>
					<Typography variant="subtitle2">&nbsp;</Typography>
					<Typography variant="subtitle2">&nbsp;</Typography>
					<AddIcon />
					<Typography>&nbsp;</Typography>
					<Typography variant="subtitle2">&nbsp;</Typography>
				</CardContent>
			</CardActionArea>

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
						<Grid item xs={6} style={{ marginTop: "3%", width: "300px" }}>
							Add Schedule
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
									name="ScheduleName"
									label="Schedule Name"
									inputRef={scheduleNameRef}
									style={{ marginTop: "1%" }}
								/>
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
											padding: "4%",
										}}
									>
										CREATE
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

export default AddCard;
