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

	let numberSchedules = 0;
	let remainingGrids = 0;
	let paddedGrids = 0;

	const handleClick = (string) => {
		console.log(string);
	};

	const getUserSchedules = async () => {
		dispatchUserScheduleData({ type: "DATA_LOADING" });
		try {
			await axios
				.get("/getUserSchedule", { params: { currentUser: currentUser.email } })
				.then((data) => {
					dispatchUserScheduleData({
						type: "DATA_LOADING_SUCCESS",
						payload: data.data,
					});

					numberSchedules = data.data.length + 1;
					remainingGrids = numberSchedules % 4;
					if (remainingGrids === 1) {
						paddedGrids = 3;
					} else if (remainingGrids === 2) {
						paddedGrids = 2;
					} else if (remainingGrids === 3) {
						paddedGrids = 1;
					}
				})
				.catch((error) => {
					setError(error.response.statusText);
				});
		} catch {
			dispatchUserScheduleData({ type: "DATA_LOADING_FAILURE" });
		}
	};

	React.useEffect(() => {
		getUserSchedules();
	}, []);

	return (
		// finish this tmo
		<>
			{userScheduleData.data.map((value) => {
				console.log(value);
				return (
					<div key={value._id}>
						<p>{value.scheduleName}</p>
					</div>
				);
			})}
			{/* {userScheduleData.data.forEach(() => {
				return (
					<Grid>
						<p>HEY</p>
					</Grid>
				);
			})} */}
			{/* <Zoom in={true} timeout={800}>
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
			</Zoom> */}
			<Grid item xs={3}></Grid>
		</>
	);
};

export default ScheduleCards;
