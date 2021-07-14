import React from "react";
import {
	Paper,
	Fade,
	CircularProgress,
	Grid,
	Typography,
} from "@material-ui/core";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
	WeekView,
	Appointments,
	Toolbar,
	DateNavigator,
	TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import ErrorIcon from "@material-ui/icons/Error";
import moment from "moment";

const ScheduleTable = ({ appointments, showAllHours }) => {
	const currentDate = moment();

	return (
		<>
			{appointments.isLoading ? (
				<Grid container>
					<Grid item xs={12}>
						<Grid container justify="center">
							<CircularProgress />
						</Grid>
					</Grid>
				</Grid>
			) : appointments.isError ? (
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
						<Grid item xs={12}>
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
				<Fade in={true} timeout={1500}>
					<Paper>
						<Scheduler data={appointments.data}>
							<ViewState defaultCurrentDate={currentDate} />
							{showAllHours ? (
								<WeekView
									startDayHour={0}
									endDayHour={24}
									excludedDays={[0, 6]}
								/>
							) : (
								<WeekView
									startDayHour={8}
									endDayHour={19}
									excludedDays={[0, 6]}
								/>
							)}
							<Toolbar />
							<DateNavigator />
							<TodayButton />
							<Appointments />
						</Scheduler>
					</Paper>
				</Fade>
			)}
		</>
	);
};

export default ScheduleTable;
