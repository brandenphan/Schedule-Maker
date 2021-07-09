import React from "react";
import {
	Fade,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Grid,
} from "@material-ui/core";
import axios from "axios";
// import mongoose from "mongoose";

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

const ScheduleTable = () => {
	const [appointments, dispatchAppointments] = React.useReducer(
		getAppointmentsReducer,
		{ data: [], isLoading: true, isError: false }
	);

	const getScheduleData = async () => {
		dispatchAppointments({ type: "DATA_LOADING" });
		try {
			const response = await axios.get("/scheduleData");

			dispatchAppointments({
				type: "DATA_LOADING_SUCCESS",
				payload: response.data,
			});
		} catch {
			dispatchAppointments({ type: "DATA_LOADING_FAILURE" });
		}
	};

	React.useEffect(() => {
		getScheduleData();
		// eslint-disable-next-line
	}, []);

	return (
		<Fade in={true} timeout={1500}>
			<Grid container>
				<Grid
					item
					xs={12}
					style={{ backgroundColor: "#f7f9fd", borderRadius: "20px" }}
				>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell style={{ width: "2%", textAlign: "center" }} />
									<TableCell style={{ width: "6%", textAlign: "center" }}>
										Sunday
									</TableCell>
									<TableCell style={{ width: "6%", textAlign: "center" }}>
										Monday
									</TableCell>
									<TableCell style={{ width: "6%", textAlign: "center" }}>
										Tuesday
									</TableCell>
									<TableCell style={{ width: "6%", textAlign: "center" }}>
										Wednesday
									</TableCell>
									<TableCell style={{ width: "6%", textAlign: "center" }}>
										Thursday
									</TableCell>
									<TableCell style={{ width: "6%", textAlign: "center" }}>
										Friday
									</TableCell>
									<TableCell style={{ width: "6%", textAlign: "center" }}>
										Saturday
									</TableCell>
								</TableRow>
							</TableHead>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Fade>
	);
};

export default ScheduleTable;
