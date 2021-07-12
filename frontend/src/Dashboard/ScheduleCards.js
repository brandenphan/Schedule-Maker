import React from "react";
import {
	Grid,
	Zoom,
	Card,
	CardActionArea,
	CardContent,
	CardActions,
	Typography,
	IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
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
	const [error, setError] = React.useState("");

	const handleClick = (string) => {
		console.log(string);
	};

	const getUserSchedules = async () => {
		dispatchUserScheduleData({ type: "DATA_LOADING" });
		try {
			const response = await axios.get("/getUserSchedule", {
				currentUser: currentUser.email,
			});

			dispatchUserScheduleData({
				type: "DATA_LOADING_SUCCESS",
				payload: response.data,
			});

			await axios
				.get("/getUserSchedule", { params: { currentUser: currentUser.email } })
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {
					console.log(error.message);
				});
		} catch {
			dispatchUserScheduleData({ type: "DATA_LOADING_FAILURE" });
		}
	};

	React.useEffect(() => {
		getUserSchedules();
	}, []);

	return (
		<>
			<Zoom in={true} timeout={800}>
				<Grid item xs={3} style={{ borderRadius: "20px" }}>
					<div
						style={{
							padding: "5%",
						}}
					>
						<Card>
							<CardActionArea
								onClick={() => {
									handleClick("Name"); // This will be dynamic based on the card on click set the context equal to this figure context out after
									history.push("/SchedulePage");
								}}
							>
								<CardContent>
									<Typography>Schedule Name</Typography>
									<Typography>Last Modified</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions style={{ float: "right", marginTop: "-3%" }}>
								<IconButton>
									<DeleteIcon />
								</IconButton>
							</CardActions>
						</Card>
					</div>
				</Grid>
			</Zoom>
			<Zoom in={true} timeout={800}>
				<Grid item xs={3} style={{ borderRadius: "20px" }}>
					<div
						style={{
							padding: "5%",
						}}
					>
						<Card>
							<CardActionArea
								onClick={() => {
									history.push("/SchedulePage");
								}}
							>
								<CardContent>
									<Typography>Schedule Name</Typography>
									<Typography>Last Modified</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions style={{ float: "right", marginTop: "-3%" }}>
								<IconButton>
									<DeleteIcon />
								</IconButton>
							</CardActions>
						</Card>
					</div>
				</Grid>
			</Zoom>
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
								marginTop: "7%",
							}}
						>
							<AddCard />
						</Card>
					</div>
				</Grid>
			</Zoom>
			<Grid item xs={3}></Grid>
		</>
	);
};

export default ScheduleCards;
