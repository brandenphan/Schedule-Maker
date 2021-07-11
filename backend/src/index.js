import express from "express";
import cors from "cors";

import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;

const app = express();

try {
	await mongoose.connect(
		`mongodb+srv://brandenphan:brandenphan2001@cluster0.ymxvc.mongodb.net/Schedule-Maker?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	);
	console.log("Successfully connected to database");
} catch (error) {
	console.log(error.message);
}

const scheduleSchema = mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	scheduleName: String,
	scheduleEvents: Array,
});

// const Schedule = mongoose.model(
// 	"Schedule",
// 	scheduleSchema,
// 	"branden.phan@gmail.com"
// );
// const schedule = new Schedule({
// 	_id: new mongoose.Types.ObjectId(),
// 	scheduleName: "ScheduleName",
// 	scheduleEvents: [
// 		{
// 			title: "Website Re-Design Plan",
// 			startDate: new Date(2021, 7, 2, 9, 35),
// 			endDate: new Date(2021, 7, 2, 11, 30),
// 			id: 0,
// 			rRule: "FREQ=WEEKLY;COUNT=1000",
// 		},
// 		{
// 			title: "Math",
// 			startDate: new Date(2021, 7, 2, 11, 35),
// 			endDate: new Date(2021, 7, 2, 13, 30),
// 			id: 1,
// 			rRule: "FREQ=WEEKLY;COUNT=1000",
// 		},
// 	],
// });
// schedule.save();

// mongoose.connection.close() or mongoose.disconnect() must give variable to connection for disconnect;

// Headers
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.post("/addScheduleEvent", (req, res) => {
	const scheduleName = req.body.scheduleName;
	const itemName = req.body.itemName;
	const scheduleEventData = req.body.information;
	const currentUser = req.body.currentUser;

	// console.log(scheduleEventData);
	// console.log(currentUser);

	const Schedule = mongoose.model("Schedule", scheduleSchema, currentUser); // make this global to this file

	// const schedule = new Schedule({
	// 	id: new mongoose.Types.ObjectId(),
	// 	scheduleName: scheduleName,
	// 	scheduleEvents: scheduleEventData,
	// });

	// console.log(Schedule.find({ scheduleName: "TempName" }).exec);

	// Schedule.find({ scheduleName: "TempName" })
	// 	.exec()
	// 	.then((data) => {
	// 		let scheduleEventsFromDatabase = data;

	// 		if (scheduleEventsFromDatabase.length === 0) {
	// 			const schedule = new Schedule({
	// 				id: new mongoose.Types.ObjectId(),
	// 				scheduleName: scheduleName,
	// 				scheduleEvents: scheduleEventData,
	// 			});
	// 			schedule
	// 				.save()
	// 				.exec()
	// 				.then(() => {
	// 					console.log("Save successsful");
	// 				})
	// 				.catch((error) => {
	// 					console.log(error);
	// 				});
	// 		} else {
	// 			console.log("EXIST");
	// 			console.log(scheduleEventsFromDataBase);
	// 		}

	// 		console.log(test[0].scheduleEvents);
	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 	});

	Schedule.find({ scheduleName: "TempName" })
		.exec()
		.then((data) => {
			console.log(data[0].scheduleEvents);
			// data.scheduleEvents.forEach((itemData) => {
			// 	console.log(itemData);
			// });
		})
		.catch((error) => {
			console.log(error);
		});

	// schedule.save();

	res.send("SUCCESS");
});

app.get("/api", (req, res) => {
	res.json({ message: "Hello from Server!" });
});

app.get("/scheduleData", (req, res) => {
	res.json([
		{
			title: "Website Re-Design Plan",
			startDate: new Date(2021, 7, 1, 9, 35),
			endDate: new Date(2021, 7, 1, 11, 30),
			id: 0,
			rRule: "FREQ=WEEKLY;COUNT=1000",
		},
		{
			title: "Website Re-Design Plan",
			startDate: new Date(2021, 7, 4, 9, 35),
			endDate: new Date(2021, 7, 4, 11, 30),
			id: 1,
			rRule: "FREQ=WEEKLY;COUNT=1000",
		},
		{
			title: "Math",
			startDate: new Date(2021, 7, 5, 11, 35),
			endDate: new Date(2021, 7, 5, 13, 30),
			id: 1,
			rRule: "FREQ=WEEKLY;COUNT=1000",
		},

		// {
		// 	title: "Book Flights to San Fran for Sales Trip",
		// 	startDate: new Date(2018, 5, 25, 12, 11),
		// 	endDate: new Date(2018, 5, 25, 13, 0),
		// 	id: 1,
		// },
		// {
		// 	title: "Install New Router in Dev Room",
		// 	startDate: new Date(2018, 5, 25, 14, 30),
		// 	endDate: new Date(2018, 5, 25, 15, 35),
		// 	id: 2,
		// },
	]);
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
