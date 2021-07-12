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
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../UserAuth/context/AuthContext";

// axios.post("/addNewSchedule", { currentUser: currentUser.email });
// 0.25 means 1/4 0.5 means 2/4 0.75 means 3/4

const AddCard = () => {
	const scheduleNameRef = React.useRef();
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState("");
	const currentDate = moment().format("LLLL");
	const { currentUser } = useAuth();

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.post("/addNewSchedule", {
				scheduleName: scheduleNameRef.current.value,
				currentDate: currentDate,
				currentUser: currentUser.email,
			})
			.then(() => {
				setOpen(false);
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
					<AddIcon />
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
						<Grid item xs={6} style={{ marginTop: "2%" }}>
							Create Schedule
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
