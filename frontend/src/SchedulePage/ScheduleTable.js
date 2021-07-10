import React from "react";
import { Paper, Fade } from "@material-ui/core";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
	WeekView,
	Appointments,
	Toolbar,
	DateNavigator,
	TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";
import axios from "axios";

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
	const dateObject = new Date(2021, 2, 1, 1);
	const beginningDate = moment(dateObject);
	let date = beginningDate.date;

	const currentDate = moment();

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
			const response = await axios.get("/scheduleData");
			const appointmentsData = response.data.map(
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

			dispatchAppointments({
				type: "DATA_LOADING_SUCCESS",
				payload: appointmentsData,
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
		<>
			<Fade in={true} timeout={1500}>
				<Paper>
					<Scheduler data={appointments.data}>
						<ViewState defaultCurrentDate={currentDate} />
						<WeekView startDayHour={9} endDayHour={19} excludedDays={[0, 6]} />
						<Toolbar />
						<DateNavigator />
						<TodayButton />
						<Appointments />
					</Scheduler>
				</Paper>
			</Fade>
		</>
	);
};

export default ScheduleTable;
